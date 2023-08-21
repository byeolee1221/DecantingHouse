import FranceBoard from "./board";
import classes from "./france.module.css";

const FrancePage = () => {
    return (
        <div className={classes.board_france_container}>
            <div className={classes.board_wrapper}>
                <div className={classes.board_titleBox}>
                    <div className={classes.title_left}>
                        <h1 className={classes.board_title}>FRANCE</h1>
                    </div>
                    <div className={classes.board_titleBox_right}>
                        <img src="/france-vineyard.jpg" alt="프랑스 포도밭" id={classes.title_rightTop} />
                        <img src="/france-road.jpg" alt="프랑스 포도밭 도로" id={classes.title_rigthBottom} />
                    </div>
                </div>
                <FranceBoard />
            </div>
        </div>
    );
}

export default FrancePage;