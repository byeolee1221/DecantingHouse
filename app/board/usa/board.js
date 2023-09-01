'use client'

import Link from "next/link";
import classes from "../../board.module.css";

const USABoard = (props) => {
    return (
        <div className={classes.board_container}>
            <div className={classes.board_wrapper}>
                <div className={classes.board_popular}>
                    <h1>이 게시판의 인기게시물</h1>
                    <div className={classes.popular_itemBox}>
                        {props.popular.map((data, i) => {
                            return (
                                <div className={classes.popular_item} key={i}>
                                    <h3>{data.userTitle}</h3>
                                    <p className={classes.popular_category}>카테고리: {data.category}</p>
                                    <p>{data.uploadDate}</p>
                                    <p className={classes.popular_contents}>{data.userContents}</p>
                                    <p className={classes.popular_last}><span>by {data.author}</span>🧡 {data.count}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={classes.board_title}>
                    <h2>게시판</h2>
                    <Link href="/write/usa/new">새 글 쓰기</Link>
                </div>
                <div className={classes.board_itemBox}>
                    {props.post
                        .sort(
                            (a, b) => {
                                let dateA = new Date(`${a.uploadDate2} ${a.uploadDate}`);
                                let dateB = new Date(`${b.uploadDate2} ${b.uploadDate}`);
                                return dateB - dateA;
                            })
                        .map((postData, i) => {
                            return (
                                <Link
                                    href={`/board/detail/${postData._id}`}
                                    className={classes.board_item}
                                    key={i}
                                >
                                    <h3>{postData.userTitle}</h3>
                                    <p className={classes.category_item}>
                                        카테고리: {postData.category}
                                    </p>
                                    <p className={classes.date_item}>
                                        {postData.uploadDate}
                                    </p>
                                    <p className={classes.contents_item}>
                                        {postData.userContents}
                                    </p>
                                    <p className={classes.author_item}>
                                        by {postData.author} <span> 💚 {postData.count}</span>
                                    </p>
                                </Link>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default USABoard;