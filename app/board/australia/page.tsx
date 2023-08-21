import classes from "./australia.module.css";
import AustraliaBoard from "./board";

const AustraliaPage = () => {
    return (
        <div className={classes.board_australia_container}>
            <div className={classes.board_wrapper}>
                <div className={classes.board_titleBox}>
                    <div className={classes.title_left}>
                        <h1 className={classes.board_title}>AUSTRALIA</h1>
                    </div>
                    <div className={classes.board_titleBox_right}>
                        <img src="/longview-winery.jpg" alt="오스트레일리아 포도밭" id={classes.title_rightTop} />
                        <img src="/australia.jpg" alt="오스트레일리아 포도밭" id={classes.title_rigthBottom} />
                    </div>
                </div>
                <AustraliaBoard />
            </div>
        </div>
    );
}

export default AustraliaPage;