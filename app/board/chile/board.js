'use client'

import Link from "next/link";
import classes from "../../board.module.css";

const ChileBoard = () => {
    return (
        <div className={classes.board_container}>
            <div className={classes.board_wrapper}>
                <div className={classes.board_popular}>
                    <h1>이 게시판의 인기게시물</h1>
                    <div className={classes.popular_itemBox}>
                        <div className={classes.popular_item}>
                            <h3>글 제목</h3>
                            <p>카테고리</p>
                            <p>글 내용</p>
                        </div>
                        <div className={classes.popular_item}>
                            <h3>글 제목</h3>
                            <p>카테고리</p>
                            <p>글 내용</p>
                        </div>
                        <div className={classes.popular_item}>
                            <h3>글 제목</h3>
                            <p>카테고리</p>
                            <p>글 내용</p>
                        </div>
                        <div className={classes.popular_item}>
                            <h3>글 제목</h3>
                            <p>카테고리</p>
                            <p>글 내용</p>
                        </div>
                    </div>
                </div>
                <div className={classes.board_title}>
                    <h2>게시판</h2>
                    <Link href="/write/new">새 글 쓰기</Link>
                </div>
                <div className={classes.board_itemBox}>
                    <div className={classes.board_item}>
                        <h3>글 제목</h3>
                        <p>카테고리</p>
                        <p>글 내용</p>
                    </div>
                    <div className={classes.board_item}>
                        <h3>글 제목</h3>
                        <p>카테고리</p>
                        <p>글 내용</p>
                    </div>
                    <div className={classes.board_item}>
                        <h3>글 제목</h3>
                        <p>카테고리</p>
                        <p>글 내용</p>
                    </div>
                    <div className={classes.board_item}>
                        <h3>글 제목</h3>
                        <p>카테고리</p>
                        <p>글 내용</p>
                    </div>
                    <div className={classes.board_item}>
                        <h3>글 제목</h3>
                        <p>카테고리</p>
                        <p>글 내용</p>
                    </div>
                    <div className={classes.board_item}>
                        <h3>글 제목</h3>
                        <p>카테고리</p>
                        <p>글 내용</p>
                    </div>
                    <div className={classes.board_item}>
                        <h3>글 제목</h3>
                        <p>카테고리</p>
                        <p>글 내용</p>
                    </div>
                    <div className={classes.board_item}>
                        <h3>글 제목</h3>
                        <p>카테고리</p>
                        <p>글 내용</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChileBoard;