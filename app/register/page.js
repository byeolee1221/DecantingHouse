'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import classes from "./register.module.css";

const RegisterPage = () => {
    const router = useRouter();

    const cancelHandler = () => {
        router.back();
    }

    const [name, setName] = useState('');
    const [nickName, setNickName] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');

    const nameChangeHandler = (event) => {
        setName(event.target.value);
    }

    const nickNameChangeHandler = (event) => {
        setNickName(event.target.value);
    }

    const password1ChangeHandler = (event) => {
        setPassword1(event.target.value);
    }

    const password2ChangeHandler = (event) => {
        setPassword2(event.target.value);
    }

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    }

    let formIsValid = false;
    
    if (name && nickName && password1 && password2 && email) {
        formIsValid = true;
    };

    // 3. 제출하면 서버에서 각 요소에 대한 인증을 거치며, 인증 시 잘못 입력됐으면 값을 DB로 보내지 않고 이 컴포넌트로 인증이 안됐음을 useEffect로 받아 해당 요소의 input 아래에 빨간 경고글 띄우기

    return (
        <div className={classes.register_container}>
            <div className={classes.register_wrapper}>
                <div className={classes.register_title}>
                    <h2>디캔팅하우스 회원가입</h2>
                    <p>Welcome to Decanting House</p>
                </div>
                <form action="/api/auth/signup" method="POST" className={classes.register_form}>
                    <div className={classes.form_contenstBox}>
                        <label htmlFor="user-name">이름</label>
                        <div className={classes.form_item}>
                            <input type="text" id="user-name" name="userName" onChange={nameChangeHandler} value={name} />
                            <p className={classes.register_error}>이름을 확인해주세요.</p>
                        </div>
                    </div>
                    <div className={classes.form_contenstBox}>
                        <label htmlFor="user-nickname">닉네임</label>
                        <div className={classes.form_item}>
                            <input type="text" id="user-nickname" name="userNickName" onChange={nickNameChangeHandler} value={nickName} />
                            <p className={classes.register_error}>닉네임을 확인해주세요.</p>
                        </div>
                    </div>
                    <div className={classes.form_contenstBox}>
                        <label htmlFor="user-password">비밀번호</label>
                        <div className={classes.form_item}>
                            <input type="password" id="user-password" name="userPassword" min="8" placeholder=" 8자 이상 입력" onChange={password1ChangeHandler} value={password1} />
                            <p className={classes.register_error}>비밀번호를 확인해주세요.</p>
                        </div>
                    </div>
                    <div className={classes.form_contenstBox}>
                        <label htmlFor="user-password2">비밀번호 확인</label>
                        <div className={classes.form_item}>
                            <input type="password" id="user-password2" name="userPassword2" min="8" placeholder=" 위 비밀번호와 동일하게 입력" onChange={password2ChangeHandler} value={password2} />
                            <p className={classes.register_error}>비밀번호가 서로 맞지 않습니다.</p>
                        </div>
                    </div>
                    <div className={classes.form_contenstBox}>
                        <label htmlFor="user-email">이메일</label>
                        <div className={classes.form_item}>
                            <input type="email" id="user-email" name="userEmail" onChange={emailChangeHandler} value={email} />
                            <p className={classes.register_error}>이메일을 확인해주세요.</p>
                        </div>
                    </div>
                    <div className={classes.registerForm_btn}>
                        <button type="submit" id={classes.register_submitBtn} disabled={!formIsValid}>회원가입</button>
                        <button type="button" onClick={cancelHandler}>취소</button>
                    </div>
                </form>
            </div>
        </div>
    );   
}

export default RegisterPage;