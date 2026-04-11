import Image from "next/image";
import style from "./style.module.css"

export default function Home() {
  return (
    <div>
      <main className={style.main}>
        <h1 className={style.title}>クソWEBアプリ集</h1>
        <div className={style.linkArea}>
          <div className={style.linkBox}>
            <a href="https://info.tompedia.jp">
              <Image
                src="/logo.png"
                width={200}
                height={200}
                alt="Tompedia"
              />
              Tompedia
            </a>
          </div>
          <div className={style.linkBox}>
            <a href="/the-day-after-tomorow">
              <Image
                src="/todo.png"
                width={200}
                height={200}
                alt="The Day after Tomorow's ToDo"
              />
              ToDo
            </a>
          </div>
          <div className={style.linkBox}>
            <a href="/login">
              <Image
                src="/login.png"
                width={200}
                height={200}
                alt="Login"
              />
              ログイン
            </a>
          </div>
         </div>
      </main>
    </div>
  );
}
