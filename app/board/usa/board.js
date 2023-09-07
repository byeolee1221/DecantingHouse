'use client'

import Link from "next/link";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import MyPost from "../myPost";
import AllPost from "../allPost";
import Category1Post from "../category1";
import Category2Post from "../category2";
import Category3Post from "../category3";
import Category4Post from "../category4";
import Category5Post from "../category5";

import classes from "../../board.module.css";

const USABoard = (props) => {
    const router = useRouter();

    const [myPost, setMyPost] = useState(false);
    const [allPost, setAllPost] = useState(true);
    const [category1, setCategory1] = useState(false);
    const [category2, setCategory2] = useState(false);
    const [category3, setCategory3] = useState(false);
    const [category4, setCategory4] = useState(false);
    const [category5, setCategory5] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const myPostHandler = () => {
        if (!props.session) {
            alert('로그인이 필요합니다.');
            router.push('http://localhost:3000/signIn');
            return;
        };

        if (!props.sessionUserPost) {
            setError(true);
            setErrorMsg('아직 게시한 글이 없습니다.');
            return;
        };

        setMyPost(true);
        setAllPost(false);
        setCategory1(false);
        setCategory2(false);
        setCategory3(false);
        setCategory4(false);
        setCategory5(false);
    }

    const allPostHandler = () => {
        setAllPost(true);
        setMyPost(false);
        setCategory1(false);
        setCategory2(false);
        setCategory3(false);
        setCategory4(false);
        setCategory5(false);
    }

    const category1Handler = () => {
        setCategory1(true);
        setAllPost(false);
        setMyPost(false);
        setCategory2(false);
        setCategory3(false);
        setCategory4(false);
        setCategory5(false);
    }

    const category2Handler = () => {
        setCategory2(true);
        setAllPost(false);
        setMyPost(false);
        setCategory1(false);
        setCategory3(false);
        setCategory4(false);
        setCategory5(false);
    }

    const category3Handler = () => {
        setCategory3(true);
        setAllPost(false);
        setMyPost(false);
        setCategory1(false);
        setCategory2(false);
        setCategory4(false);
        setCategory5(false);
    }

    const category4Handler = () => {
        setCategory4(true);
        setAllPost(false);
        setMyPost(false);
        setCategory1(false);
        setCategory2(false);
        setCategory3(false);
        setCategory5(false);
    }

    const category5Handler = () => {
        setCategory5(true);
        setAllPost(false);
        setMyPost(false);
        setCategory1(false);
        setCategory2(false);
        setCategory3(false);
        setCategory4(false);
    }

    useEffect(() => {
        router.refresh();
    }, [])

    return (
        <div className={classes.board_container}>
            <div className={classes.board_wrapper}>
                <div className={classes.board_popular}>
                    <h1>이 게시판의 인기게시물</h1>
                    <div className={classes.popular_itemBox}>
                        {props.popular.map((data, i) => {
                            return (
                                <Link href={`/board/detail/${data._id.toString()}`} className={classes.popular_item} key={i}>
                                    <div className={classes.board_popular_item_inner}>
                                        <h3>{data.userTitle}</h3>
                                        <p className={classes.popular_category}>카테고리: {data.category}</p>
                                        <p>{data.uploadDate}</p>
                                        <p className={classes.popular_contents}>{data.userContents}</p>
                                    </div>
                                    <p className={classes.popular_last}><span>by {data.author}</span>🧡 {data.count}</p>
                                </Link>
                            );
                        })}
                    </div>
                </div>
                <div className={classes.board_title}>
                    <div className={classes.board_myPost_section}>
                        <h2>게시판</h2>
                        <div className={classes.box_centerBorder}></div>
                        <button type="button" className={classes.board_PostBtn} onClick={allPostHandler}>전체 보기</button>
                    </div>
                    <div className={classes.board_category_section}>
                        <ul className={classes.board_category_list}>
                            <li className={classes.board_category_item}>
                                <button type="button" onClick={category1Handler}>품종</button>
                            </li>
                            <li className={classes.board_category_item}>
                                <button type="button" onClick={category2Handler}>음식 페어링</button>
                            </li>
                            <li className={classes.board_category_item}>
                                <button type="button" onClick={category3Handler}>제품</button>
                            </li>
                            <li className={classes.board_category_item}>
                                <button type="button" onClick={category4Handler}>느껴지는 맛</button>
                            </li>
                            <li className={classes.board_category_item}>
                                <button type="button" onClick={category5Handler}>기타</button>
                            </li>
                        </ul>
                    </div>
                    <div className={classes.board_myPost_section}>
                        <button type="button" className={classes.board_PostBtn} onClick={myPostHandler}>내 글</button>
                        <div className={classes.box_centerBorder}></div>
                        <Link href="/write/usa/new">새 글 쓰기</Link>
                    </div>
                </div>
                {error && <p className={classes.emptyPostError}>{errorMsg}</p>}
                {allPost && <AllPost post={props.post} />}
                {myPost && <MyPost sessionUserPost={props.sessionUserPost} />}
                {category1 && <Category1Post post={props.category1} />}
                {category2 && <Category2Post post={props.category2} />}
                {category3 && <Category3Post post={props.category3} />}
                {category4 && <Category4Post post={props.category4} />}
                {category5 && <Category5Post post={props.category5} />}
            </div>
        </div>
    );
}

export default USABoard;