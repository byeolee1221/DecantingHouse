'use client'

import classes from "./error.module.css";

const SocialError = ({error, reset}) => {
    return (
        <div className={classes.error_container}>
            <h4>사이트 오류 감지 | 이미 소셜로그인으로 가입된 이메일입니다.</h4>
            <button onClick={() => {reset()}}>다시 시도</button>
        </div>
    );
}

export default SocialError;