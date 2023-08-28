'use client'

import classes from "./header.module.css";

import { signIn } from "next-auth/react";

const LogInBtn = () => {
    return <button className={classes.logIn_btn} onClick={() => {signIn()}}>로그인</button>
}

export default LogInBtn;