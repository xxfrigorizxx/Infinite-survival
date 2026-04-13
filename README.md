<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="mobile-web-app-capable" content="yes">
<title>∞ SURVIVOR</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
:root{--neon:#00ffe7;--hot:#ff3c6e;--gold:#ffd700;--bg:#04080f;--panel:#0a1220;--txt:#c8e6f5;}
html,body{width:100%;height:100%;overflow:hidden;background:var(--bg);color:var(--txt);font-family:'Share Tech Mono',monospace;touch-action:none;user-select:none;}
body::after{content:'';position:fixed;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,231,.012) 2px,rgba(0,255,231,.012) 4px);pointer-events:none;z-index:9999;}
#wrapper{position:relative;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;}

/* ── TITRE ── */
#title-screen{text-align:center;padding:24px 20px;max-width:480px;width:100%;overflow-y:auto;max-height:100vh;}
#title-screen h1{font-family:'Orbitron',sans-serif;font-size:clamp(2rem,12vw,4.5rem);font-weight:900;color:var(--neon);text-shadow:0 0 30px var(--neon),0 0 60px var(--neon);letter-spacing:.2em;animation:pulse 2s ease-in-out infinite;}
.inf{font-size:clamp(2.5rem,14vw,6rem);display:block;line-height:1;}
#title-screen p{margin:8px 0 16px;color:#7ab;font-size:clamp(.75rem,3vw,.9rem);line-height:1.7;}

