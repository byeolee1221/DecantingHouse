import GermanyBoard from "./board";
import classes from "./germany.module.css";

const GermanyPage = () => {
    return (
        <div className={classes.board_germany_container}>
            <div className={classes.board_wrapper}>
                <div className={classes.board_titleBox}>
                    <div className={classes.title_left}>
                        <h1 className={classes.board_title}>GERMANY</h1>
                    </div>
                    <div className={classes.board_titleBox_right}>
                        <img src="/germany-vineyards.jpg" alt="독일 포도밭" id={classes.title_rightTop} />
                        <img src="/wood-germany.jpg" alt="독일 와인병" id={classes.title_rightBottom} />
                    </div>
                </div>
                <GermanyBoard />
            </div>
        </div>
    );
}

export default GermanyPage;