import { connectDB } from "@/util/database";
import ChileBoard from "./board";
import classes from "./chile.module.css";

const ChilePage = async () => {
    const db = (await connectDB).db('DecantingHouse');
    let postArr = await db.collection('Forum').find({country: 'Chile'}).toArray();

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
                <ChileBoard post={postArr} />
            </div>
        </div>
    );
}

export default ChilePage;