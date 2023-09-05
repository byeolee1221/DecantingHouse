'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation"
import Link from "next/link"

import classes from "./mainBoard.module.css";

const MainBoardPage = (props) => {
    const router = useRouter();

    useEffect(() => {
        router.refresh();
    }, [])

    return (
        <div className={classes.mainBoard_container}>
            <div className={classes.mainBoard_wrapper}>
                <div className={classes.mainBoard_titleBox}>
                    <h2>국가별 최근게시물</h2>
                </div>
                <div className={classes.mainBoard_main}>
                    <h3 className={classes.main_title}>프랑스</h3>
                    <div className={classes.main_inner}>
                        {props.post.france.sort((a, b) => {
                            let dateA = new Date(`${a.uploadDate2} ${a.uploadDate}`);
                            let dateB = new Date(`${b.uploadDate2} ${b.uploadDate}`);
                            return dateB - dateA;
                        }).map((data, i) => {
                            return (
                                <Link href={`/board/detail/${data._id.toString()}`} key={i} className={classes.mainBoard_board}>
                                    <div className={classes.mainBoard_board_inner}>
                                        <h3>{data.userTitle}</h3>
                                        <p className={classes.board_category}>카테고리: {data.category}</p>
                                        <p>{data.uploadDate}</p>
                                        <p className={classes.board_contents}>{data.userContents}</p>
                                    </div>
                                    <p className={classes.board_author}>by {data.author} <span>💚 {data.count ? data.count : 0}</span></p>
                                </Link>
                            );
                        })}
                    </div>
                    <h3 className={classes.main_title}>미국</h3>
                    <div className={classes.main_inner}>
                        {props.post.usa.sort((a, b) => {
                            let dateA = new Date(`${a.uploadDate2} ${a.uploadDate}`);
                            let dateB = new Date(`${b.uploadDate2} ${b.uploadDate}`);
                            return dateB - dateA;
                        }).map((data, i) => {
                            return (
                                <Link href={`/board/detail/${data._id.toString()}`} key={i} className={classes.mainBoard_board}>
                                    <div className={classes.mainBoard_board_inner}>
                                        <h3>{data.userTitle}</h3>
                                        <p className={classes.board_category}>카테고리: {data.category}</p>
                                        <p>{data.uploadDate}</p>
                                        <p className={classes.board_contents}>{data.userContents}</p>
                                    </div>
                                    <p className={classes.board_author}>by {data.author} <span>💚 {data.count ? data.count : 0}</span></p>
                                </Link>
                            );
                        })}
                    </div>
                    <h3 className={classes.main_title}>이탈리아</h3>
                    <div className={classes.main_inner}>
                        {props.post.italy.sort((a, b) => {
                            let dateA = new Date(`${a.uploadDate2} ${a.uploadDate}`);
                            let dateB = new Date(`${b.uploadDate2} ${b.uploadDate}`);
                            return dateB - dateA;
                        }).map((data, i) => {
                            return (
                                <Link href={`/board/detail/${data._id.toString()}`} key={i} className={classes.mainBoard_board}>
                                    <div className={classes.mainBoard_board_inner}>
                                        <h3>{data.userTitle}</h3>
                                        <p className={classes.board_category}>카테고리: {data.category}</p>
                                        <p>{data.uploadDate}</p>
                                        <p className={classes.board_contents}>{data.userContents}</p>
                                    </div>
                                    <p className={classes.board_author}>by {data.author} <span>💚 {data.count ? data.count : 0}</span></p>
                                </Link>
                            );
                        })}
                    </div>
                    <h3 className={classes.main_title}>칠레</h3>
                    <div className={classes.main_inner}>
                        {props.post.chile.sort((a, b) => {
                            let dateA = new Date(`${a.uploadDate2} ${a.uploadDate}`);
                            let dateB = new Date(`${b.uploadDate2} ${b.uploadDate}`);
                            return dateB - dateA;
                        }).map((data, i) => {
                            return (
                                <Link href={`/board/detail/${data._id.toString()}`} key={i} className={classes.mainBoard_board}>
                                    <div className={classes.mainBoard_board_inner}>
                                        <h3>{data.userTitle}</h3>
                                        <p className={classes.board_category}>카테고리: {data.category}</p>
                                        <p>{data.uploadDate}</p>
                                        <p className={classes.board_contents}>{data.userContents}</p>
                                    </div>
                                    <p className={classes.board_author}>by {data.author} <span>💚 {data.count ? data.count : 0}</span></p>
                                </Link>
                            );
                        })}
                    </div>
                    <h3 className={classes.main_title}>오스트레일리아</h3>
                    <div className={classes.main_inner}>
                        {props.post.australia.sort((a, b) => {
                            let dateA = new Date(`${a.uploadDate2} ${a.uploadDate}`);
                            let dateB = new Date(`${b.uploadDate2} ${b.uploadDate}`);
                            return dateB - dateA;
                        }).map((data, i) => {
                            return (
                                <Link href={`/board/detail/${data._id.toString()}`} key={i} className={classes.mainBoard_board}>
                                    <div className={classes.mainBoard_board_inner}>
                                        <h3>{data.userTitle}</h3>
                                        <p className={classes.board_category}>카테고리: {data.category}</p>
                                        <p>{data.uploadDate}</p>
                                        <p className={classes.board_contents}>{data.userContents}</p>
                                    </div>
                                    <p className={classes.board_author}>by {data.author} <span>💚 {data.count ? data.count : 0}</span></p>
                                </Link>
                            );
                        })}
                    </div>
                    <h3 className={classes.main_title}>독일</h3>
                    <div className={classes.main_inner}>
                        {props.post.germany.sort((a, b) => {
                            let dateA = new Date(`${a.uploadDate2} ${a.uploadDate}`);
                            let dateB = new Date(`${b.uploadDate2} ${b.uploadDate}`);
                            return dateB - dateA;
                        }).map((data, i) => {
                            return (
                                <Link href={`/board/detail/${data._id.toString()}`} key={i} className={classes.mainBoard_board}>
                                    <div className={classes.mainBoard_board_inner}>
                                        <h3>{data.userTitle}</h3>
                                        <p className={classes.board_category}>카테고리: {data.category}</p>
                                        <p>{data.uploadDate}</p>
                                        <p className={classes.board_contents}>{data.userContents}</p>
                                    </div>
                                    <p className={classes.board_author}>by {data.author} <span>💚 {data.count ? data.count : 0}</span></p>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainBoardPage;