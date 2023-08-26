'use client'

import { useState } from "react";
import WriteNewFormPage from "../../writeNewForm";
import classes from "../../write.module.css";

const WriteNewPage = () => {
    const [postData, setPostData] = useState([]);

    const country = 'Germany';

    // 로그인 안하고 진입하려 하면 로그인페이지로 안내

    return (
        <div className={classes.board_write_container}>
            <div className={classes.write_wrapper}>
                <div className={classes.write_titleBox}>
                    <h1>게시글 작성하기</h1>
                </div>
                <form action="/api/write/germany" method="POST" className={classes.write_userForm} >
                    <WriteNewFormPage country={country} />
                </form>
            </div>
        </div>
    );
}

export default WriteNewPage;