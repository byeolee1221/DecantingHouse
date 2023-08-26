import { connectDB } from "@/util/database";
import ItalyBoard from "./board";
import classes from "./italy.module.css";

const ItalyPage = async () => {
    const db = (await connectDB).db('DecantingHouse');
    let postArr = await db.collection('ITALY').find().toArray();

    return (
        <div className={classes.board_italy_container}>
            <div className={classes.board_wrapper}>
                <div className={classes.board_titleBox}>
                    <div className={classes.title_left}>
                        <h1 className={classes.board_title}>ITALY</h1>
                    </div>
                    <div className={classes.board_titleBox_right}>
                        <img src="/italy-evening.jpg" alt="이탈리아 포도밭" id={classes.title_rightTop} />
                        <img src="/italy-vineyard.jpg" alt="이탈리아 포도밭" id={classes.title_rightBottom} />
                    </div>
                </div>
                <ItalyBoard post={postArr} />
            </div>
        </div>
    );
}

export default ItalyPage;