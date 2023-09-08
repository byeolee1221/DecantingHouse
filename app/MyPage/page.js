'use client'

import { useState } from "react";
import PasswordChange from "./passwordChange";
import SignOut from "./signOut";
import SocialSignOut from "./socialSignOut";

import classes from "./MyPage.module.css";

const MyPage = () => {

    const [passwordChange, setPasswordChange] = useState(false);
    const [signOut, setSignOut] = useState(false);
    const [social, setSocial] = useState(false);

    const passwordChangeBtnHandler = () => {
        setPasswordChange(true);
        setSignOut(false);
        setSocial(false);
    };

    const signOutBtnHandler = () => {
        setSignOut(true);
        setPasswordChange(false);
        setSocial(false);
    };

    const socialSignOutBtnHandler = () => {
        setSignOut(false);
        setPasswordChange(false);
        setSocial(true);
    }

    return (
        <div className={classes.myPage_container}>
            <div className={classes.myPage_wrapper}>
                <div className={classes.myPage_titleBox}>
                    <h2>마이페이지</h2>
                </div>
                <div className={classes.myPage_main_section}>
                    <div className={classes.main_left_menuBox}>
                        <ul className={classes.menuBox_itemList}>
                            <li className={classes.menuBox_item}>
                                <h3>마이페이지</h3>   
                            </li>
                            <li className={classes.menuBox_item}>
                                <button type="button" onClick={passwordChangeBtnHandler}>비밀번호 변경</button>    
                            </li>
                            <li className={classes.menuBox_item}>
                                <button type="button" onClick={signOutBtnHandler}>회원탈퇴</button>    
                            </li>
                            <li className={classes.menuBox_item}>
                                <button type="button" onClick={socialSignOutBtnHandler}>소셜로그인 연결해제</button>    
                            </li>
                        </ul>
                    </div>
                    <div className={classes.main_right_menuBox}>
                        {!passwordChange && !signOut && !social && <p className={classes.menuBox_initialMsg}>왼쪽 메뉴에서 원하시는 메뉴를 골라주세요.</p>}
                        {passwordChange && <PasswordChange />}
                        {signOut && <SignOut />}
                        {social && <SocialSignOut />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyPage;