'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import classes from "./login.module.css";

const PasswordFind = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [realName, setRealName] = useState('');
    const [name, setName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const [find, setFind] = useState(false); 
    const [error, setError] = useState('');

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    }

    const realNameChangeHandler = (event) => {
        setRealName(event.target.value);
    }

    const nameChangeHandler = (event) => {
        setName(event.target.value);
    }

    const newPasswordChangeHandler = (event) => {
        setNewPassword(event.target.value);
    }

    const newPassword2ChangeHandler = (event) => {
        setNewPassword2(event.target.value);
    }

    let isFormSetted = false;

    if (email && realName && name) {
        isFormSetted = true;
    };

    let isPasswordSetted = false;

    if (newPassword && newPassword2) {
        isPasswordSetted = true;
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        let sendData = {
            email,
            realName,
            name,
            find: 'password'
        };

        const response = await fetch('/api/auth/findInfo', {
            method: 'POST',
            headers: { 'content-type' : 'application/json' },
            body: JSON.stringify(sendData)
        });

        const data = await response.json();

        if (data.status === 200) {
            setFind(true);
            setError('');
        } else {
            setError(data.message);
        };
    }

    const passwordChangeHandler = async (event) => {
        event.preventDefault();

        let sendData = {
            newPassword,
            newPassword2,
            email
        };

        const response = await fetch('/api/auth/findPassword', {
            method: 'POST',
            headers: { 'content-type' : 'application/json' },
            body: JSON.stringify(sendData)
        });

        const data = await response.json();

        if (data.status === 200) {
            alert('비밀번호가 변경되었습니다.');
            router.push('/');
        } else {
            setError(data.message);
        };
    }

    const cancelBtnHandler = () => {
        router.back();
    }

    return (
        <div className={classes.passwordFind_box}>
            <h3>비밀번호 찾기</h3>
            {!find && <form action="/" method="POST" className={classes.passwordFind_form} onSubmit={submitHandler}>
                <div className={classes.loginForm_contentsBox}>
                    <label htmlFor="user-email">이메일</label>
                    <input type="email" id="user-email" name="userEmail" onChange={emailChangeHandler} value={email} />
                </div>
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
                    <button type="submit" id={classes.passwordFind_submitBtn} disabled={!isFormSetted}>찾기</button>
                    <button type="button" onClick={cancelBtnHandler}>취소</button>
                </div>
            </form>}
            {find && 
            <div className={classes.passwordFind_findBox}>
                <form action="/" method="POST" className={classes.passwordFind_Find_form} onSubmit={passwordChangeHandler}>
                    <div className={classes.loginForm_contentsBox_passwordFind}>
                        <label htmlFor="new-password">새 비밀번호</label>
                        <input type="password" id="new-password" name="newPassword" min="8" placeholder=" 8자 이상 입력" onChange={newPasswordChangeHandler} value={newPassword} /> 
                    </div>
                    <div className={classes.loginForm_contentsBox_passwordFind}>
                        <label htmlFor="new-password2">새 비밀번호 확인</label>
                        <input type="password" id="new-password2" name="newPassword2" min="8" placeholder=" 위 비밀번호와 동일하게 입력" onChange={newPassword2ChangeHandler} value={newPassword2} /> 
                    </div>
                    <p className={classes.login_errorMsg}>{error}</p>
                    <div className={classes.loginForm_btn}>
                        <button type="submit" id={classes.passwordFind_findBox_submitBtn} disabled={!isPasswordSetted}>변경하기</button>
                    </div>
                </form>
            </div>
            }
        </div>
    );
}

export default PasswordFind;