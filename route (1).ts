/* NAV */
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  height: 60px;
  background: var(--warm-white);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  font-family: 'Fraunces', serif;
  font-size: 22px;
  font-weight: 700;
  color: var(--ink);
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.logoDot {
  width: 8px;
  height: 8px;
  background: var(--accent-glow);
  border-radius: 50%;
  animation: pulse 2.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.85); }
}

.navRight {
  display: flex;
  align-items: center;
  gap: 20px;
}

.badge {
  background: var(--accent-light);
  color: var(--accent);
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  letter-spacing: 0.3px;
}

/* HERO */
.hero {
  text-align: center;
  padding: 56px 24px 44px;
  max-width: 680px;
  margin: 0 auto;
}

.heroTitle {
  font-family: 'Fraunces', serif;
  font-size: clamp(38px, 6vw, 58px);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -1.5px;
  color: var(--ink);
  margin-bottom: 16px;
}

.heroTitle em {
  font-style: italic;
  color: var(--accent);
}

.heroSub {
  font-size: 16px;
  color: var(--muted);
  max-width: 420px;
  margin: 0 auto;
  font-weight: 400;
}

/* MAIN */
.main {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px 80px;
}

/* CONTROLS BAR */
.controlsBar {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
  padding: 14px 20px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.ctrlLabel {
  font-size: 12px;
  font-weight: 600;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.7px;
  margin-right: 4px;
}

.modeBtns {
  display: flex;
  background: var(--paper);
  border-radius: 8px;
  padding: 3px;
  gap: 2px;
}

.modeBtn {
  padding: 6px 14px;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: var(--muted);
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
}

.modeBtn.active {
  background: var(--card);
  color: var(--ink);
  box-shadow: 0 1px 4px rgba(15, 14, 13, 0.1);
}

.dividerV {
  width: 1px;
  height: 28px;
  background: var(--border);
  margin: 0 4px;
}

.strengthBtns {
  display: flex;
  gap: 6px;
}

.strengthBtn {
  padding: 6px 12px;
  border: 1.5px solid var(--border);
  border-radius: 20px;
  background: transparent;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  color: var(--muted);
  transition: all 0.15s;
}

.strengthBtn.activeStrength {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-light);
}

/* PANELS */
.panels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: start;
}

.panel {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
}

.panelHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px 12px;
  border-bottom: 1px solid var(--border);
}

.panelTitle {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--muted);
}

.wordCount {
  font-size: 12px;
  color: var(--muted);
}

.textarea {
  flex: 1;
  border: none;
  outline: none;
  resize: none;
  padding: 18px;
  font-family: 'Inter', sans-serif;
  font-size: 14.5px;
  line-height: 1.75;
  color: var(--ink);
  background: transparent;
  min-height: 320px;
}

.textarea::placeholder {
  color: #c4c0b8;
}

.outputArea {
  padding: 18px;
  min-height: 320px;
  display: flex;
  flex-direction: column;
}

.outputArea.empty {
  align-items: center;
  justify-content: center;
  color: var(--muted);
  font-size: 14px;
  text-align: center;
  gap: 10px;
}

.emptyMsg {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: var(--muted);
  opacity: 0.6;
}

.errorMsg {
  color: var(--danger);
  font-size: 14px;
}

.outputText {
  font-family: 'Inter', sans-serif;
  font-size: 14.5px;
  line-height: 1.75;
  color: var(--ink);
  white-space: pre-wrap;
  word-break: break-word;
  margin: 0;
}

.cursorBlink::after {
  content: '▋';
  animation: blink 0.8s step-end infinite;
  color: var(--accent);
  font-size: 13px;
}

@keyframes blink {
  50% { opacity: 0; }
}

/* DETECTION BAR */
.detectionBar {
  padding: 12px 18px;
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--warm-white);
  font-size: 12.5px;
  color: var(--muted);
}

.scoreTrack {
  flex: 1;
  max-width: 120px;
  height: 5px;
  background: var(--border);
  border-radius: 99px;
  overflow: hidden;
}

.scoreFill {
  height: 100%;
  border-radius: 99px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s;
}

.scoreNum {
  font-weight: 700;
  font-size: 13px;
}

.danger { color: var(--danger); }
.warn { color: var(--warn); }
.good { color: var(--accent); }

/* ACTION ROW */
.actionRow {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  border-top: 1px solid var(--border);
  background: var(--warm-white);
  border-radius: 0 0 var(--radius) var(--radius);
}

.btnPrimary {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;
  letter-spacing: 0.2px;
}

.btnPrimary:hover:not(:disabled) {
  background: #245e44;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(45, 106, 79, 0.3);
}

.btnPrimary:disabled,
.btnPrimary.btnDisabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btnIcon {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid var(--border);
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  transition: all 0.15s;
  color: var(--muted);
}

.btnIcon:hover:not(:disabled) {
  background: var(--paper);
  border-color: var(--muted);
  color: var(--ink);
}

.btnIcon:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* SPINNER */
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.65s linear infinite;
  flex-shrink: 0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* STATS */
.statsRow {
  display: flex;
  margin-top: 16px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  overflow: hidden;
  background: var(--warm-white);
}

.stat {
  flex: 1;
  padding: 14px;
  text-align: center;
  border-right: 1px solid var(--border);
}

.stat:last-child {
  border-right: none;
}

.statValue {
  font-size: 20px;
  font-weight: 700;
  color: var(--ink);
  display: block;
}

.statLabel {
  font-size: 11px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: block;
  margin-top: 2px;
}

/* TOAST */
.toast {
  position: fixed;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: var(--ink);
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 500;
  opacity: 0;
  pointer-events: none;
  transition: all 0.25s;
  z-index: 999;
  white-space: nowrap;
}

.toast.toastShow {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* RESPONSIVE */
@media (max-width: 720px) {
  .panels {
    grid-template-columns: 1fr;
  }

  .nav {
    padding: 0 20px;
  }

  .controlsBar {
    flex-direction: column;
    align-items: flex-start;
  }

  .dividerV {
    display: none;
  }

  .statsRow {
    flex-wrap: wrap;
  }

  .stat {
    flex: 1 1 33%;
  }
}

/* DETECTING SPINNER (small inline) */
.detectingSpinner {
  width: 11px;
  height: 11px;
  border: 1.5px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.65s linear infinite;
  flex-shrink: 0;
}

/* SOURCE LABEL */
.sourceLabel {
  font-size: 11px;
  color: var(--muted);
  opacity: 0.7;
  margin-left: auto;
}
