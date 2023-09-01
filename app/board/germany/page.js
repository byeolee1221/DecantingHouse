import { connectDB } from "@/util/database";
import GermanyBoard from "./board";
import classes from "./germany.module.css";

const GermanyPage = async () => {
    const db = (await connectDB).db('DecantingHouse');
    let postArr = await db.collection('Forum').find({country: 'germany'}).toArray();
    let popularPost = await db.collection('Forum').find({country: 'germany', count: {$gt: 0}}).sort({ count: -1 }).limit(4).toArray();

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
                <GermanyBoard post={postArr} />
            </div>
        </div>
    );
}

export default GermanyPage;