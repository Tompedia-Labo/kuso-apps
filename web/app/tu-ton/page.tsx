"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  KeyboardEvent,
  ClipboardEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import styles from "./style.module.css";

const MORSE_TO_CHAR: Record<string, string> = {
  ".-": "A",
  "-...": "B",
  "-.-.": "C",
  "-..": "D",
  ".": "E",
  "..-.": "F",
  "--.": "G",
  "....": "H",
  "..": "I",
  ".---": "J",
  "-.-": "K",
  ".-..": "L",
  "--": "M",
  "-.": "N",
  "---": "O",
  ".--.": "P",
  "--.-": "Q",
  ".-.": "R",
  "...": "S",
  "-": "T",
  "..-": "U",
  "...-": "V",
  ".--": "W",
  "-..-": "X",
  "-.--": "Y",
  "--..": "Z",
  "-----": "0",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
};

const DOT_DASH_THRESHOLD_MS = 200;
const AUTO_COMMIT_MS = 1200;

type FieldKey = "name" | "email" | "grade" | "department" | "message";

const FIELD_LABELS: Record<FieldKey, string> = {
  name: "お名前 / NAME",
  email: "メール / EMAIL",
  grade: "学年 / GRADE",
  department: "学部 / DEPARTMENT",
  message: "意気込み / MESSAGE",
};

