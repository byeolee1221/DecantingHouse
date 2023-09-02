'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import classes from "./likedPost.module.css";

const LikedBoard = (props) => {
    const router = useRouter();

    useEffect(() => {
        router.refresh();
    }, [])

    return (
        <div className={classes.LikedBoard_mainBoard_container}>
            <div className={classes.LikedBoard_mainBoard_wrapper}>
                <div className={classes.mainBoard_contentsBox}>
                    {props.userLikePost.sort((a, b) => {
                        let dateA = new Date(`${a.uploadDate2} ${a.uploadDate}`);
                        let dateB = new Date(`${b.uploadDate2} ${b.uploadDate}`);
                        return dateB - dateA;
                    }).map((data, i) => {
                        return (
                            <Link href={`/board/detail/${data._id}`} key={i} className={classes.mainBoard_contents}>
                                <div className={classes.mainBoard_contentsInnerBox}>
                                    <h3>{data.userTitle}</h3>
                                    <p className={classes.mainBoard_category}>카테고리: {data.category}</p>
                                    <p className={classes.mainBoard_uploadDate}>{data.uploadDate}</p>
                                    <p className={classes.mainBoard_Postcontents}>{data.userContents}</p>
                                </div>
                                <p className={classes.mainBoard_author}>by {data.author} <span>💚 {data.count ? data.count : 0}</span></p>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default LikedBoard;