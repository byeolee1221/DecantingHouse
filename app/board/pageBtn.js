'use client'

import { useEffect, useState } from "react";
import classes from "./pageBtn.module.css";

const PageBtn = (props) => {
    // 1. 누르면 이전 20개의 게시물을 db로부터 불러와야 함.
    // 2. 게시물은 시간이 현재에 가까운 순으로 배치되기 때문에 이전페이지를 누를수록 현재에 가까운 게시물이 와야 함.
    // 3. 불러올 때 20개로 제한을 걸고, 앞선 시간의 게시물이 오도록 sort를 이용하면 좋을 것 같음.
    // 4. 다음 페이지는 이전 페이지의 반대 로직으로 게시물을 불러와야 함.
    const [page, setPage] = useState(0);
    const [posts, setPosts] = useState([]);
    
    const prevPageBtnHandler = async () => {
        if (page === 0) {
            setPage(0);
        } else {
            setPage(page - 1);
        };

        const response = await fetch(`/api/pagenation?page=${page}&country=${props.country}`, {
            method: 'GET'
        });

        const data = await response.json();
        
        if (data.status === 200) {
            setPosts(data.findPost);
        };
    }

    const nextPageBtnHandler = async () => {
        setPage(page + 1);

        const response = await fetch(`/api/pagenation?page=${page}&country=${props.country}`, {
            method: 'GET'
        });

        const data = await response.json();

        if (!data.findPost) {
            alert('더 이상 표시할 게시물이 없습니다.');
            return;
        };
        
        if (data.status === 200) {
            setPosts(data.findPost);
        };
    }

    return (
        <div className={classes.pageBtn_box}>
            <button type="button" onClick={prevPageBtnHandler} >이전페이지</button>
            <div className={classes.pageBtn_CenterLine}></div>
            <button type="button" onClick={nextPageBtnHandler}>다음페이지</button>
        </div>
    );
}

export default PageBtn;