import Image from "next/image";
import style from "./style.module.css";

export default function Home() {
  return (
    <div>
      <main className={style.main}>
        <h1 className={style.title}>クソWEBアプリ集</h1>
        <div className={style.linkArea}>
          <div className={style.linkBox}>
            <a href="https://info.tompedia.jp">
              <Image src="/logo.png" width={200} height={200} alt="Tompedia" />
              Tompedia
            </a>
          </div>
          <div className={style.linkBox}>
            <a href="/the-day-after-tomorow">
              <Image
                src="/the-day-after-tomorow.png"
                width={200}
                height={200}
                alt="The Day after Tomorow's ToDo"
              />
              ToDo
            </a>
          </div>
          <div className={style.linkBox}>
            <a href="/the-day-after-tomorow">
              <Image
                src="/the-day-after-tomorow.png"
                width={200}
                height={200}
                alt="The Day after Tomorow's ToDo"
              />
              ToDo
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
              とんペディア入部フォーム
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
