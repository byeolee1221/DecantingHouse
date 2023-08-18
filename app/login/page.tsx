import classes from "./login.module.css";

const LoginPage = () => {
    return (
        <div className={classes.login_container}>
            <div className={classes.login_wrapper}>
                <div className={classes.login_title}>
                    <h2>로그인</h2>
                </div>
                <div className={classes.third_loginBox}>
                    <div className={classes.loginBox_item}>
                        <button type="button">
                            <img src="/g-logo.png" alt="구글 로그인" />
                        </button>
                        <p>Google 로그인</p>
                    </div>
                    <div className={classes.loginBox_item}>
                        <button type="button">
                            <img src="/kakao_login_large.png" alt="카카오 로그인" />
                        </button>
                    </div>
                    <div className={classes.loginBox_item}>
                        <button type="button">
                            <img src="/naver.png" alt="네이버 로그인" />
                        </button>
                        <p>네이버 로그인</p>
                    </div>
                </div>
                <div className={classes.Oauth_loginBox}>
                    <h2>또는</h2>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;