/* energie */
#energy-display{display:inline-flex;align-items:center;gap:10px;background:var(--panel);border:1px solid rgba(255,231,0,.3);padding:10px 20px;margin-bottom:16px;}
.eng-icon{font-size:1.3rem;}
.eng-txt{font-family:'Orbitron',sans-serif;font-size:.95rem;color:var(--gold);}
.eng-sub{font-size:.62rem;color:#567;margin-top:2px;}

.title-btns{display:flex;flex-direction:column;gap:10px;align-items:center;}
#start-btn{font-family:'Orbitron',sans-serif;font-size:clamp(.85rem,4vw,1.1rem);font-weight:700;background:transparent;border:2px solid var(--neon);color:var(--neon);padding:14px 40px;cursor:pointer;letter-spacing:.12em;text-shadow:0 0 10px var(--neon);box-shadow:0 0 20px rgba(0,255,231,.3);transition:all .2s;animation:borderGlow 2s ease-in-out infinite;-webkit-appearance:none;width:260px;}
#start-btn:active{background:rgba(0,255,231,.2);}
#start-btn.disabled{opacity:.4;animation:none;border-color:#444;color:#444;text-shadow:none;box-shadow:none;}
#regen-timer{font-size:.7rem;color:#567;min-height:16px;}

/* leaderboard */
#leaderboard{width:100%;max-width:320px;margin:14px auto 0;}
#leaderboard h3{font-family:'Orbitron',sans-serif;font-size:.72rem;color:#456;letter-spacing:.15em;margin-bottom:8px;text-align:center;}
.lb-row{display:flex;align-items:center;gap:8px;padding:5px 8px;border-bottom:1px solid rgba(0,255,231,.07);font-size:.78rem;}
.lb-row.gold-row{background:rgba(255,215,0,.06);border-color:rgba(255,215,0,.2);}
.lb-rank{font-family:'Orbitron',sans-serif;font-size:.7rem;color:#567;width:22px;flex-shrink:0;text-align:center;}
.gold-row .lb-rank{color:var(--gold);}
.lb-name{flex:1;color:#cde;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.gold-row .lb-name{color:var(--gold);font-weight:bold;}
.lb-score{font-family:'Orbitron',sans-serif;color:var(--neon);font-size:.72rem;flex-shrink:0;}
.gold-row .lb-score{color:var(--gold);}
.lb-empty{text-align:center;color:#345;font-size:.72rem;padding:8px;}

/* ── JEU ── */
#game-screen{display:none;flex-direction:column;width:100%;height:100%;position:relative;}
#hud{display:flex;justify-content:space-between;align-items:center;padding:5px 10px;background:var(--panel);border-bottom:1px solid rgba(0,255,231,.2);flex-shrink:0;flex-wrap:wrap;gap:3px;}
.hud-block{display:flex;flex-direction:column;gap:1px;}
.hud-label{color:#567;font-size:clamp(.45rem,1.8vw,.6rem);letter-spacing:.08em;}
.hud-val{color:var(--neon);font-family:'Orbitron',sans-serif;font-size:clamp(.6rem,2.8vw,.88rem);font-weight:700;}
.hud-val.danger{color:var(--hot);animation:pulse .5s ease-in-out infinite;}
.hud-val.gold{color:var(--gold);}
#wave-banner{text-align:center;background:rgba(255,60,110,.15);border-bottom:1px solid var(--hot);color:var(--hot);font-family:'Orbitron',sans-serif;font-size:clamp(.58rem,2.5vw,.78rem);font-weight:700;letter-spacing:.2em;padding:4px;opacity:0;transition:opacity .3s;flex-shrink:0;}
#wave-banner.show{opacity:1;}
#canvas{display:block;background:#060d18;flex:1;width:100%;touch-action:none;}
#xp-bar-wrap{height:5px;background:#0a1220;flex-shrink:0;}
#xp-bar{height:100%;background:linear-gradient(90deg,#00b4d8,var(--neon));width:0%;transition:width .2s;box-shadow:0 0 6px var(--neon);}

/* joystick */
#joystick-zone{position:absolute;inset:0;z-index:10;}
#joystick-base{position:absolute;border-radius:50%;background:rgba(0,255,231,.08);border:2px solid rgba(0,255,231,.25);display:none;transform:translate(-50%,-50%);}
#joystick-thumb{position:absolute;border-radius:50%;background:rgba(0,255,231,.5);border:2px solid var(--neon);box-shadow:0 0 12px var(--neon);display:none;transform:translate(-50%,-50%);}

/* dash */
#dash-btn{position:absolute;right:18px;bottom:60px;width:clamp(52px,15vw,68px);height:clamp(52px,15vw,68px);border-radius:50%;background:rgba(0,255,231,.1);border:2px solid rgba(0,255,231,.4);color:var(--neon);font-family:'Orbitron',sans-serif;font-size:clamp(.48rem,2.2vw,.62rem);font-weight:700;display:none;align-items:center;justify-content:center;flex-direction:column;gap:2px;cursor:pointer;z-index:20;transition:all .15s;}
#dash-btn.ready{border-color:var(--neon);box-shadow:0 0 16px rgba(0,255,231,.5);}
#dash-btn.cooldown{opacity:.4;}
#dash-btn .di{font-size:clamp(.9rem,3.5vw,1.3rem);}

/* upgrades */
#upgrade-screen{display:none;position:absolute;inset:0;background:rgba(4,8,15,.93);z-index:100;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:16px;overflow-y:auto;}
#upgrade-screen.show{display:flex;}
#upgrade-screen h2{font-family:'Orbitron',sans-serif;color:var(--gold);text-shadow:0 0 20px var(--gold);font-size:clamp(.95rem,4.5vw,1.3rem);letter-spacing:.1em;}
#upgrade-screen>p{color:#678;font-size:clamp(.72rem,2.8vw,.82rem);}
.upgrades-grid{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;}
.upg-card{width:clamp(125px,36vw,175px);background:var(--panel);border:1px solid rgba(0,255,231,.25);padding:12px 10px;cursor:pointer;transition:all .15s;position:relative;overflow:hidden;}
.upg-card:active{border-color:var(--neon);transform:scale(.97);background:rgba(0,255,231,.08);}
.upg-icon{font-size:clamp(1.3rem,4.5vw,1.9rem);margin-bottom:7px;}
.upg-name{font-family:'Orbitron',sans-serif;font-size:clamp(.58rem,2.3vw,.72rem);color:var(--neon);margin-bottom:4px;font-weight:700;}
.upg-desc{font-size:clamp(.58rem,2.2vw,.7rem);color:#89a;line-height:1.45;}
.upg-rarity{position:absolute;top:6px;right:6px;font-size:clamp(.48rem,1.8vw,.58rem);letter-spacing:.08em;}
.rarity-common{color:#aaa;}.rarity-rare{color:#5af;}.rarity-epic{color:#c080ff;}.rarity-legendary{color:var(--gold);text-shadow:0 0 8px var(--gold);}

/* game over */
#gameover-screen{display:none;position:absolute;inset:0;background:rgba(4,8,15,.96);z-index:200;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:20px;}
#gameover-screen.show{display:flex;}
#gameover-screen h2{font-family:'Orbitron',sans-serif;font-size:clamp(1.6rem,7vw,2.4rem);color:var(--hot);text-shadow:0 0 30px var(--hot);font-weight:900;}
.go-stats{display:flex;gap:clamp(12px,4vw,28px);flex-wrap:wrap;justify-content:center;}
.go-stat{text-align:center;}
.go-stat-val{font-family:'Orbitron',sans-serif;font-size:clamp(1rem,4.5vw,1.4rem);color:var(--neon);}
.go-stat-lbl{font-size:clamp(.58rem,2.3vw,.68rem);color:#567;}
#go-energy-info{font-size:clamp(.62rem,2.5vw,.75rem);color:#567;}
#restart-btn{font-family:'Orbitron',sans-serif;background:transparent;border:2px solid var(--hot);color:var(--hot);padding:12px 36px;cursor:pointer;font-size:clamp(.8rem,3.5vw,.95rem);font-weight:700;letter-spacing:.1em;margin-top:6px;transition:all .2s;-webkit-appearance:none;width:230px;}
#restart-btn:active{background:rgba(255,60,110,.2);}

/* no energy */
#noenergy-modal{display:none;position:fixed;inset:0;background:rgba(4,8,15,.95);z-index:500;flex-direction:column;align-items:center;justify-content:center;padding:24px;}
#noenergy-modal.show{display:flex;}
.ne-box{width:100%;max-width:320px;background:var(--panel);border:2px solid var(--hot);box-shadow:0 0 30px rgba(255,60,110,.3);padding:26px 20px;text-align:center;}
.ne-icon{font-size:2.8rem;margin-bottom:10px;}
.ne-box h3{font-family:'Orbitron',sans-serif;color:var(--hot);font-size:clamp(.95rem,4.5vw,1.2rem);margin-bottom:8px;text-shadow:0 0 12px var(--hot);}
.ne-box p{color:#89a;font-size:clamp(.7rem,2.8vw,.82rem);line-height:1.7;margin-bottom:14px;}
#ne-recharge-info{color:var(--gold);font-size:.75rem;margin-bottom:14px;}
#ne-wait-btn{background:transparent;border:1px solid #345;color:#789;padding:11px 28px;cursor:pointer;font-family:'Share Tech Mono',monospace;font-size:.82rem;-webkit-appearance:none;}
#ne-wait-btn:active{color:#aaa;}

/* record modal */
#record-modal{display:none;position:fixed;inset:0;background:rgba(4,8,15,.95);z-index:600;flex-direction:column;align-items:center;justify-content:center;padding:24px;}
#record-modal.show{display:flex;}
.rec-box{width:100%;max-width:320px;background:var(--panel);border:2px solid var(--gold);box-shadow:0 0 40px rgba(255,215,0,.3);padding:26px 20px;text-align:center;}
.rec-icon{font-size:2.3rem;animation:pulse 1s ease-in-out infinite;}
.rec-box h3{font-family:'Orbitron',sans-serif;color:var(--gold);font-size:clamp(.95rem,4.5vw,1.2rem);margin:8px 0 4px;text-shadow:0 0 16px var(--gold);}
.rec-box p{color:#89a;font-size:.8rem;margin-bottom:12px;}
.rec-score{font-family:'Orbitron',sans-serif;font-size:clamp(1.1rem,5vw,1.5rem);color:var(--neon);margin-bottom:14px;}
#rec-name-input{width:100%;background:#060d18;border:1px solid rgba(0,255,231,.4);color:var(--neon);font-family:'Share Tech Mono',monospace;font-size:.95rem;padding:10px 12px;outline:none;text-align:center;margin-bottom:10px;-webkit-appearance:none;border-radius:0;}
#rec-name-input::placeholder{color:#345;}
#rec-save-btn{font-family:'Orbitron',sans-serif;font-size:.88rem;font-weight:700;background:transparent;border:2px solid var(--gold);color:var(--gold);padding:12px;width:100%;cursor:pointer;letter-spacing:.1em;text-shadow:0 0 8px var(--gold);transition:all .2s;-webkit-appearance:none;}
#rec-save-btn:active{background:rgba(255,215,0,.15);}

@keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}
@keyframes borderGlow{0%,100%{box-shadow:0 0 20px rgba(0,255,231,.3)}50%{box-shadow:0 0 40px rgba(0,255,231,.7)}}
</style>
</head>
<body>
<div id="wrapper">

<!-- ══ TITRE ══ -->
<div id="title-screen">
  <h1><span class="inf">∞</span>SURVIVOR</h1>
  <p>Survie infinie · Vagues sans fin · Upgrades à chaque niveau</p>
  <div id="energy-display">
    <span class="eng-icon">⚡</span>
    <div>
      <div class="eng-txt" id="eng-count">10 / 10</div>
      <div class="eng-sub" id="eng-sub">1 énergie = 1 partie</div>
    </div>
  </div>
  <div class="title-btns">
    <button id="start-btn" onclick="tryStart()">▶ JOUER  (-1 ⚡)</button>
    <div id="regen-timer"></div>
  </div>
  <div id="leaderboard">
    <h3>🏆 MEILLEURS SCORES</h3>
    <div id="lb-rows"></div>
  </div>
</div>

<!-- ══ JEU ══ -->
<div id="game-screen">
  <div id="hud">
    <div class="hud-block"><span class="hud-label">VIE</span><span class="hud-val" id="hud-hp">100</span></div>
    <div class="hud-block"><span class="hud-label">VAGUE</span><span class="hud-val" id="hud-wave">1</span></div>
    <div class="hud-block"><span class="hud-label">NIV.</span><span class="hud-val gold" id="hud-lvl">1</span></div>
    <div class="hud-block"><span class="hud-label">KILLS</span><span class="hud-val" id="hud-kills">0</span></div>
    <div class="hud-block"><span class="hud-label">TEMPS</span><span class="hud-val" id="hud-time">00:00</span></div>
    <div class="hud-block"><span class="hud-label">ÉNERGIE</span><span class="hud-val" id="hud-energy">⚡10</span></div>
  </div>
  <div id="wave-banner">⚠ VAGUE 1 ⚠</div>
  <canvas id="canvas"></canvas>
  <div id="xp-bar-wrap"><div id="xp-bar"></div></div>
  <div id="joystick-zone">
    <div id="joystick-base"></div>
    <div id="joystick-thumb"></div>
  </div>
  <div id="dash-btn"><span class="di">⚡</span><span>DASH</span></div>
  <div id="upgrade-screen">
    <h2>⬆ NIVEAU SUPÉRIEUR !</h2>
    <p>Choisissez une amélioration</p>
    <div class="upgrades-grid" id="upgrades-grid"></div>
  </div>
  <div id="gameover-screen">
    <h2>GAME OVER</h2>
    <div class="go-stats">
      <div class="go-stat"><div class="go-stat-val" id="go-wave">1</div><div class="go-stat-lbl">VAGUE</div></div>
      <div class="go-stat"><div class="go-stat-val" id="go-kills">0</div><div class="go-stat-lbl">KILLS</div></div>
      <div class="go-stat"><div class="go-stat-val" id="go-time">00:00</div><div class="go-stat-lbl">TEMPS</div></div>
      <div class="go-stat"><div class="go-stat-val" id="go-lvl">1</div><div class="go-stat-lbl">NIVEAU</div></div>
    </div>
    <div id="go-energy-info"></div>
    <button id="restart-btn" onclick="tryStart()">↺ REJOUER (-1 ⚡)</button>
  </div>
</div>

<!-- ══ MODAL PAS D'ÉNERGIE ══ -->
<div id="noenergy-modal">
  <div class="ne-box">
    <div class="ne-icon">🪫</div>
    <h3>PLUS D'ÉNERGIE !</h3>
    <p>Vous avez utilisé vos 10 énergies.<br>L'énergie se recharge à <b>1 par 30 minutes</b>.<br>Revenez plus tard !</p>
    <div id="ne-recharge-info"></div>
    <button id="ne-wait-btn" onclick="closeNoEnergy()">⏳ OK, je reviendrai</button>
  </div>
</div>

<!-- ══ MODAL NOUVEAU RECORD ══ -->
<div id="record-modal">
  <div class="rec-box">
    <div class="rec-icon">🏆</div>
    <h3>NOUVEAU RECORD !</h3>
    <p>Entrez votre nom pour le classement</p>
    <div class="rec-score" id="rec-score-val"></div>
    <input id="rec-name-input" type="text" maxlength="16" placeholder="Votre nom..." autocomplete="off" spellcheck="false"/>
    <button id="rec-save-btn" onclick="saveRecord()">✓ ENREGISTRER MON SCORE</button>
  </div>
</div>

</div><!-- #wrapper -->
<script>
'use strict';

/* ══════════════════════════════════════
   ÉNERGIE  (localStorage — persiste tant
   que le fichier HTML n'est pas supprimé)
══════════════════════════════════════ */
const ENERGY_MAX  = 10;
const REGEN_MS    = 30 * 60 * 1000; // 30 min par énergie
const KEY_ENERGY  = 'surv_energy';
const KEY_REGEN   = 'surv_regen';

function loadEnergy(){
  const v = parseInt(localStorage.getItem(KEY_ENERGY));
  return isNaN(v) ? ENERGY_MAX : Math.min(v, ENERGY_MAX);
}
function saveEnergy(v){ localStorage.setItem(KEY_ENERGY, String(v)); }

function getEnergy(){
  let e = loadEnergy();
  if(e < ENERGY_MAX){
    const last    = parseInt(localStorage.getItem(KEY_REGEN)) || Date.now();
    const elapsed = Date.now() - last;
    const gained  = Math.floor(elapsed / REGEN_MS);
    if(gained > 0){
      e = Math.min(ENERGY_MAX, e + gained);
      saveEnergy(e);
      localStorage.setItem(KEY_REGEN, String(Date.now() - (elapsed % REGEN_MS)));
    }
  }
  return e;
}

function spendEnergy(){
  const e = getEnergy();
  if(e <= 0) return false;
  saveEnergy(e - 1);
  if(e - 1 < ENERGY_MAX) localStorage.setItem(KEY_REGEN, String(Date.now()));
  return true;
}

function nextRegenMs(){
  const last    = parseInt(localStorage.getItem(KEY_REGEN)) || Date.now();
  const elapsed = Date.now() - last;
  return Math.max(0, REGEN_MS - (elapsed % REGEN_MS));
}

function updateEnergyUI(){
  const e        = getEnergy();
  const engCount = document.getElementById('eng-count');
  const engSub   = document.getElementById('eng-sub');
  const regenTxt = document.getElementById('regen-timer');
  const startBtn = document.getElementById('start-btn');
  const hudEng   = document.getElementById('hud-energy');

  if(engCount) engCount.textContent = `${e} / ${ENERGY_MAX}`;
  if(engSub)   engSub.textContent   = '1 énergie = 1 partie';
  if(hudEng){
    hudEng.textContent  = `⚡${e}`;
    hudEng.className    = 'hud-val' + (e <= 2 ? ' danger' : '');
  }

  if(e <= 0){
    if(startBtn){ startBtn.textContent = '▶ JOUER (0 ⚡)'; startBtn.classList.add('disabled'); }
    const mins = Math.ceil(nextRegenMs() / 60000);
    if(regenTxt) regenTxt.textContent = `Prochain ⚡ dans ${mins} min`;
  } else {
    if(startBtn){ startBtn.textContent = `▶ JOUER  (-1 ⚡)`; startBtn.classList.remove('disabled'); }
    if(e < ENERGY_MAX){
      const mins = Math.ceil(nextRegenMs() / 60000);
      if(regenTxt) regenTxt.textContent = `Prochain ⚡ dans ${mins} min`;
    } else {
      if(regenTxt) regenTxt.textContent = '';
    }
  }

  const rb = document.getElementById('restart-btn');
  if(rb) rb.textContent = e > 0 ? '↺ REJOUER (-1 ⚡)' : '↺ REJOUER (0 ⚡)';

  const goInfo = document.getElementById('go-energy-info');
  if(goInfo) goInfo.textContent = e > 0
    ? `Il vous reste ${e} énergie${e > 1 ? 's' : ''}`
    : `Plus d'énergie · Recharge dans ${Math.ceil(nextRegenMs()/60000)} min`;
}

setInterval(updateEnergyUI, 10000);

/* ── MODAL PAS D'ÉNERGIE ── */
function openNoEnergy(){
  const mins = Math.ceil(nextRegenMs() / 60000);
  document.getElementById('ne-recharge-info').textContent =
    `Prochain ⚡ dans environ ${mins} minute${mins > 1 ? 's' : ''}`;
  document.getElementById('noenergy-modal').classList.add('show');
}
function closeNoEnergy(){ document.getElementById('noenergy-modal').classList.remove('show'); }

/* ══════════════════════════════════════
   CLASSEMENT (localStorage)
══════════════════════════════════════ */
const KEY_LB = 'surv_leaderboard';

function loadLB(){ try{ return JSON.parse(localStorage.getItem(KEY_LB)) || []; }catch(e){ return []; } }
function saveLB(lb){ localStorage.setItem(KEY_LB, JSON.stringify(lb)); }

function calcScore(wave, kills, ms, level){
  return Math.floor(kills * 100 + wave * 500 + level * 200 + ms / 1000 * 2);
}
function isNewRecord(score){
  const lb = loadLB();
  return lb.length < 5 || score > lb[lb.length - 1].score;
}

let pendingScore = null;

function openRecordModal(score, wave, kills, ms, level){
  pendingScore = {score, wave, kills, ms, level};
  document.getElementById('rec-score-val').textContent =
    `Score : ${score.toLocaleString()} pts · Vague ${wave} · ${kills} kills`;
  document.getElementById('rec-name-input').value = '';
  document.getElementById('record-modal').classList.add('show');
  setTimeout(() => document.getElementById('rec-name-input').focus(), 300);
}

function saveRecord(){
  if(!pendingScore) return;
  const name = document.getElementById('rec-name-input').value.trim() || 'Anonyme';
  const lb = loadLB();
  lb.push({ name, score: pendingScore.score, wave: pendingScore.wave,
    kills: pendingScore.kills, date: new Date().toLocaleDateString('fr-CA') });
  lb.sort((a,b) => b.score - a.score);
  saveLB(lb.slice(0, 5));
  pendingScore = null;
  document.getElementById('record-modal').classList.remove('show');
  renderLeaderboard();
  backToTitle();
}

function renderLeaderboard(){
  const lb = loadLB();
  const el = document.getElementById('lb-rows');
  if(!el) return;
  if(!lb.length){
    el.innerHTML = '<div class="lb-empty">Aucun score encore — soyez le premier !</div>';
    return;
  }
  const medals = ['🥇','🥈','🥉','4.','5.'];
  el.innerHTML = lb.map((e,i) => `
    <div class="lb-row ${i===0?'gold-row':''}">
      <span class="lb-rank">${medals[i]||i+1}</span>
      <span class="lb-name">${e.name} <span style="color:#345;font-size:.6rem;">${e.date||''}</span></span>
      <span class="lb-score">${e.score.toLocaleString()}</span>
    </div>`).join('');
}

/* ══════════════════════════════════════
   CANVAS
══════════════════════════════════════ */
const canvas = document.getElementById('canvas');
const ctx    = canvas.getContext('2d');
let W, H;

function resizeCanvas(){
  const r = canvas.getBoundingClientRect();
  W = Math.round(r.width)  || window.innerWidth;
  H = Math.round(r.height) || (window.innerHeight - 80);
  canvas.width = W; canvas.height = H;
}
window.addEventListener('resize', resizeCanvas);

/* ══════════════════════════════════════
   JOYSTICK
══════════════════════════════════════ */
const jZone  = document.getElementById('joystick-zone');
const jBase  = document.getElementById('joystick-base');
const jThumb = document.getElementById('joystick-thumb');
const JSIZE = 65, JTHUMB = 28;
jBase.style.width  = jBase.style.height  = JSIZE * 2 + 'px';
jThumb.style.width = jThumb.style.height = JTHUMB * 2 + 'px';
let joy = {active:false, id:-1, ox:0, oy:0, dx:0, dy:0};

jZone.addEventListener('touchstart', e => {
  e.preventDefault();
  if(joy.active) return;
  const t = e.changedTouches[0];
  const dbr = dashBtn.getBoundingClientRect();
  if(t.clientX>=dbr.left && t.clientX<=dbr.right && t.clientY>=dbr.top && t.clientY<=dbr.bottom) return;
  const r = jZone.getBoundingClientRect();
  joy = {active:true, id:t.identifier, ox:t.clientX-r.left, oy:t.clientY-r.top, dx:0, dy:0};
  jBase.style.left = joy.ox+'px'; jBase.style.top = joy.oy+'px';
  jThumb.style.left = joy.ox+'px'; jThumb.style.top = joy.oy+'px';
  jBase.style.display = jThumb.style.display = 'block';
}, {passive:false});

jZone.addEventListener('touchmove', e => {
  e.preventDefault();
  for(const t of e.changedTouches){
    if(t.identifier !== joy.id) continue;
    const r = jZone.getBoundingClientRect();
    let dx = t.clientX - r.left - joy.ox;
    let dy = t.clientY - r.top  - joy.oy;
    const d = Math.hypot(dx, dy);
    if(d > JSIZE){ dx = dx/d*JSIZE; dy = dy/d*JSIZE; }
    joy.dx = dx/JSIZE; joy.dy = dy/JSIZE;
    jThumb.style.left = (joy.ox+dx)+'px'; jThumb.style.top = (joy.oy+dy)+'px';
  }
}, {passive:false});

function joyEnd(e){
  for(const t of e.changedTouches){
    if(t.identifier === joy.id){
      joy.active = false; joy.dx = 0; joy.dy = 0;
      jBase.style.display = jThumb.style.display = 'none';
    }
  }
}
jZone.addEventListener('touchend',   joyEnd, {passive:false});
jZone.addEventListener('touchcancel',joyEnd, {passive:false});

/* ── DASH BTN ── */
const dashBtn = document.getElementById('dash-btn');
dashBtn.addEventListener('touchstart', e => {
  e.preventDefault();
  if(state && state.player && state.player.hasDash && state.player.dashCd <= 0) doDash();
}, {passive:false});

/* ── CLAVIER (desktop) ── */
let keys = {};
document.addEventListener('keydown', e => {
  keys[e.key.toLowerCase()] = true;
  if(e.key === ' ' && state && state.player && state.player.hasDash && state.player.dashCd <= 0) doDash();
});
document.addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; });
let mouse = {x:0, y:0};
canvas.addEventListener('mousemove', e => {
  const r = canvas.getBoundingClientRect();
  mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
});

/* ══════════════════════════════════════
   UPGRADES
══════════════════════════════════════ */
const POOL = [
  {id:'speed',  name:'BOOST VITESSE', icon:'💨', desc:'Vitesse +25%',            rarity:'common',    apply:s=>s.player.speed*=1.25},
  {id:'dmg',    name:'DÉGÂTS+',       icon:'⚔️', desc:'Dégâts +30%',             rarity:'common',    apply:s=>s.player.bulletDmg*=1.3},
  {id:'fire',   name:'CADENCE+',      icon:'🔥', desc:'Vitesse de tir +35%',     rarity:'rare',      apply:s=>s.player.fireRate=Math.max(80,s.player.fireRate*.72)},
  {id:'hp',     name:'ARMURE',        icon:'🛡️', desc:'PV max +40, soins',       rarity:'common',    apply:s=>{s.player.maxHp+=40;s.player.hp=s.player.maxHp;}},
  {id:'multi',  name:'MULTI-TIR',     icon:'🎯', desc:'+1 projectile',           rarity:'rare',      apply:s=>s.player.multiShot++},
  {id:'pierce', name:'PERFORANT',     icon:'🔱', desc:'Balles traversent +1',    rarity:'epic',      apply:s=>s.player.pierce++},
  {id:'orbit',  name:'ORBITE',        icon:'🌀', desc:'+1 orbe protecteur',      rarity:'epic',      apply:s=>s.player.orbCount++},
  {id:'magnet', name:'MAGNÉTISME',    icon:'🧲', desc:'Portée XP x2',            rarity:'rare',      apply:s=>s.player.xpRadius*=2},
  {id:'explode',name:'EXPLOSION',     icon:'💥', desc:'Balles explosent',        rarity:'legendary', apply:s=>s.player.explode=true},
  {id:'regen',  name:'RÉGÉNÉRATION',  icon:'💚', desc:'+2 PV/seconde',           rarity:'epic',      apply:s=>s.player.regen+=2},
  {id:'dash',   name:'DASH',          icon:'⚡', desc:'Bouton Dash débloqué',    rarity:'rare',      apply:s=>{s.player.hasDash=true;showDashBtn();}},
  {id:'tri',    name:'TRIPLE TIR',    icon:'🔫', desc:'Tir en éventail x3',     rarity:'epic',      apply:s=>s.player.triShot=true},
  {id:'bsize',  name:'MEGA BALLES',   icon:'🟠', desc:'Taille balles x1.5',     rarity:'common',    apply:s=>s.player.bulletSize*=1.5},
  {id:'crit',   name:'CRITIQUE',      icon:'🎲', desc:'+25% chance crit (x2)',  rarity:'rare',      apply:s=>s.player.critChance=Math.min(.8,s.player.critChance+.25)},
  {id:'slow',   name:'VAGUE DE TEMPS',icon:'⏳', desc:'Ennemis ralentis',       rarity:'legendary', apply:s=>s.player.slowMult=Math.max(.2,s.player.slowMult-.15)},
  {id:'shield', name:'BOUCLIER',      icon:'🔵', desc:'Bloque 1 coup / 8s',     rarity:'epic',      apply:s=>{s.player.hasShield=true;s.player.shieldCd=0;}},
];

function pickUpgrades(n=3){
  const w = {common:55, rare:28, epic:13, legendary:4};
  const pool = [...POOL].sort(() => Math.random()-.5);
  const out = [];
  for(const u of pool){
    if(out.length >= n) break;
    if(Math.random()*100 < w[u.rarity]+15) out.push(u);
  }
  while(out.length < n) out.push(pool[Math.floor(Math.random()*pool.length)]);
  return out.slice(0, n);
}

/* ══════════════════════════════════════
   ÉTAT DU JEU
══════════════════════════════════════ */
let state, gameLoop, lastTime = 0;

function mkState(){
  return {
    running:false, paused:false,
    wave:1, kills:0, elapsed:0, waveTimer:0,
    spawnInterval:1800, spawnTimer:0,
    player:{
      x:W/2, y:H/2, size:12, speed:2.8,
      hp:100, maxHp:100, xp:0, xpNext:80, level:1,
      fireRate:350, lastFire:0,
      bulletDmg:18, bulletSize:6, bulletSpeed:6.5,
      multiShot:0, pierce:0, orbCount:0, xpRadius:90,
      explode:false, regen:0, regenTimer:0,
      hasDash:false, dashCd:0,
      triShot:false, critChance:0, slowMult:1,
      hasShield:false, shieldCd:0, shieldActive:false,
    },
    bullets:[], enemies:[], particles:[],
    xpGems:[], orbs:[], orbAngle:0, dmgNums:[],
  };
}

function tryStart(){
  if(!spendEnergy()){ openNoEnergy(); return; }
  startGame();
}

function startGame(){
  resizeCanvas();
  document.getElementById('title-screen').style.display = 'none';
  document.getElementById('game-screen').style.display  = 'flex';
  document.getElementById('gameover-screen').classList.remove('show');
  document.getElementById('upgrade-screen').classList.remove('show');
  dashBtn.style.display = 'none';
  state = mkState();
  state.running = true;
  mouse = {x:W/2, y:H/2};
  updateEnergyUI();
  showWaveBanner(1);
  if(gameLoop) cancelAnimationFrame(gameLoop);
  lastTime = 0;
  loop();
}

function backToTitle(){
  document.getElementById('game-screen').style.display  = 'none';
  document.getElementById('title-screen').style.display = '';
  updateEnergyUI();
  renderLeaderboard();
}

function showDashBtn(){
  dashBtn.style.display = 'flex';
  dashBtn.classList.add('ready');
}

/* ══════════════════════════════════════
   BOUCLE
══════════════════════════════════════ */
function loop(ts=0){
  const dt = lastTime ? Math.min(ts - lastTime, 50) : 16;
  lastTime = ts;
  if(state.running && !state.paused) update(dt);
  draw();
  gameLoop = requestAnimationFrame(loop);
}

/* ══════════════════════════════════════
   UPDATE
══════════════════════════════════════ */
function update(dt){
  const p = state.player;
  state.elapsed   += dt;
  state.waveTimer += dt;

  // Vague toutes les 20s
  if(state.waveTimer > 20000){
    state.waveTimer = 0; state.wave++;
    state.spawnInterval = Math.max(300, state.spawnInterval - 80);
    showWaveBanner(state.wave);
    if(state.wave % 5 === 0){ p.hp = Math.min(p.maxHp, p.hp+20); pts(p.x,p.y,'#00ff88',1.2,5); }
  }

  // Spawn ennemis
  state.spawnTimer += dt;
  if(state.spawnTimer > state.spawnInterval){
    state.spawnTimer = 0; spawnEnemy();
    if(state.wave>5  && Math.random()<.5) spawnEnemy();
    if(state.wave>10 && Math.random()<.4) spawnEnemy();
    if(state.wave>6  && Math.random()<.15) spawnBoss();
  }

  // Déplacement joueur
  let mx=0, my=0;
  if(joy.active){ mx=joy.dx; my=joy.dy; }
  if(keys['w']||keys['arrowup'])    my=-1;
  if(keys['s']||keys['arrowdown'])  my= 1;
  if(keys['a']||keys['arrowleft'])  mx=-1;
  if(keys['d']||keys['arrowright']) mx= 1;
  const ml = Math.hypot(mx,my)||1;
  if(mx||my){ p.x+=mx/ml*p.speed; p.y+=my/ml*p.speed; }
  p.x = Math.max(p.size, Math.min(W-p.size, p.x));
  p.y = Math.max(p.size, Math.min(H-p.size, p.y));

  // Cooldowns
  if(p.dashCd>0){
    p.dashCd-=dt;
    if(p.hasDash){ dashBtn.classList.remove('ready'); dashBtn.classList.add('cooldown'); }
  } else if(p.hasDash){ dashBtn.classList.add('ready'); dashBtn.classList.remove('cooldown'); }
  if(p.hasShield){ if(p.shieldCd>0) p.shieldCd-=dt; else p.shieldActive=true; }
  p.regenTimer+=dt;
  if(p.regen>0 && p.regenTimer>1000){ p.regenTimer=0; p.hp=Math.min(p.maxHp,p.hp+p.regen); }

  // Tir auto
  const now = performance.now();
  if(now - p.lastFire > p.fireRate){ p.lastFire=now; fireBullet(); }

  // Orbes
  state.orbAngle += dt*.003; state.orbs=[];
  for(let i=0;i<p.orbCount;i++){
    const a = state.orbAngle+(i/p.orbCount)*Math.PI*2;
    state.orbs.push({x:p.x+Math.cos(a)*42, y:p.y+Math.sin(a)*42});
  }

  // Balles
  state.bullets = state.bullets.filter(b=>{
    b.x+=b.vx; b.y+=b.vy; b.life--;
    if(b.x<-20||b.x>W+20||b.y<-20||b.y>H+20||b.life<=0) return false;
    if(b.enemy){
      if(Math.hypot(b.x-p.x,b.y-p.y)<p.size+b.size){
        if(p.shieldActive){p.shieldActive=false;p.shieldCd=8000;return false;}
        p.hp -= 8+state.wave; pts(p.x,p.y,'#ff3c6e',.6,2.5);
        if(p.hp<=0){gameOver();return false;}
        return false;
      }
      return true;
    }
    for(let i=state.enemies.length-1;i>=0;i--){
      const e=state.enemies[i];
      if(Math.hypot(b.x-e.x,b.y-e.y)<b.size+e.size){
        let dmg=b.dmg; const cr=Math.random()<p.critChance;
        if(cr){dmg*=2;dmgNum(e.x,e.y,dmg,'#ffd700',true);}else dmgNum(e.x,e.y,dmg,'#ff6');
        e.hp-=dmg;
        if(p.explode) explodeAt(b.x,b.y,b.dmg*.6);
        pts(b.x,b.y,e.color,.5,1.5);
        if(e.hp<=0) killEnemy(i);
        if(b.pierce<=0) return false;
        b.pierce--;
      }
    }
    return true;
  });

  // Ennemis
  for(let i=state.enemies.length-1;i>=0;i--){
    const e=state.enemies[i];
    const ex=p.x-e.x, ey=p.y-e.y, ed=Math.hypot(ex,ey)||1;
    if(e.type==='shooter'){
      if(ed<200){e.x-=ex/ed*e.speed*p.slowMult;e.y-=ey/ed*e.speed*p.slowMult;}
      else{e.x+=ex/ed*e.speed*p.slowMult;e.y+=ey/ed*e.speed*p.slowMult;}
      e.st=(e.st||0)+dt;
      if(e.st>2200){e.st=0;const sp=2.2;state.bullets.push({x:e.x,y:e.y,vx:ex/ed*sp,vy:ey/ed*sp,dmg:0,size:5,life:120,enemy:true,pierce:0});}
    }else if(e.type==='zigzag'){
      e.zt=(e.zt||0)+dt;
      const za=Math.atan2(ey,ex)+Math.sin(e.zt*.005)*1.2;
      e.x+=Math.cos(za)*e.speed*p.slowMult; e.y+=Math.sin(za)*e.speed*p.slowMult;
    }else{e.x+=ex/ed*e.speed*p.slowMult;e.y+=ey/ed*e.speed*p.slowMult;}
    for(const o of state.orbs){if(Math.hypot(o.x-e.x,o.y-e.y)<e.size+8){e.hp-=.4;if(e.hp<=0){killEnemy(i);break;}}}
    if(Math.hypot(p.x-e.x,p.y-e.y)<p.size+e.size){
      if(p.shieldActive){p.shieldActive=false;p.shieldCd=8000;pts(p.x,p.y,'#00aaff',1.5,5);state.enemies.splice(i,1);continue;}
      p.hp-=e.dmg; pts(p.x,p.y,'#ff3c6e',.8,2.5); state.enemies.splice(i,1);
      if(p.hp<=0){gameOver();return;}
    }
  }

  // Gemmes XP
  state.xpGems = state.xpGems.filter(g=>{
    if(Math.hypot(g.x-p.x,g.y-p.y)<p.xpRadius){
      const gd=Math.hypot(p.x-g.x,p.y-g.y)||1;
      g.x+=(p.x-g.x)/gd*5; g.y+=(p.y-g.y)/gd*5;
    }
    if(Math.hypot(g.x-p.x,g.y-p.y)<p.size+8){gainXP(g.value);return false;}
    return true;
  });

  state.particles = state.particles.filter(pt=>{pt.x+=pt.vx;pt.y+=pt.vy;pt.vy+=.05;pt.life-=dt*.004;return pt.life>0;});
  state.dmgNums   = state.dmgNums.filter(d=>{d.y-=1.2;d.life-=dt*.005;return d.life>0;});
  updateHUD();
}

/* ── TIR AUTO-VISE ── */
function fireBullet(){
  const p=state.player;
  let tx=mouse.x, ty=mouse.y, bd=Infinity;
  for(const e of state.enemies){const d=Math.hypot(e.x-p.x,e.y-p.y);if(d<bd){bd=d;tx=e.x;ty=e.y;}}
  const dx=tx-p.x, dy=ty-p.y, d=Math.hypot(dx,dy)||1;
  const sh=a=>{
    const sp=p.bulletSpeed, c=Math.cos(a), s=Math.sin(a);
    state.bullets.push({x:p.x,y:p.y,vx:(dx/d*c-dy/d*s)*sp,vy:(dx/d*s+dy/d*c)*sp,
      dmg:p.bulletDmg,size:p.bulletSize,life:90,pierce:p.pierce,enemy:false});
  };
  sh(0);
  for(let i=1;i<=p.multiShot;i++){sh(i*.25);sh(-i*.25);}
  if(p.triShot){sh(.4);sh(-.4);}
}

/* ── DASH ── */
function doDash(){
  const p=state.player;
  let tx=mouse.x, ty=mouse.y;
  if(joy.active){tx=p.x+joy.dx*100;ty=p.y+joy.dy*100;}
  const dx=tx-p.x,dy=ty-p.y,d=Math.hypot(dx,dy)||1;
  p.x+=dx/d*90; p.y+=dy/d*90;
  p.x=Math.max(p.size,Math.min(W-p.size,p.x));
  p.y=Math.max(p.size,Math.min(H-p.size,p.y));
  p.dashCd=3000; pts(p.x,p.y,'#00ffe7',.9,3);
}

/* ── SPAWN ── */
function edgePos(){
  const s=Math.floor(Math.random()*4);
  if(s===0)return{x:Math.random()*W,y:-25};
  if(s===1)return{x:W+25,y:Math.random()*H};
  if(s===2)return{x:Math.random()*W,y:H+25};
  return{x:-25,y:Math.random()*H};
}
function spawnEnemy(){
  const w=state.wave;
  const types=['basic','fast','tank'];
  if(w>4)types.push('shooter');if(w>7)types.push('zigzag');
  const type=types[Math.floor(Math.random()*types.length)];
  const {x,y}=edgePos();
  const cfgs={
    basic:  {hp:30+w*8,  speed:1.2+w*.08,size:12,dmg:12,color:'#ff4060',xp:8},
    fast:   {hp:18+w*4,  speed:2.2+w*.1, size:8, dmg:8, color:'#ff9020',xp:6},
    tank:   {hp:90+w*20, speed:.7+w*.04, size:20,dmg:25,color:'#8040ff',xp:20},
    shooter:{hp:40+w*10, speed:.9+w*.05, size:13,dmg:10,color:'#20d0ff',xp:15,st:0},
    zigzag: {hp:25+w*6,  speed:1.8+w*.08,size:10,dmg:10,color:'#ffee00',xp:10},
  };
  const c=cfgs[type];
  state.enemies.push({x,y,type,...c,maxHp:c.hp});
}
function spawnBoss(){
  const w=state.wave, {x,y}=edgePos(), hp=300+w*50;
  state.enemies.push({x,y,type:'boss',hp,maxHp:hp,speed:.6+w*.03,size:28,dmg:35,color:'#ff2080',xp:80+w*10});
}
function killEnemy(i){
  const e=state.enemies[i]; state.kills++;
  const gc=e.type==='boss'?5:e.type==='tank'?3:1;
  for(let k=0;k<gc;k++) state.xpGems.push({x:e.x+(Math.random()-.5)*20,y:e.y+(Math.random()-.5)*20,value:Math.ceil(e.xp/gc)});
  for(let k=0;k<6;k++) pts(e.x,e.y,e.color,.8,3);
  state.enemies.splice(i,1);
}
function explodeAt(x,y,dmg){
  for(let i=state.enemies.length-1;i>=0;i--){
    const e=state.enemies[i];
    if(Math.hypot(e.x-x,e.y-y)<55){e.hp-=dmg;if(e.hp<=0)killEnemy(i);}
  }
  for(let k=0;k<10;k++) pts(x,y,'#ff6010',1,3);
}
function gainXP(v){
  const p=state.player; p.xp+=v;
  if(p.xp>=p.xpNext){p.xp-=p.xpNext;p.xpNext=Math.floor(p.xpNext*1.35);p.level++;state.paused=true;showUpgrades();}
}
function showUpgrades(){
  const sc=document.getElementById('upgrade-screen');
  const gr=document.getElementById('upgrades-grid');
  gr.innerHTML='';
  pickUpgrades(3).forEach(u=>{
    const c=document.createElement('div'); c.className='upg-card';
    c.innerHTML=`<div class="upg-rarity rarity-${u.rarity}">${u.rarity.toUpperCase()}</div><div class="upg-icon">${u.icon}</div><div class="upg-name">${u.name}</div><div class="upg-desc">${u.desc}</div>`;
    const pick=()=>{u.apply(state);sc.classList.remove('show');state.paused=false;};
    c.addEventListener('click',pick);
    c.addEventListener('touchend',e=>{e.preventDefault();pick();},{passive:false});
    gr.appendChild(c);
  });
  sc.classList.add('show');
}
function pts(x,y,color,life,speed){
  for(let k=0;k<4;k++){
    const a=Math.random()*Math.PI*2;
    state.particles.push({x,y,vx:Math.cos(a)*speed*(Math.random()+.4),vy:Math.sin(a)*speed*(Math.random()+.4),color,life,size:Math.random()*2.5+1});
  }
}
function dmgNum(x,y,v,color='#ff6',crit=false){
  state.dmgNums.push({x:x+(Math.random()-.5)*20,y:y-10,val:Math.round(v),color,life:1,size:crit?15:10});
}

function gameOver(){
  state.running=false;
  const fmt=ms=>{const s=Math.floor(ms/1000);return`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;};
  const score=calcScore(state.wave,state.kills,state.elapsed,state.player.level);
  document.getElementById('go-wave').textContent=state.wave;
  document.getElementById('go-kills').textContent=state.kills;
  document.getElementById('go-time').textContent=fmt(state.elapsed);
  document.getElementById('go-lvl').textContent=state.player.level;
  updateEnergyUI();
  document.getElementById('gameover-screen').classList.add('show');
  // Nouveau record ?
  setTimeout(()=>{
    if(isNewRecord(score)){
      document.getElementById('gameover-screen').classList.remove('show');
      openRecordModal(score,state.wave,state.kills,state.elapsed,state.player.level);
    }
  },1500);
}

function showWaveBanner(w){
  const el=document.getElementById('wave-banner');
  el.textContent=`⚠ VAGUE ${w} ⚠`; el.classList.add('show');
  setTimeout(()=>el.classList.remove('show'),2500);
}
function updateHUD(){
  const p=state.player;
  const he=document.getElementById('hud-hp');
  he.textContent=`${Math.max(0,Math.ceil(p.hp))}/${p.maxHp}`;
  he.className='hud-val'+(p.hp<p.maxHp*.3?' danger':'');
  document.getElementById('hud-wave').textContent=state.wave;
  document.getElementById('hud-lvl').textContent=state.player.level;
  document.getElementById('hud-kills').textContent=state.kills;
  const s=Math.floor(state.elapsed/1000);
  document.getElementById('hud-time').textContent=`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
  document.getElementById('xp-bar').style.width=(p.xp/p.xpNext*100)+'%';
  const e=getEnergy();
  const hudEng=document.getElementById('hud-energy');
  hudEng.textContent=`⚡${e}`; hudEng.className='hud-val'+(e<=2?' danger':'');
}

/* ══════════════════════════════════════
   DESSIN
══════════════════════════════════════ */
function draw(){
  ctx.clearRect(0,0,W,H);
  // Grille
  ctx.strokeStyle='rgba(0,255,231,.04)'; ctx.lineWidth=1;
  for(let x=0;x<W;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
  for(let y=0;y<H;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
  // Gemmes XP
  state.xpGems.forEach(g=>{
    ctx.beginPath();ctx.moveTo(g.x,g.y-7);ctx.lineTo(g.x+5,g.y);ctx.lineTo(g.x,g.y+7);ctx.lineTo(g.x-5,g.y);
    ctx.closePath();ctx.fillStyle='#00ffe7';ctx.shadowBlur=8;ctx.shadowColor='#00ffe7';ctx.fill();ctx.shadowBlur=0;
  });
  // Ennemis
  state.enemies.forEach(e=>{
    const bw=e.size*2.5;
    ctx.fillStyle='#200';ctx.fillRect(e.x-bw/2,e.y-e.size-8,bw,4);
    ctx.fillStyle=e.type==='boss'?'#ff2080':'#f40';ctx.fillRect(e.x-bw/2,e.y-e.size-8,bw*(e.hp/e.maxHp),4);
    ctx.save();ctx.translate(e.x,e.y);ctx.shadowBlur=10;ctx.shadowColor=e.color;
    if(e.type==='boss'){
      ctx.beginPath();
      for(let i=0;i<8;i++){const a=(i/8)*Math.PI*2,r=i%2===0?e.size:e.size*.55;i===0?ctx.moveTo(Math.cos(a)*r,Math.sin(a)*r):ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);}
      ctx.closePath();ctx.fillStyle=e.color;ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.stroke();
    }else if(e.type==='tank'){
      ctx.fillStyle=e.color;ctx.fillRect(-e.size,-e.size,e.size*2,e.size*2);
      ctx.strokeStyle='#c080ff';ctx.lineWidth=2;ctx.strokeRect(-e.size,-e.size,e.size*2,e.size*2);
    }else{
      ctx.beginPath();ctx.arc(0,0,e.size,0,Math.PI*2);ctx.fillStyle=e.color;ctx.fill();
      ctx.strokeStyle='rgba(255,255,255,.35)';ctx.lineWidth=1;ctx.stroke();
    }
    ctx.shadowBlur=0;ctx.restore();
  });
  // Orbes
  state.orbs.forEach(o=>{
    ctx.beginPath();ctx.arc(o.x,o.y,7,0,Math.PI*2);
    ctx.fillStyle='#00ffe7';ctx.shadowBlur=14;ctx.shadowColor='#00ffe7';ctx.fill();ctx.shadowBlur=0;
  });
  // Joueur
  const p=state.player;
  ctx.save();ctx.translate(p.x,p.y);
  if(p.shieldActive){
    ctx.beginPath();ctx.arc(0,0,p.size+11,0,Math.PI*2);
    ctx.strokeStyle='rgba(0,150,255,.65)';ctx.lineWidth=3;ctx.shadowBlur=14;ctx.shadowColor='#0af';ctx.stroke();ctx.shadowBlur=0;
  }
  ctx.beginPath();ctx.arc(0,0,p.xpRadius,0,Math.PI*2);
  ctx.strokeStyle='rgba(0,255,231,.05)';ctx.lineWidth=1;ctx.stroke();
  let ax=mouse.x,ay=mouse.y,bd2=Infinity;
  for(const e of state.enemies){const d=Math.hypot(e.x-p.x,e.y-p.y);if(d<bd2){bd2=d;ax=e.x;ay=e.y;}}
  ctx.rotate(Math.atan2(ay-p.y,ax-p.x)+Math.PI/2);
  ctx.beginPath();ctx.moveTo(0,-p.size);ctx.lineTo(p.size*.8,p.size*.7);ctx.lineTo(0,p.size*.3);ctx.lineTo(-p.size*.8,p.size*.7);ctx.closePath();
  ctx.fillStyle='#00ffe7';ctx.shadowBlur=20;ctx.shadowColor='#00ffe7';ctx.fill();
  ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.stroke();ctx.shadowBlur=0;ctx.restore();
  // Balles
  state.bullets.forEach(b=>{
    ctx.beginPath();ctx.arc(b.x,b.y,b.size,0,Math.PI*2);
    ctx.fillStyle=b.enemy?'#ff4444':'#fff';
    if(!b.enemy){ctx.shadowBlur=10;ctx.shadowColor='#00ffe7';}
    ctx.fill();ctx.shadowBlur=0;
  });
  // Particules
  state.particles.forEach(pt=>{
    ctx.globalAlpha=pt.life;ctx.beginPath();ctx.arc(pt.x,pt.y,pt.size,0,Math.PI*2);
    ctx.fillStyle=pt.color;ctx.fill();
  });ctx.globalAlpha=1;
  // Chiffres de dégâts
  state.dmgNums.forEach(d=>{
    ctx.globalAlpha=d.life;ctx.fillStyle=d.color;
    ctx.font=`bold ${d.size}px 'Share Tech Mono'`;ctx.textAlign='center';ctx.fillText(d.val,d.x,d.y);
  });ctx.globalAlpha=1;ctx.textAlign='left';
  // Barre dash
  if(p.hasDash){
    const bw=60,bh=7,bx=W-bw-10,by=H-bh-10;
    const prog=p.dashCd>0?1-(p.dashCd/3000):1;
    ctx.fillStyle='rgba(0,255,231,.12)';ctx.fillRect(bx,by,bw,bh);
    ctx.fillStyle=prog>=1?'#00ffe7':'rgba(0,255,231,.45)';ctx.fillRect(bx,by,bw*prog,bh);
    ctx.strokeStyle='rgba(0,255,231,.3)';ctx.lineWidth=1;ctx.strokeRect(bx,by,bw,bh);
  }
}

/* ── INIT ── */
updateEnergyUI();
renderLeaderboard();
</script>
</body>
</html>
