'use client'

import { useRouter } from "next/navigation";
import classes from "./register.module.css";

const RegisterPage = () => {
    const router = useRouter();

    const caneclHandler = () => {
        router.back();
    }

    return (
        <div className={classes.register_container}>
            <div className={classes.register_wrapper}>
                <div className={classes.register_title}>
                    <h2>디캔팅하우스 회원가입</h2>
                    <p>Welcome to Decanting House</p>
                </div>
                <form action="/api/register" method="POST" className={classes.register_form}>
                    <div className={classes.form_contenstBox}>
                        <label htmlFor="user-name">이름</label>
                        <input type="text" id="user-name" name="userName" />
                    </div>
                    <div className={classes.form_contenstBox}>
                        <label htmlFor="user-password">비밀번호</label>
                        <input type="password" id="user-password" name="userPassword" min="8" />
                    </div>
                    <div className={classes.form_contenstBox}>
                        <label htmlFor="user-password2">비밀번호 확인</label>
                        <input type="password" id="user-password2" name="userPassword2" min="8" />
                    </div>
                    <div className={classes.form_contenstBox}>
                        <label htmlFor="user-email">이메일</label>
                        <input type="email" id="user-email" name="userEmail" />
                    </div>
                    <div className={classes.registerForm_btn}>
                        <button type="submit" id={classes.register_submitBtn} disabled>회원가입</button>
                        <button type="button" onClick={caneclHandler}>취소</button>
                    </div>
                </form>
            </div>
        </div>
    );   
}

export default RegisterPage;