export default function Page() {
  const [values, setValues] = useState<Record<FieldKey, string>>({
    name: "",
    email: "",
    grade: "",
    department: "",
    message: "",
  });
  const [activeField, setActiveField] = useState<FieldKey>("name");
  const [buffer, setBuffer] = useState("");
  const [isPressed, setIsPressed] = useState(false);

  const pressStartRef = useRef<number | null>(null);
  const autoCommitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeFieldRef = useRef(activeField);
  const bufferRef = useRef(buffer);

  useEffect(() => {
    activeFieldRef.current = activeField;
  }, [activeField]);

  useEffect(() => {
    bufferRef.current = buffer;
  }, [buffer]);

  useEffect(
    () => () => {
      if (autoCommitTimerRef.current) clearTimeout(autoCommitTimerRef.current);
    },
    [],
  );

  const blockKeyboard = (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.preventDefault();
  };

  const blockPaste = (
    e: ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.preventDefault();
  };

  const commitLetterNow = useCallback(() => {
    if (autoCommitTimerRef.current) {
      clearTimeout(autoCommitTimerRef.current);
      autoCommitTimerRef.current = null;
    }
    const current = bufferRef.current;
    if (!current) return;
    const letter = MORSE_TO_CHAR[current];
    if (letter) {
      const field = activeFieldRef.current;
      setValues((v) => ({ ...v, [field]: v[field] + letter }));
    }
    bufferRef.current = "";
    setBuffer("");
  }, []);

  const scheduleAutoCommit = () => {
    if (autoCommitTimerRef.current) clearTimeout(autoCommitTimerRef.current);
    autoCommitTimerRef.current = setTimeout(() => {
      commitLetterNow();
    }, AUTO_COMMIT_MS);
  };

  const handleKeyDown = (e: ReactPointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    if (autoCommitTimerRef.current) {
      clearTimeout(autoCommitTimerRef.current);
      autoCommitTimerRef.current = null;
    }
    pressStartRef.current = performance.now();
    setIsPressed(true);
  };

  const handleKeyUp = () => {
    if (pressStartRef.current === null) return;
    const duration = performance.now() - pressStartRef.current;
    pressStartRef.current = null;
    setIsPressed(false);
    const signal = duration < DOT_DASH_THRESHOLD_MS ? "." : "-";
    setBuffer((b) => b + signal);
    scheduleAutoCommit();
  };

  const handleKeyCancel = () => {
    pressStartRef.current = null;
    setIsPressed(false);
  };

  const addSpace = () => {
    if (buffer) commitLetterNow();
    setValues((v) => ({ ...v, [activeField]: v[activeField] + " " }));
  };

  const backspace = () => {
    if (buffer) {
      setBuffer((b) => b.slice(0, -1));
      return;
    }
    setValues((v) => ({ ...v, [activeField]: v[activeField].slice(0, -1) }));
  };

  const clearBuffer = () => setBuffer("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, grade, department, message } = values;
    if (!name && !email && !grade && !department && !message) {
      alert("モールス信号でフィールドを埋めてください。");
      return;
    }
    alert(
      `とんペディア入部申し込みを受け付けました！\n\nNAME: ${name}\nEMAIL: ${email}\nGRADE: ${grade}\nDEPARTMENT: ${department}\nMESSAGE: ${message}`,
    );
  };

  const currentLetter = buffer ? (MORSE_TO_CHAR[buffer] ?? "?") : "";
  const displayBuffer = buffer.replace(/\./g, "・").replace(/-/g, "ー");

  return (
    <div className={styles.mainArea}>
      <h1 className={styles.title}>とんペディア</h1>
      <p className={styles.subtitle}>
        App of 東北大生, by 東北大生, for 東北大生 入部フォーム ・
        モールス信号でのみ入力可能
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fieldBlock}>
          <label className={styles.label}>{FIELD_LABELS.name}</label>
          <input
            type="text"
            value={values.name}
            readOnly
            onKeyDown={blockKeyboard}
            onPaste={blockPaste}
            onDrop={(e) => e.preventDefault()}
            onFocus={() => setActiveField("name")}
            className={`${styles.input} ${activeField === "name" ? styles.activeField : ""}`}
            placeholder="・ーーー ... ..."
          />
        </div>

        <div className={styles.fieldBlock}>
          <label className={styles.label}>{FIELD_LABELS.email}</label>
          <input
            type="text"
            value={values.email}
            readOnly
            onKeyDown={blockKeyboard}
            onPaste={blockPaste}
            onDrop={(e) => e.preventDefault()}
            onFocus={() => setActiveField("email")}
            className={`${styles.input} ${activeField === "email" ? styles.activeField : ""}`}
            placeholder="・ーーー ... ..."
          />
        </div>

        <div className={styles.fieldBlock}>
          <label className={styles.label}>{FIELD_LABELS.grade}</label>
          <input
            type="text"
            value={values.grade}
            readOnly
            onKeyDown={blockKeyboard}
            onPaste={blockPaste}
            onDrop={(e) => e.preventDefault()}
            onFocus={() => setActiveField("grade")}
            className={`${styles.input} ${activeField === "grade" ? styles.activeField : ""}`}
            placeholder="・ーーー ... ..."
          />
        </div>

        <div className={styles.telegraphSection}>
          <div className={styles.telegraphPreview}>
            <span className={styles.telegraphBuffer}>
              {displayBuffer || "　"}
            </span>
            <span className={styles.telegraphLetter}>
              {currentLetter ? `→ ${currentLetter}` : "　"}
            </span>
          </div>

          <button
            type="button"
            className={`${styles.telegraphKey} ${isPressed ? styles.telegraphKeyPressed : ""}`}
            onPointerDown={handleKeyDown}
            onPointerUp={handleKeyUp}
            onPointerCancel={handleKeyCancel}
            onPointerLeave={handleKeyCancel}
            onContextMenu={(e) => e.preventDefault()}
            aria-label="モールスキー: タップでドット、長押しでダッシュ"
          >
            <span className={styles.telegraphKnob} />
          </button>

          <div className={styles.telegraphCaption}>
            TAP <span className={styles.dotGlyph}>・</span>{" "}
            DOT&nbsp;&nbsp;/&nbsp;&nbsp;HOLD{" "}
            <span className={styles.dashGlyph}>ー</span> DASH
          </div>

          <div className={styles.keyRow}>
            <button
              type="button"
              className={styles.key}
              onClick={commitLetterNow}
            >
              文字確定
            </button>
            <button type="button" className={styles.key} onClick={addSpace}>
              スペース
            </button>
            <button
              type="button"
              className={`${styles.key} ${styles.keyDanger}`}
              onClick={backspace}
            >
              ← 削除
            </button>
            <button
              type="button"
              className={`${styles.key} ${styles.keyDanger}`}
              onClick={clearBuffer}
            >
              クリア
            </button>
          </div>
        </div>

        <div className={styles.fieldBlock}>
          <label className={styles.label}>{FIELD_LABELS.department}</label>
          <input
            type="text"
            value={values.department}
            readOnly
            onKeyDown={blockKeyboard}
            onPaste={blockPaste}
            onDrop={(e) => e.preventDefault()}
            onFocus={() => setActiveField("department")}
            className={`${styles.input} ${activeField === "department" ? styles.activeField : ""}`}
            placeholder="・ーーー ... ..."
          />
        </div>

        <div className={styles.fieldBlock}>
          <label className={styles.label}>{FIELD_LABELS.message}</label>
          <textarea
            value={values.message}
            readOnly
            onKeyDown={blockKeyboard}
            onPaste={blockPaste}
            onDrop={(e) => e.preventDefault()}
            onFocus={() => setActiveField("message")}
            className={`${styles.textarea} ${activeField === "message" ? styles.activeField : ""}`}
            placeholder="・ーーー ... ..."
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          入部を申し込む
        </button>
      </form>

      <div className={styles.chartWrap}>
        <h3 className={styles.chartTitle}>MORSE CODE CHART</h3>
        <div className={styles.chartGrid}>
          {Object.entries(MORSE_TO_CHAR).map(([code, letter]) => (
            <div key={code} className={styles.chartItem}>
              <span className={styles.chartLetter}>{letter}</span>
              <span>{code.replace(/\./g, "・").replace(/-/g, "ー")}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
