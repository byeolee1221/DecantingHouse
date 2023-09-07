'use client'

import { useState } from "react";
import MyPost from "./myPost";
import AllPost from "./allPost";
import Category1Post from "./category1";
import Category2Post from "./category2";
import Category3Post from "./category3";
import Category4Post from "./category4";
import Category5Post from "./category5";

import classes from "../board.module.css";

const CategoryBtn = () => {
    const [category1, setCategory1] = useState(false);
    const [category2, setCategory2] = useState(false);
    const [category3, setCategory3] = useState(false);
    const [category4, setCategory4] = useState(false);
    const [category5, setCategory5] = useState(false);

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

    return (
        <ul className={classes.board_category_list}>
            <li className={classes.board_category_item}>
                <button type="button" onClick={category1Handler}>
                    품종
                </button>
            </li>
            <li className={classes.board_category_item}>
                <button type="button" onClick={category2Handler}>
                    음식 페어링
                </button>
            </li>
            <li className={classes.board_category_item}>
                <button type="button" onClick={category3Handler}>
                    제품
                </button>
            </li>
            <li className={classes.board_category_item}>
                <button type="button" onClick={category4Handler}>
                    느껴지는 맛
                </button>
            </li>
            <li className={classes.board_category_item}>
                <button type="button" onClick={category5Handler}>
                    기타
                </button>
            </li>
        </ul>
    );
}

export default CategoryBtn;