'use client'

import { useRouter } from "next/navigation";
import classes from "../error.module.css";

const SocialError = () => {
    const router = useRouter();

    const confirmBtnHandler = () => {
        router.push('http://localhost:3000/signIn');
    }

    return (
        <div className={classes.error_container}>
            <h4>사이트 오류 감지 | 이미 소셜로그인으로 가입된 이메일입니다.</h4>
            <button onClick={confirmBtnHandler}>확인</button>
        </div>
    );
}

export default SocialError;