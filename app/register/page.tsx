'use client'

import { useRouter } from "next/navigation";
import classes from "./register.module.css";

const RegisterPage = () => {
    const router = useRouter();

    const caneclHandler = () => {
        router.back();
    }

    // 1. 사용자가 모든 칸을 입력해야 하므로 각 input을 state로 관리해야 함. useState 또는 커스텀훅 사용
    // 2. 모든 칸을 입력하면 회원가입 버튼이 활성화됨.
    // 3. 제출하면 서버에서 각 요소에 대한 인증을 거치며, 인증 시 잘못 입력됐으면 값을 DB로 보내지 않고 이 컴포넌트로 인증이 안됐음을 useEffect로 받아 해당 요소의 input 아래에 빨간 경고글 띄우기

    return (
        <div className={classes.register_container}>
            <div className={classes.register_wrapper}>
                <div className={classes.register_title}>
                    <h2>디캔팅하우스 회원가입</h2>
                    <p>Welcome to Decanting House</p>
                </div>
                <form action="/api/register" method="POST" className={classes.register_form}>
                    <div className={classes.form_contenstBox}>
                        <label htmlFor="user-name">이름</label>
                        <div className={classes.form_item}>
                            <input type="text" id="user-name" name="userName" />
                            <p className={classes.register_error}>이름을 확인해주세요.</p>
                        </div>
                    </div>
                    <div className={classes.form_contenstBox}>
                        <label htmlFor="user-nickname">닉네임</label>
                        <div className={classes.form_item}>
                            <input type="text" id="user-nickname" name="userNickName" />
                            <p className={classes.register_error}>닉네임을 확인해주세요.</p>
                        </div>
                    </div>
                    <div className={classes.form_contenstBox}>
                        <label htmlFor="user-password">비밀번호</label>
                        <div className={classes.form_item}>
                            <input type="password" id="user-password" name="userPassword" min="8" placeholder=" 8자 이상 입력" />
                            <p className={classes.register_error}>비밀번호를 확인해주세요.</p>
                        </div>
                    </div>
                    <div className={classes.form_contenstBox}>
                        <label htmlFor="user-password2">비밀번호 확인</label>
                        <div className={classes.form_item}>
                            <input type="password" id="user-password2" name="userPassword2" min="8" placeholder=" 위 비밀번호와 동일하게 입력" />
                            <p className={classes.register_error}>비밀번호가 서로 맞지 않습니다.</p>
                        </div>
                    </div>
                    <div className={classes.form_contenstBox}>
                        <label htmlFor="user-email">이메일</label>
                        <div className={classes.form_item}>
                            <input type="email" id="user-email" name="userEmail" />
                            <p className={classes.register_error}>이메일을 확인해주세요.</p>
                        </div>
                    </div>
                    <div className={classes.registerForm_btn}>
                        <button type="submit" id={classes.register_submitBtn} disabled>회원가입</button>
                        <button type="button" onClick={caneclHandler}>취소</button>
                    </div>
                </form>
            </div>
        </div>
    );   
}

export default RegisterPage;