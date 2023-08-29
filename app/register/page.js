'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import RegisterSuccessPage from "./success/page";

import classes from "./register.module.css";

const RegisterPage = () => {
    const router = useRouter();

    const cancelHandler = () => {
        router.back();
    }

    const [realName, setRealName] = useState('');
    const [name, setName] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const realNameChangeHandler = (event) => {
        setRealName(event.target.value);
    }

    const nickNameChangeHandler = (event) => {
        setName(event.target.value);
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
    
    if (realName && name && password1 && password2 && email) {
        formIsValid = true;
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        if (!realName) {
            setErrorMsg('이름을 확인해주세요.');    
            return; 
        } 

        if (!name) {
            setErrorMsg('닉네임을 확인해주세요.');    
            return;   
        } 

        if (password1.trim().length < 8) {
            setErrorMsg('비밀번호는 8자리 이상이어야 합니다.');   
            return;   
        }

        if (password2 !== password1) {
            setErrorMsg('비밀번호가 서로 다릅니다.');   
            return;   
        }

        if (!email || email.includes('@') === false) {
            setErrorMsg('이메일을 확인해주세요.');      
            return;      
        }

        let userData = {
            realName,
            name,
            password1,
            password2,
            email
        }

        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'content-type' : 'application/json' },
            body: JSON.stringify(userData)
        })

        let data = await response.json();

        if (data.status === 200) {
            setSuccess(true);
        } else {
            setErrorMsg(data.message);
        }
    }

    return (
        <div className={classes.register_container}>
            {success ? <RegisterSuccessPage /> : ''}
            {!success ? <div className={classes.register_wrapper}>
                <div className={classes.register_title}>
                    <h2>디캔팅하우스 회원가입</h2>
                    <p>Welcome to Decanting House</p>
                </div>
                <form action="/" method="POST" className={classes.register_form} onSubmit={submitHandler}>
                    <div className={classes.form_contenstBox}>
                        <label htmlFor="user-realName">이름</label>
                        <div className={classes.form_item}>
                            <input type="text" id="user-realName" name="userRealName" onChange={realNameChangeHandler} value={realName} />
                        </div>
                    </div>
                    <div className={classes.form_contenstBox}>
                        <label htmlFor="user-nickname">닉네임</label>
                        <div className={classes.form_item}>
                            <input type="text" id="user-nickname" name="userNickName" onChange={nickNameChangeHandler} value={name} />
                        </div>
                    </div>
                    <div className={classes.form_contenstBox}>
                        <label htmlFor="user-password">비밀번호</label>
                        <div className={classes.form_item}>
                            <input type="password" id="user-password" name="userPassword" min="8" placeholder=" 8자 이상 입력" onChange={password1ChangeHandler} value={password1} />
                        </div>
                    </div>
                    <div className={classes.form_contenstBox}>
                        <label htmlFor="user-password2">비밀번호 확인</label>
                        <div className={classes.form_item}>
                            <input type="password" id="user-password2" name="userPassword2" min="8" placeholder=" 위 비밀번호와 동일하게 입력" onChange={password2ChangeHandler} value={password2} />
                        </div>
                    </div>
                    <div className={classes.form_contenstBox}>
                        <label htmlFor="user-email">이메일</label>
                        <div className={classes.form_item}>
                            <input type="email" id="user-email" name="userEmail" onChange={emailChangeHandler} value={email} />                        
                        </div>
                    </div>
                    <p className={classes.register_error}>{errorMsg}</p>
                    <div className={classes.registerForm_btn}>
                        <button type="submit" id={classes.register_submitBtn} disabled={!formIsValid}>회원가입</button>
                        <button type="button" onClick={cancelHandler}>취소</button>
                    </div>
                </form>
            </div> : ''}
        </div>
    );   
}

export default RegisterPage;