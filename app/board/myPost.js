'use client'

import Link from "next/link";

import classes from "../board.module.css";
import { Fragment } from "react";

const MyPost = (props) => {
    return (
        <Fragment>

            <div className={classes.board_itemBox}>
                {props.sessionUserPost
                    .sort((a, b) => {
                        let dateA = new Date(`${a.uploadDate2} ${a.uploadDate}`);
                        let dateB = new Date(`${b.uploadDate2} ${b.uploadDate}`);
                        return dateB - dateA;
                    })
                    .map((postData, i) => {
                        return (
                            <Link
                                href={`/board/detail/${postData._id.toString()}`}
                                className={classes.board_item}
                                key={i}
                            >
                                <div className={classes.board_innerBox}>
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
                                </div>
                                <p className={classes.author_item}>
                                    by {postData.author}
                                    <span>
                                        💚 {postData.count ? postData.count : 0}
                                    </span>
                                </p>
                            </Link>
                        );
                    })}
            </div>
        </Fragment>
    );
}

export default MyPost;