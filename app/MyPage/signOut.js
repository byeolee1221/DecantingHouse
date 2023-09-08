'use Client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";
import classes from "./signOut.module.css";

const SignOut = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        let sendData = {
            email,
            password
        };

        const response = await fetch('/api/auth/signOut', {
            method: 'POST',
            headers: { 'content-type' : 'application/json' },
            body: JSON.stringify(sendData)
        });

        const data = await response.json();

        if (data.status === 200) {
            alert('그동안 이용해주셔서 감사합니다.');
            signOut();
        } else {
            setError(data.message);
        };
    }

    const cancelBtnHandler = () => {
        router.back();
    }

    return (
        <div className={classes.menuBox_signout}>
            <h3>회원탈퇴</h3>
            <p className={classes.signout_description}>정보입력 후 확인을 누르면 바로 탈퇴처리되므로 탈퇴의사를 확인해주시기 바랍니다.</p>
            <p className={classes.signout_description2}>(탈퇴 시 모든 활동내역도 함께 삭제됩니다.)</p>
            <div className={classes.signOut_box}>
                <form action="/" method="POST" className={classes.myPage_signOut_form} onSubmit={submitHandler}>
                    <div className={classes.signOut_form_item}>
                        <label htmlFor="user-email">이메일</label>
                        <input type="email" id="user-email" name="userEmail" onChange={emailChangeHandler} value={email} />
                    </div>
                    <div className={classes.signOut_form_item}>
                        <label htmlFor="user-password">비밀번호</label>
                        <input type="password" id="user-password" name="userPassword" onChange={passwordChangeHandler} value={password} />
                    </div>
                    <p className={classes.signOut_box_errorMsg}>{error}</p>
                    <div className={classes.SignOut_form_btnBox}>
                        <button type="submit">확인</button>
                        <button type="button" onClick={cancelBtnHandler}>취소</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignOut;