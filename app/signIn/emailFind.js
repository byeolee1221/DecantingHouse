'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

import classes from "./login.module.css";

const EmailFind = () => {
    const router = useRouter();

    const [realName, setRealName] = useState('');
    const [name, setName] = useState('');
    const [find, setFind] = useState(false);
    const [findData, setFindData] = useState('');
    const [error, setError] = useState('');

    const realNameChangeHandler = (event) => {
        setRealName(event.target.value);
    }

    const nameChangeHandler = (event) => {
        setName(event.target.value);
    }

    let isFormSetted = false;

    if (realName && name) {
        isFormSetted = true;
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        let sendData = {
            realName,
            name,
            find: 'email'
        };

        const response = await fetch('/api/auth/findInfo', {
            method: 'POST',
            headers: { 'content-type' : 'application/json' },
            body: JSON.stringify(sendData)
        });

        const data = await response.json();

        if (data.status === 200) {
            setFind(true);
            setFindData(data.email);
        } else {
            setError(data.message);
        };
    }

    const cancelBtnHandler = () => {
        router.back();
    }

    const findBoxBtnHandler = () => {
        router.back();
    }

    return (
        <div className={classes.emailFind_box}>
            <h3>이메일 찾기</h3>
            {!find && <form action="/" method="POST" className={classes.emailFind_form} onSubmit={submitHandler}>
                <div className={classes.loginForm_contentsBox}>
                    <label htmlFor="user-realName">이름</label>
                    <input type="text" id="user-realName" name="userRealName" onChange={realNameChangeHandler} value={realName} />
                </div>
                <div className={classes.loginForm_contentsBox}>
                    <label htmlFor="user-name">닉네임</label>
                    <input type="text" id="user-name" name="userName" onChange={nameChangeHandler} value={name} />
                </div>
                <p className={classes.login_errorMsg}>{error}</p>
                <div className={classes.loginForm_btn}>
                    <button type="submit" id={classes.emailFind_submitBtn} disabled={!isFormSetted}>찾기</button>
                    <button type="button" onClick={cancelBtnHandler}>취소</button>
                </div>
            </form>}
            {find && 
            <div className={classes.emailFind_findBox}>
                <p className={classes.emailFind_findMsg}>회원님의 이메일은 {findData}입니다.</p>
                <button type="button" onClick={findBoxBtnHandler}>확인</button>
            </div>}
        </div>
    );
}

export default EmailFind;