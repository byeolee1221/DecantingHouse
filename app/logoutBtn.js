'use client'

import classes from "./header.module.css";

import { signOut } from "next-auth/react";

const LogoutBtn = () => {
    return <button className={classes.logout_btn} onClick={() => {signOut()}}>로그아웃</button>
}

export default LogoutBtn;