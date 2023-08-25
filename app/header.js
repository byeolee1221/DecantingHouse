import Link from "next/link";
import classes from "./header.module.css";

const Header = () => {
    return (
        <header className={classes.header_container}>
            <div className={classes.header_wrapper}>
                <nav className={classes.header_first_nav}>
                    <div className={classes.nav_left}>
                        <Link href="/">Decanting House</Link>
                    </div>
                    <div className={classes.nav_right}>
                        <Link href="/login">로그인</Link>
                        <Link href="/register">회원가입</Link>
                    </div>
                </nav>
                <nav className={classes.header_second_nav}>    
                    <div className={classes.second_nav_left}>
                        <img src="/search.png" alt="검색" />
                        <input type="text" id="user_search" name="search" />
                    </div>
                    <div className={classes.second_nav_center}>
                        <Link href="/board/france">France</Link>
                        <Link href="/board/usa">U.S.A</Link>
                        <Link href="/board/italy">Italy</Link>
                        <Link href="/board/chile">Chile</Link>
                        <Link href="/board/australia">Australia</Link>
                        <Link href="/board/germany">Germany</Link>
                    </div>
                    <div className={classes.second_nav_right}>
                        <button type="button">
                            <img src="/favorite.png" alt="좋아요한 게시물" />
                            좋아요한 게시물
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;