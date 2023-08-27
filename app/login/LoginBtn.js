'use client'

import classes from "./login.module.css";
import { signIn, signOut } from 'next-auth/react';

export default function LoginBtn(props) {
    return (
        <div className={classes.loginBox_item}>
            <button type="button" onClick={() => signIn(props.siteName)}>
                <img src={props.siteLogo} alt={props.btnName} />
            </button>
            <p>{props.btnName}</p>
        </div>
    )
}