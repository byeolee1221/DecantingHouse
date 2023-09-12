'use client'

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import classes from "./searchPost.module.css";

const SearchPost = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [result, setResult] = useState([]);
    let userSearch = searchParams.get('search');

    // console.log(result);
   
    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`/api/search?search=${userSearch}`, {
                method: 'GET'
            })

            const data = await response.json();

            console.log(data.searchPost);
            if (data.status === 200) {
                setResult(data.searchPost);
                router.refresh();
            };
        }

        getData();

    }, [userSearch])

    return (
        <div className={classes.searchPost_container}>
            <div className={classes.searchPost_wrapper}>
                <div className={classes.searchPost_titleBox}>
                    <h2>검색한 게시물</h2>
                </div>
                <div className={classes.searchPost_board}>
                    {result.length === 0 && <p className={classes.searchPost_errorMsg}>검색결과가 없습니다.</p>}
                    {result.length > 0 && <div className={classes.searchPost_contentsBox}>
                        {result.sort((a, b) => {
                            let dateA = new Date(`${a.uploadDate2} ${a.uploadDate}`);
                            let dateB = new Date(`${b.uploadDate2} ${b.uploadDate}`);
                            return dateB - dateA;
                        }).map((data, i) => {
                            return (
                                <Link href={`/board/detail/${data._id.toString()}`} key={i} className={classes.searchPost_contents}>
                                <div className={classes.searchPost_contentsInnerBox}>
                                    <h3>{data.userTitle}</h3>
                                    <p className={classes.searchPost_category}>카테고리: {data.category}</p>
                                    <p className={classes.searchPost_uploadDate}>{data.uploadDate}</p>
                                    <p className={classes.searchPost_Postcontents}>{data.userContents}</p>
                                </div>
                                <p className={classes.searchPost_author}>by {data.author} <span>💚 {data.count ? data.count : 0}</span></p>
                            </Link>
                            );
                        })}
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default SearchPost;