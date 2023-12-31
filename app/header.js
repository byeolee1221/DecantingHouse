import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import LogInBtn from "./loginBtn";
import LogoutBtn from "./logoutBtn";
import HeaderSearch from "./headerSearch";
import classes from "./header.module.css";

const Header = async () => {
    let session = await getServerSession(authOptions);

    const country = ['france', 'usa', 'italy', 'chile', 'australia', 'germany'];

    return (
        <header className={classes.header_container}>
            <div className={classes.header_wrapper}>
                <nav className={classes.header_first_nav}>
                    <div className={classes.nav_left}>
                        <Link href="/">Decanting House</Link>
                    </div>
                    <div className={classes.nav_right}>
                        {!session ? <LogInBtn /> : ''}
                        {!session ? <Link href="/register">회원가입</Link> : ''}
                        {session ? <p>{session.user.name}님 반갑습니다😊</p> : ''}
                        {session ? <LogoutBtn /> : ''}
                        {session ? <Link href="/MyPage">마이페이지</Link> : ''}
                    </div>
                </nav>
                <nav className={classes.header_second_nav}>    
                    <HeaderSearch />
                    <div className={classes.second_nav_center}>
                        {country.map((data) => {
                            return (
                                <Link href={`/board/${data}`}>{data.toUpperCase()}</Link>
                            );
                        })}
                    </div>
                    <div className={classes.second_nav_right}>
                        <Link href="/board/likedPost">
                            <img src="/favorite.png" alt="좋아요한 게시물" />
                            좋아요한 게시물
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;