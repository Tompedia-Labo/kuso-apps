"use client";
import { useState, useEffect } from "react";
import styles from "./style.module.css";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export default function Page() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const yy = now.getFullYear().toString();
  const MM = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");

  let hours = now.getHours();
  const isAm = hours < 12;


  const hh = String(hours).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");

  const dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(now.getDate() + 2);

 const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  // 追加
  const addTodo = () => {
    if (!input.trim()) return;

    setTodos([
      ...todos,
      { id: Date.now(), text: input, done: false }
    ]);
    setInput("");
  };

  // 削除
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // チェック切替
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  return (
    <div className={styles.mainArea}>
      <h2 className={styles.mainTitle}>The Day After Tomorow</h2>
      <div className={styles.datetimeArea}>
        <div className={styles.dateArea}>
          <div className={styles.dateDblock}>{dd}</div>
          <div className={styles.dateYblock}>{yy}</div>
          <div className={styles.dateMblock}>{MM}</div>
        </div>
        <div className={styles.clockArea}>
          <div className={styles.clockAMPMblock}>
            <div className={`${styles.clockAMblock} ${isAm ? styles.selectedAMPM : styles.unselectedAMPM}`}>AM</div>
            <div className={`${styles.clockAMblock} ${isAm ? styles.unselectedAMPM : styles.selectedAMPM}`}>PM</div>
          </div>
          <div className={styles.clockHblock}>{hh}</div>
          <div className={styles.clockMblock}>{mm}</div>
        </div>
      </div>
      <div className={styles.todoArea}>
        <div className={styles.todoItem}>
          <input type="checkbox" />
          <span>眠くなったら寝る</span>
        </div>

        <div className={styles.todoItem}>
          <input type="checkbox" />
          <span>お昼過ぎに起きる</span>
        </div>

        <div className={styles.todoItem}>
          <input type="checkbox" />
          <span>パンで歯を磨く</span>
        </div>
        {/*
        <div className={styles.todoInputArea}>
          <div style={{ display: "flex", gap: "10px", width: "100%" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              
              style={{ flex: 1 }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTodo();
                  setInput("");
                }
              }}
            />
            <button
              type="button"
              onClick={addTodo}
            >
              Add
            </button>
          </div>
        </div>

        {todos.map(todo => (
          <div key={todo.id} className={styles.todoItem}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />

            <span className={todo.done ? styles.doneText : ""}>
              {todo.text}
            </span>

            <button onClick={() => deleteTodo(todo.id)}>×</button>
          </div>
        ))}
        */}
       </div>
    </div>
  );
}
