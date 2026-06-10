"use client";

import { useState, useRef, useCallback } from "react";
import styles from "./page.module.css";

type Mode = "standard" | "academic" | "casual" | "professional";
type Strength = "light" | "balanced" | "aggressive";

function estimateAIScore(text: string): number {
  const aiPhrases = [
    /\bin conclusion\b/gi, /\bfurthermore\b/gi, /\bmoreover\b/gi,
    /\bit is worth noting\b/gi, /\bit is important to\b/gi,
    /\bin today's (world|society|digital age)\b/gi,
    /\bthe realm of\b/gi, /\bdelve into\b/gi, /\btailored to\b/gi,
    /\bpivotal role\b/gi, /\bseamless(ly)?\b/gi, /\brobust\b/gi,
    /\blandscape\b/gi, /\bleverage\b/gi, /\bsynergy\b/gi,
    /\bparadigm\b/gi, /\bholistic\b/gi, /\bfacilitate\b/gi,
    /\butilize\b/gi, /\bcomprehensive\b/gi,
  ];
  let hits = 0;
  aiPhrases.forEach((p) => { if (p.test(text)) hits++; });
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 10);
  const lengths = sentences.map((s) => s.trim().split(/\s+/).length);
  const avg = lengths.reduce((a, b) => a + b, 0) / (lengths.length || 1);
  const variance = lengths.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / (lengths.length || 1);
  const uniformityPenalty = variance < 15 ? 20 : 0;
  return Math.min(95, Math.max(5, 38 + hits * 4 + uniformityPenalty));
}

function wordCount(text: string) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function DetectionBar({ text, label }: { text: string; label: string }) {
  if (!text || wordCount(text) < 10) {
    return (
      <div className={styles.detectionBar}>
        <InfoIcon />
        <span>{label}</span>
      </div>
    );
  }
  const score = estimateAIScore(text);
  const isHigh = score > 65;
  const isMid = score > 35;
  const colorClass = isHigh ? styles.danger : isMid ? styles.warn : styles.good;
  const fillColor = isHigh ? "#c0392b" : isMid ? "#e67e22" : "#2d6a4f";
  const statusLabel = isHigh ? "Likely AI-generated" : isMid ? "Possibly AI-generated" : "Looks mostly human";
  return (
    <div className={styles.detectionBar}>
      <InfoIcon />
      <span>{statusLabel}</span>
      <div className={styles.scoreTrack}>
        <div className={styles.scoreFill} style={{ width: `${score}%`, background: fillColor }} />
      </div>
      <span className={`${styles.scoreNum} ${colorClass}`}>{score}% AI</span>
    </div>
  );
}

