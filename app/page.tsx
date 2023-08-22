import classes from "./page.module.css";

export default function Home () {
  return (
    <main className={classes.home_container}>
      <div className={classes.home_wrapper}>
        <div className={classes.home_titleImg}>
          <h1>Decanting House</h1>
        </div>
        <div className={classes.home_popularPost_box}>
          <div className={classes.popularPost_title}>
            <h2>인기게시물</h2>
          </div>
          <div className={classes.popularPost_itemBox}>
            <div className={classes.popularPost_item}>     
              <h3>글 제목 공간</h3>
              <p>게시판명</p>
              <p>글 내용 공간</p>
            </div>
            <div className={classes.popularPost_item}>
              <h3>글 제목 공간</h3>
              <p>게시판명</p>
              <p>글 내용 공간</p>
            </div>
            <div className={classes.popularPost_item}>
              <h3>글 제목 공간</h3>
              <p>게시판명</p>
              <p>글 내용 공간</p>
            </div>
            <div className={classes.popularPost_item}>
              <h3>글 제목 공간</h3>
              <p>게시판명</p>
              <p>글 내용 공간</p>
            </div>
            <div className={classes.popularPost_item}>
              <h3>글 제목 공간</h3>
              <p>게시판명</p>
              <p>글 내용 공간</p>
            </div>
            <div className={classes.popularPost_item}>
              <h3>글 제목 공간</h3>
              <p>게시판명</p>
              <p>글 내용 공간</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
