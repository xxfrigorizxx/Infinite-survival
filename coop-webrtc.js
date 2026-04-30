(() => {
  'use strict';

  let RTC_CFG = {
    iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }],
  };

  const textEncoder = new TextEncoder();
  const textDecoder = new TextDecoder();

  function safeParseJson(raw) {
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  async function waitIceComplete(pc, timeoutMs = 15000) {
    if (pc.iceGatheringState === 'complete') return;
    await new Promise((resolve) => {
      const onChange = () => {
        if (pc.iceGatheringState === 'complete') {
          pc.removeEventListener('icegatheringstatechange', onChange);
          resolve();
        }
      };
      pc.addEventListener('icegatheringstatechange', onChange);
      setTimeout(() => {
        pc.removeEventListener('icegatheringstatechange', onChange);
        resolve();
      }, timeoutMs);
    });
  }

  class CoopLink {
    constructor(role, rtcConfig = null) {
      this.role = role;
      this.pc = new RTCPeerConnection(rtcConfig || RTC_CFG);
      this.dc = null;
      this.onMessage = null;
      this.onStatus = null;
      this.connected = false;
      this._closed = false;
      this._wireBaseHandlers();
    }

    _emitStatus(status) {
      if (typeof this.onStatus === 'function') this.onStatus(status);
    }

    _wireBaseHandlers() {
      this.pc.addEventListener('connectionstatechange', () => {
        const cs = this.pc.connectionState;
        if (cs === 'connected') {
          this.connected = true;
          this._emitStatus('connected');
        } else if (cs === 'failed' || cs === 'disconnected' || cs === 'closed') {
          this.connected = false;
          this._emitStatus(cs);
        }
      });
      this.pc.addEventListener('iceconnectionstatechange', () => {
        const s = this.pc.iceConnectionState;
        if (s === 'failed') this._emitStatus('failed');
      });
      this.pc.addEventListener('datachannel', (ev) => {
        this._bindDataChannel(ev.channel);
      });
    }

    _bindDataChannel(dc) {
      this.dc = dc;
      this.dc.binaryType = 'arraybuffer';
      this.dc.addEventListener('open', () => {
        this.connected = true;
        this._emitStatus('connected');
      });
      this.dc.addEventListener('close', () => {
        this.connected = false;
        this._emitStatus('closed');
      });
      this.dc.addEventListener('message', (ev) => {
        let payload = ev.data;
        if (payload instanceof ArrayBuffer) payload = textDecoder.decode(payload);
        const msg = safeParseJson(payload);
        if (!msg) return;
        if (typeof this.onMessage === 'function') this.onMessage(msg);
      });
    }

    async createOffer() {
      if (this.role !== 'host') throw new Error('createOffer réservé à host');
      const dc = this.pc.createDataChannel('coop');
      this._bindDataChannel(dc);
      const offer = await this.pc.createOffer();
      await this.pc.setLocalDescription(offer);
      await waitIceComplete(this.pc, 15000);
      return JSON.stringify(this.pc.localDescription);
    }

    async acceptOffer(offerSdpString) {
      if (this.role !== 'client') throw new Error('acceptOffer réservé à client');
      const offer = safeParseJson(offerSdpString);
      if (!offer || !offer.type || !offer.sdp) throw new Error('Offre invalide');
      await this.pc.setRemoteDescription(offer);
      const answer = await this.pc.createAnswer();
      await this.pc.setLocalDescription(answer);
      await waitIceComplete(this.pc, 15000);
      return JSON.stringify(this.pc.localDescription);
    }

    async acceptAnswer(answerSdpString) {
      if (this.role !== 'host') throw new Error('acceptAnswer réservé à host');
      const answer = safeParseJson(answerSdpString);
      if (!answer || !answer.type || !answer.sdp) throw new Error('Réponse invalide');
      await this.pc.setRemoteDescription(answer);
    }

    send(data) {
      if (!this.dc || this.dc.readyState !== 'open') return false;
      try {
        this.dc.send(textEncoder.encode(JSON.stringify(data)));
        return true;
      } catch (e) {
        return false;
      }
    }

    close() {
      this._closed = true;
      this.connected = false;
      try {
        if (this.dc) this.dc.close();
      } catch (e) {}
      try {
        this.pc.close();
      } catch (e) {}
    }
  }

  window.setCoopRtcIceServers = function setCoopRtcIceServers(iceServers) {
    if (!Array.isArray(iceServers) || !iceServers.length) return false;
    RTC_CFG = { ...RTC_CFG, iceServers };
    return true;
  };
  window.CoopLink = CoopLink;
})();
