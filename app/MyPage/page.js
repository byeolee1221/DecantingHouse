'use client'

import { useState } from "react";
import PasswordChange from "./passwordChange";
import SignOut from "./signOut";

import classes from "./MyPage.module.css";

const MyPage = () => {
    const [passwordChange, setPasswordChange] = useState(false);
    const [signOut, setSignOut] = useState(false);

    const passwordChangeBtnHandler = () => {
        setPasswordChange(true);
        setSignOut(false);
    };

    const signOutBtnHandler = () => {
        setSignOut(true);
        setPasswordChange(false);
    };

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
                                <button type="button" onClick={passwordChangeBtnHandler}>비밀번호 변경</button>    
                            </li>
                            <li className={classes.menuBox_item}>
                                <button type="button" onClick={signOutBtnHandler}>회원탈퇴</button>    
                            </li>
                        </ul>
                    </div>
                    <div className={classes.main_right_menuBox}>
                        {!passwordChange && !signOut && <p className={classes.menuBox_initialMsg}>왼쪽 메뉴에서 원하시는 메뉴를 골라주세요.</p>}
                        {passwordChange && <PasswordChange />}
                        {signOut && <SignOut />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyPage;