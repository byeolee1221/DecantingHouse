'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import classes from "./login.module.css";

import LoginBtn from "./LoginBtn";

const LoginPage = () => {
    const router = useRouter();

    const cancelBtnHandler = () => {
        router.back();
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    let isSubmitted = false;

    if (email && password) {
        isSubmitted = true;
    };

    let siteData = [
        { siteName: "google", btnName:"구글 로그인", siteLogo: "/g-logo.png" },
        { siteName: "kakao", btnName:"카카오 로그인", siteLogo: "/kakao_login_large.png" },
        { siteName: "naver", btnName:"네이버 로그인", siteLogo: "/naver.png" },
    ];

    return (
        <div className={classes.login_container}>
            <div className={classes.login_wrapper}>
                <div className={classes.login_title}>
                    <h2>로그인</h2>
                </div>
                <div className={classes.third_loginBox}>
                    {
                        siteData.map((site) => 
                            <LoginBtn siteName={site.siteName} btnName={site.btnName} siteLogo={site.siteLogo} />
                        )
                    }
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
                            <button type="submit" id={classes.login_submitBtn} disabled={!isSubmitted} onClick={() => {signIn()}}>로그인</button>
                            <button type="button" onClick={cancelBtnHandler}>취소</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;