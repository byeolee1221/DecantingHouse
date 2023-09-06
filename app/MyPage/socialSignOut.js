'use client'

import { useState } from "react";
import { signOut } from "next-auth/react";
import classes from "./signOut.module.css";

const SocialSignOut = () => {
    const [socialError, setSocialError] = useState('');

    const socialSignOutHandler = async () => {
        // 카카오는 호스팅 받고 테스트 및 완성. 연결 끊기 api를 사용하려면 https를 사용해야하기 때문.

        const response = await fetch('/api/auth/socialSignOut' , {
            method: 'POST',
            headers: { 'content-type' : 'application/json' }
        });

        const data = await response.json();

        if (data.status === 200) {
            alert('그동안 이용해주셔서 감사합니다.');
            signOut();
        } else {
            setSocialError(data.message);
            return;
        };
    }

    return (
        <div className={classes.menuBox_social_signOut}>
                <h3>소셜로그인 연결 해제</h3>
                <p className={classes.social_signOut_description}>소셜로그인 연결 해제를 하시면 탈퇴처리가 자동으로 이루어집니다.</p>
                <p className={classes.signOut_box_errorMsg}>{socialError}</p>
                <button type="button" onClick={socialSignOutHandler}>연결 해제</button>
        </div>
    );
}

export default SocialSignOut;