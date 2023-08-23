import ChileBoard from "./board";
import classes from "./chile.module.css";

const ChilePage = () => {
    return (
        <div className={classes.board_chile_container}>
            <div className={classes.board_wrapper}>
                <div className={classes.board_titleBox}>
                    <div className={classes.title_left}>
                        <h1 className={classes.board_title}>CHILE</h1>
                    </div>
                    <div className={classes.board_titleBox_right}>
                        <img src="/chile-wine.jpg" alt="칠레 포도밭" id={classes.title_rightTop} />
                        <img src="/chile.jpg" alt="칠레" id={classes.title_rightBottom} />
                    </div>
                </div>
                <ChileBoard />
            </div>
        </div>
    );
}

export default ChilePage;