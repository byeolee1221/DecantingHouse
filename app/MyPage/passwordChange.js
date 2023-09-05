'use client'

import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { signOut } from "next-auth/react";
import classes from "./passwordChange.module.css";

const PasswordChange = () => {
    const router = useRouter();

    const [currentPs, setCurrentPs] = useState('');
    const [newPs, setNewPs] = useState('');
    const [newPs2, setNewPs2] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
 
    const currentPasswordChangeHandler = (event) => {
        setCurrentPs(event.target.value);
    }

    const newPasswordChangeHandler = (event) => {
        setNewPs(event.target.value);
    }

    const newPassword2ChangeHandler = (event) => {
        setNewPs2(event.target.value);
    }

    const cancelBtnHandler = () => {
        router.back();
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        if (newPs.trim().length < 8 || newPs2.trim().length < 8) {
            setError('새 비밀번호는 8자 이상이어야 합니다.');
            return;
        };

        let sendData = {
            currentPs,
            newPs,
            newPs2
        };

        const response = await fetch('/api/auth/passwordChangeAuth', {
            method: 'POST',
            headers: { 'content-type' : 'application/json' },
            body: JSON.stringify(sendData)
        });

        const data = await response.json();

        if (data.status === 200) {
            alert('비밀번호가 변경되었습니다. 다시 로그인해주세요.');
            signOut();
            router.push('/');
        } else {
            setError(data.message);
            return;
        }
    }

    return (
        <Fragment>
            {success && <p className={classes.passwordChange_successMsg}>{success}</p>}
            {!success && <div className={classes.menuBox_password_change}>
                <h3>비밀번호 변경</h3>
                <p className={classes.password_title_description}>소셜로그인을 하신 분은 해당 웹사이트에서 변경하시기 바랍니다.</p>
                <div className={classes.password_box}>
                    <form action="/" method="POST" className={classes.myPage_password_form} onSubmit={submitHandler}>
                        <div className={classes.password_form_item}>
                            <label htmlFor="current-password">현재 비밀번호</label>
                            <input type="password" id="current-password" name="currentPassword" onChange={currentPasswordChangeHandler} value={currentPs} />
                        </div>
                        <div className={classes.password_form_item}>
                            <label htmlFor="new-password">새 비밀번호</label>
                            <input type="password" id="new-password" name="newPassword" onChange={newPasswordChangeHandler} value={newPs} />
                        </div>
                        <div className={classes.password_form_item}>
                            <label htmlFor="new-password2">새 비밀번호 확인</label>
                            <input type="password" id="new-password2" name="newPassword2" onChange={newPassword2ChangeHandler} value={newPs2} />
                        </div>
                        <p className={classes.password_box_errorMsg}>{error}</p>
                        <div className={classes.password_form_btnBox}>
                            <button type="submit">변경하기</button>
                            <button type="button" onClick={cancelBtnHandler}>취소</button>
                        </div>
                    </form>
                </div>
            </div>}
        </Fragment>
    );
}

export default PasswordChange;