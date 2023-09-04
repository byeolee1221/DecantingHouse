'use client'

import Link from "next/link";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import MyPost from "../myPost";
import AllPost from "../allPost";

import classes from "../../board.module.css";

const GermanyBoard = (props) => {
    const router = useRouter();

    const [myPost, setMyPost] = useState(false);

    let emptyPostError = <p>아직 업로드한 게시글이 없습니다.</p>;

    const myPostHandler = () => {
        if (!props.session) {
            alert('로그인이 필요합니다.');
            router.push('http://localhost:3000/signIn');
            return;
        };

        if (!props.sessionUserPost) {
            return emptyPostError;
        }

        setMyPost(true);
    }

    const allPostHandler = () => {
        setMyPost(false);
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
                                <Link href={`/board/detail/${data._id}`} className={classes.popular_item} key={i}>
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
                        카테고리 자리. 마지막 카테고리는 '내 글'
                    </div>
                    <div className={classes.board_myPost_section}>
                        <button type="button" className={classes.board_PostBtn} onClick={myPostHandler}>내 글</button>
                        <div className={classes.box_centerBorder}></div>
                        <Link href="/write/germany/new">새 글 쓰기</Link>
                    </div>
                </div>
                {myPost ? <MyPost sessionUserPost={props.sessionUserPost} /> : <AllPost post={props.post} />}
            </div>
        </div>
    );
}

export default GermanyBoard;