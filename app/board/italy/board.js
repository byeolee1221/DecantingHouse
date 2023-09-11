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

const ItalyBoard = (props) => {
    const router = useRouter();

    const [selectedCategory, setSelectedCategory] = useState('allPost');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [page, setPage] = useState(0);
    const [posts, setPosts] = useState([]);

    const categoryHandler = (category) => {
        if (category === 'myPost' && !props.session) {
            alert('로그인이 필요합니다.');
            router.push('http://localhost:3000/signIn');
            return;
        };

        if (category === 'myPost' && !props.sessionUserPost) {
            setError(true);
            setErrorMsg('아직 게시한 글이 없습니다.');
            return;
        };

        setSelectedCategory(category);
    }

    const prevPageBtnHandler = () => {
        if (page === -1) {
            setPage(0);
            alert('첫 번째 페이지입니다.');
        } else {
            setPage(page - 1);
        };

        scrollTo({top: 700, behavior: 'smooth'});
    }

    const nextPageBtnHandler = () => {
        setPage(page + 1);

        scrollTo({top: 700, behavior: 'smooth'});
    }

    useEffect(() => {
        const pageFetch = async () => {
            const response = await fetch(`/api/pagenation?page=${page}&country=italy`, {
                method: 'GET'
            });
    
            const data = await response.json();
    
            if (data.findPost.length === 0) {
                alert('더 이상 표시할 게시물이 없습니다.');
                return;
            };
            
            if (data.status === 200) {
                setPosts(data.findPost);
            };
        }

        pageFetch(); 

    }, [page])

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
                        <button type="button" className={classes.board_PostBtn} onClick={() => categoryHandler('allPost')}>전체 보기</button>
                    </div>
                    <div className={classes.board_category_section}>
                        <ul className={classes.board_category_list}>
                            <li className={classes.board_category_item}>
                                <button type="button" onClick={() => categoryHandler('category1')}>품종</button>
                            </li>
                            <li className={classes.board_category_item}>
                                <button type="button" onClick={() => categoryHandler('category2')}>음식 페어링</button>
                            </li>
                            <li className={classes.board_category_item}>
                                <button type="button" onClick={() => categoryHandler('category3')}>제품</button>
                            </li>
                            <li className={classes.board_category_item}>
                                <button type="button" onClick={() => categoryHandler('category4')}>느껴지는 맛</button>
                            </li>
                            <li className={classes.board_category_item}>
                                <button type="button" onClick={() => categoryHandler('category5')}>기타</button>
                            </li>
                        </ul>
                    </div>
                    <div className={classes.board_myPost_section}>
                        <button type="button" className={classes.board_PostBtn} onClick={() => categoryHandler('myPost')}>내 글</button>
                        <div className={classes.box_centerBorder}></div>
                        <Link href="/write/italy/new">새 글 쓰기</Link>
                    </div>
                </div>
                {error && <p className={classes.emptyPostError}>{errorMsg}</p>}
                {selectedCategory === 'allPost' && <AllPost post={posts} />}
                {selectedCategory === 'myPost' && <MyPost sessionUserPost={props.sessionUserPost} />}
                {selectedCategory === 'category1' && <Category1Post post={props.category1} />}
                {selectedCategory === 'category2' && <Category2Post post={props.category2} />}
                {selectedCategory === 'category3' && <Category3Post post={props.category3} />}
                {selectedCategory === 'category4' && <Category4Post post={props.category4} />}
                {selectedCategory === 'category5' && <Category5Post post={props.category5} />}
                <div className={classes.pageBtn_box}>
                    <button type="button" onClick={prevPageBtnHandler} >이전페이지</button>
                    <div className={classes.pageBtn_CenterLine}></div>
                    <button type="button" onClick={nextPageBtnHandler} >다음페이지</button>
                </div>
            </div>
        </div>
    );
}

export default ItalyBoard;