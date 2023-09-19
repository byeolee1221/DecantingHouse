import React from "react";
import Link from "next/link";

import classes from "./footer.module.css";

const Footer = () => {
    return (
        <div className={classes.footer_container}>
            <div className={classes.footer_wrapper}>
                <div className={classes.footer_contents}>
                    <div className={classes.footer_contents_left}>
                        <h1>Decanting House</h1>
                    </div>
                    <div className={classes.footer_contents_right}>
                        <h2>디캔팅하우스</h2>
                        <p>© Decanting House. All rights reserved.</p>
                        <p>The copyright of the photos included in the development process<br /> of this site belongs to each publisher of Pixabay's photos.</p>
                        <p>문의: decantinghouse.official@gmail.com</p>
                        <div className={classes.contents_right_link}>
                            <Link href="/siteTerms">사이트 이용약관</Link>
                            <Link href="/policy">개인정보처리방침</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Footer);