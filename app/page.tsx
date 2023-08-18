import classes from "./page.module.css";

export default function Home () {
  return (
    <main className={classes.home_container}>
      <div className={classes.home_wrapper}>
        <img src="/main.jpg" alt="메인페이지 사진" />
        <h1>Decanting House</h1>
      </div>
    </main>
  )
}
