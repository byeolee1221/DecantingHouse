'use client'

import { useRouter } from "next/navigation"
import classes from "./success.module.css";

const RegisterSuccessPage = () => {
    const router = useRouter();

    const btnHandler = () => {
        router.push('/');
    }

    return (
        <div className={classes.success_container}>
            <div className={classes.success_wrapper}>
                <h1>회원가입해주셔서 감사합니다.</h1>
                <h3>와인러들을 위한 와인커뮤니티, 디캔팅하우스에서 즐거운 시간 보내세요!</h3>
                <button onClick={btnHandler}>확인</button>
            </div>
        </div>
    );
}

export default RegisterSuccessPage;