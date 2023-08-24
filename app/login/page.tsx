'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import classes from "./login.module.css";

const LoginPage = () => {
    const router = useRouter();

    const cancelBtnHandler = () => {
        router.back();
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    type LoginEvent = React.ChangeEvent<HTMLInputElement>;

    const emailChangeHandler = (event: LoginEvent) => {
        setEmail(event.target.value);
    }

    const passwordChangeHandler = (event: LoginEvent) => {
        setPassword(event.target.value);
    }

    let isSubmitted = false;

    if (email && password) {
        isSubmitted = true;
    };

    return (
        <div className={classes.login_container}>
            <div className={classes.login_wrapper}>
                <div className={classes.login_title}>
                    <h2>로그인</h2>
                </div>
                <div className={classes.third_loginBox}>
                    <div className={classes.loginBox_item}>
                        <button type="button">
                            <img src="/g-logo.png" alt="구글 로그인" />
                        </button>
                        <p>Google 로그인</p>
                    </div>
                    <div className={classes.loginBox_item}>
                        <button type="button">
                            <img src="/kakao_login_large.png" alt="카카오 로그인" />
                        </button>
                    </div>
                    <div className={classes.loginBox_item}>
                        <button type="button">
                            <img src="/naver.png" alt="네이버 로그인" />
                        </button>
                        <p>네이버 로그인</p>
                    </div>
                </div>
                <div className={classes.Oauth_loginBox}>
                    <h2>또는</h2>
                    <form action="/api/login" method="POST" className={classes.login_form}>
                        <div className={classes.loginForm_contentsBox}>
                            <label htmlFor="user-email">이메일</label>
                            <input type="email" id="user-email" name="userEmail" onChange={emailChangeHandler} value={email} />
                        </div>
                        <div className={classes.loginForm_contentsBox}>
                            <label htmlFor="user-password">비밀번호</label>
                            <input type="password" id="user-password" name="userPassword" onChange={passwordChangeHandler} value={password} />
                        </div>
                        <div className={classes.loginForm_btn}>
                            <button type="submit" id={classes.login_submitBtn} disabled={!isSubmitted}>로그인</button>
                            <button type="button" onClick={cancelBtnHandler}>취소</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;