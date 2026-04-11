import Image from "next/image";
import style from "./style.module.css";

export default function Home() {
  return (
    <main className={style.main}>
      <h1 className={style.title}>クソWEBアプリ集</h1>
      <div className={style.linkArea}>
        <div className={style.linkBox}>
          <a href="/the-day-after-tomorow">
            <Image
              src="/todo.png"
              width={200}
              height={200}
              alt="The Day after Tomorow's ToDo"
            />
            全てがクソなToDoリスト
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
            東北大生しかログインできないログインページ
          </a>
        </div>
        <div className={style.linkBox}>
          <a href="/tu-ton">
            <Image
              src="/logo.png"
              width={200}
              height={200}
              alt="とんペディア入部フォーム"
            />
            モールス信号でしか入力できないとんペディア入部フォーム
          </a>
        </div>
      </div>
      <h1>とんペディアの紹介</h1>
      <div className={style.linkArea}>
        <div className={style.linkBox}>
          <a href="https://info.tompedia.jp" target="_blank">
            <Image
              src="/logo.png"
              width={200}
              height={200}
              alt="Tompedia"
            />
            とんペディアアプリについて
          </a>
        </div>
        <div className={style.linkBox}>
          <a href="https://labo.tompedia.jp" target="_blank">
            <Image
              src="/logo.png"
              width={200}
              height={200}
              alt="Tompedia"
            />
            とんペディア_ラボについて
          </a>
        </div>
      </div>
    </main>
  );
}
