'use client'

import { useRouter } from "next/navigation";
import classes from "./signOutSuccess.module.css";

const SignOutSuccess = () => {
    const router = useRouter();

    const btnHandler = () => {
        router.push('/');
    };

    return (
        <div className={classes.signOut_container}>
            <div className={classes.signOut_wrapper}>
                <h1>그동안 이용해주셔서 감사합니다.</h1>
                <button type="button" onClick={btnHandler}>확인</button>
            </div>
        </div>
    );
}

export default SignOutSuccess;