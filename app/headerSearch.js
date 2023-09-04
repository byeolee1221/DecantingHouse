'use client'

import { useEffect, useState } from "react";
import classes from "./header.module.css";
import { useRouter } from "next/navigation";

const HeaderSearch = (props) => {
    const router = useRouter();

    const [search, setSearch] = useState('');

    const searchChangeHandler = (event) => {
        setSearch(event.target.value);
    }

    const searchHandler = (event) => {
        event.preventDefault();

        router.push(`/searchPost?search=${encodeURIComponent(search)}`);
    } 

    return (
        <div className={classes.second_nav_left}>
            <img src="/search.png" alt="검색"/>
            <form action="/" method="GET" onSubmit={searchHandler}>
                <input type="text" id="user_search" name="search" onChange={searchChangeHandler} value={search} />
                <button type="submit">찾기</button>
            </form>
        </div>
    );
}

export default HeaderSearch;