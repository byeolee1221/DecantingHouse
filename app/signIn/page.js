'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import EmailFind from "./emailFind";
import PasswordFind from "./passwordFind"; 

import classes from "./login.module.css";

const signInPage = () => {
    const router = useRouter();
    const searchParms = useSearchParams();

    let socialErrors = searchParms.get('error');
    // console.log(socialErrors);

    const cancelBtnHandler = () => {
        router.back();
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [socialError, setSocialError] = useState('');
    const [emailFind, setEmailFind] = useState(false);
    const [passwordFind, setPasswordFind] = useState(false);

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

    const loginBoxImg = [
        { providerName: "Google", provider: "google", path: "/g-logo.png", imgAlt: "구글 로그인" },
        { providerName: "KAKAO", provider: "kakao", path: "/kakao_login_large.png", imgAlt: "카카오 로그인" },
        { providerName: "네이버", provider: "naver", path: "/naver.png", imgAlt: "네이버 로그인" }
    ];

    const loginBtnHandler = async (event) => {
        event.preventDefault();

        const response = await signIn("credentials", {
            email,
            password,
            redirect: false
        });

        // console.log(response);

        if (!response.ok) {
            setError('이메일이나 비밀번호를 다시 한번 확인해주세요');
        } else {
            router.back();
        }
    }

    if (socialErrors === 'OAuthAccountNotLinked') {
        router.push('/socialError');
        return;
    };

    const emailFindBtnHandler = () => {
        setEmailFind(true);
    }

    const passwordFindBtnHandler = () => {
        setPasswordFind(true);
    }

    return (
        <div className={classes.login_container}>
            <div className={classes.login_wrapper}>
                <div className={classes.login_title}>
                    <h2>로그인</h2>
                </div>
                <div className={classes.third_loginBox}>
                    {loginBoxImg.map((data, i) => {
                        const btnHandler = () => signIn(data.provider);
                        return (
                        <div className={classes.loginBox_item} key={i}>
                            <button type="button" onClick={btnHandler}>
                                <img src={data.path} alt={data.imgAlt} />
                            </button>
                            <p>{data.providerName} 로그인</p>
                        </div>);
                    })}
                    <p className={classes.login_errorMsg}>{socialError}</p>
                </div>
                <div className={classes.Oauth_loginBox}>
                    <h2>또는</h2>
                    {!emailFind && !passwordFind && <form action="/" method="POST" className={classes.login_form}>
                        <div className={classes.loginForm_contentsBox}>
                            <label htmlFor="user-email">이메일</label>
                            <input type="email" id="user-email" name="userEmail" onChange={emailChangeHandler} value={email} />
                        </div>
                        <div className={classes.loginForm_contentsBox}>
                            <label htmlFor="user-password">비밀번호</label>
                            <input type="password" id="user-password" name="userPassword" onChange={passwordChangeHandler} value={password} />
                        </div>
                        <div className={classes.loginForm_findInfoBox}>
                            <button type="button" onClick={emailFindBtnHandler}>이메일 찾기</button>
                            <div className={classes.findInfo_center}></div>
                            <button type="button" onClick={passwordFindBtnHandler}>비밀번호 찾기</button>
                        </div>
                        <p className={classes.login_errorMsg}>{error}</p>
                        <div className={classes.loginForm_btn}>
                            <button type="submit" id={classes.login_submitBtn} disabled={!isSubmitted} onClick={loginBtnHandler}>로그인</button>
                            <button type="button" onClick={cancelBtnHandler}>취소</button>
                        </div>
                    </form>}
                    {emailFind && !passwordFind && <EmailFind />}
                    {passwordFind && !emailFind && <PasswordFind />}
                </div>
            </div>
        </div>
    );
}

export default signInPage;