function InfoIcon() {
  return (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4m0 4h.01" />
    </svg>
  );
}

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState<Mode>("standard");
  const [strength, setStrength] = useState<Strength>("balanced");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const showToastMsg = (msg: string) => {
    setToast(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2600);
  };

  const humanize = useCallback(async () => {
    if (!inputText.trim()) { showToastMsg("Please paste some text first"); return; }
    if (wordCount(inputText) < 5) { showToastMsg("Please enter at least a few words"); return; }
    if (loading) return;

    setLoading(true);
    setError("");
    setOutputText("");

    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/humanize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, mode, strength }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "API error");
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split("\n")) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6).trim();
            if (data === "[DONE]") break;
            try {
              const parsed = JSON.parse(data);
              if (parsed.token) {
                result += parsed.token;
                setOutputText(result);
              }
            } catch {}
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [inputText, mode, strength, loading]);

  const copyOutput = async () => {
    if (!outputText) return;
    await navigator.clipboard.writeText(outputText).catch(() => {});
    showToastMsg("Copied to clipboard!");
  };

  const outWords = wordCount(outputText);
  const inWords = wordCount(inputText);
  const sentences = outputText.split(/[.!?]+/).filter((s) => s.trim()).length;
  const humanScore = outputText ? Math.max(5, 100 - estimateAIScore(outputText)) : null;

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <div className={styles.logoDot} />
          Humanize<span style={{ fontWeight: 300 }}>AI</span>
        </div>
        <div className={styles.navRight}>
          <span className={styles.badge}>Powered by Llama 3.3</span>
        </div>
      </nav>

      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>
          AI text that reads<br /><em>entirely human</em>
        </h1>
        <p className={styles.heroSub}>
          Paste AI-generated writing. Get back natural, undetectable prose — instantly.
        </p>
      </div>

      <main className={styles.main}>
        {/* Controls */}
        <div className={styles.controlsBar}>
          <span className={styles.ctrlLabel}>Mode</span>
          <div className={styles.modeBtns}>
            {(["standard", "academic", "casual", "professional"] as Mode[]).map((m) => (
              <button
                key={m}
                className={`${styles.modeBtn} ${mode === m ? styles.active : ""}`}
                onClick={() => setMode(m)}
              >
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            ))}
          </div>
          <div className={styles.dividerV} />
          <span className={styles.ctrlLabel}>Strength</span>
          <div className={styles.strengthBtns}>
            {(["light", "balanced", "aggressive"] as Strength[]).map((s) => (
              <button
                key={s}
                className={`${styles.strengthBtn} ${strength === s ? styles.activeStrength : ""}`}
                onClick={() => setStrength(s)}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Panels */}
        <div className={styles.panels}>
          {/* Input */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>AI Text</span>
              <span className={styles.wordCount}>{inWords} words</span>
            </div>
            <textarea
              className={styles.textarea}
              placeholder="Paste your ChatGPT, Claude, or any AI-generated text here…"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <DetectionBar text={inputText} label="Paste text to analyze" />
            <div className={styles.actionRow}>
              <button
                className={styles.btnPrimary}
                onClick={humanize}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className={styles.spinner} />
                    Humanizing…
                  </>
                ) : (
                  <>
                    <BoltIcon />
                    Humanize Text
                  </>
                )}
              </button>
              <button
                className={styles.btnIcon}
                title="Clear"
                onClick={() => setInputText("")}
              >
                <XIcon />
              </button>
            </div>
          </div>

          {/* Output */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>Humanized</span>
              <span className={styles.wordCount}>{outWords} words</span>
            </div>
            <div className={`${styles.outputArea} ${!outputText && !loading ? styles.empty : ""}`}>
              {!outputText && !loading && !error && (
                <span className={styles.emptyMsg}>
                  <DocIcon />
                  Your humanized text will appear here
                </span>
              )}
              {error && <span className={styles.errorMsg}>{error}</span>}
              {outputText && (
                <p className={`${styles.outputText} ${loading ? styles.cursorBlink : ""}`}>
                  {outputText}
                </p>
              )}
            </div>
            <DetectionBar text={outputText} label="Run to see score" />
            <div className={styles.actionRow}>
              <button
                className={`${styles.btnPrimary} ${!outputText ? styles.btnDisabled : ""}`}
                onClick={copyOutput}
                disabled={!outputText}
              >
                <CopyIcon />
                Copy Result
              </button>
              <button
                className={styles.btnIcon}
                title="Retry"
                onClick={humanize}
                disabled={loading || !inputText}
              >
                <RetryIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        {outputText && !loading && (
          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{outWords}</span>
              <span className={styles.statLabel}>Words</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{sentences}</span>
              <span className={styles.statLabel}>Sentences</span>
            </div>
            <div className={styles.stat}>
              <span className={`${styles.statValue} ${styles.good}`}>{humanScore}%</span>
              <span className={styles.statLabel}>Human Score</span>
            </div>
          </div>
        )}
      </main>

      <div className={`${styles.toast} ${showToast ? styles.toastShow : ""}`}>{toast}</div>
    </>
  );
}

function BoltIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
function CopyIcon() {
  return (
    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}
function RetryIcon() {
  return (
    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="M1 4v6h6M23 20v-6h-6" />
      <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" />
    </svg>
  );
}
function DocIcon() {
  return (
    <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}
