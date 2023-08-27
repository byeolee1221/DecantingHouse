import { connectDB } from "@/util/database";
import USABoard from "./board";
import classes from "./usa.module.css";

const UsaPage = async () => {
    const db = (await connectDB).db('DecantingHouse');
    let postArr = await db.collection('Forum').find({country: 'USA'}).toArray();

    return (
        <div className={classes.board_usa_container}>
            <div className={classes.board_wrapper}>
                <div className={classes.board_titleBox}>
                    <div className={classes.title_left}>
                        <h1 className={classes.board_title}>U.S.A</h1>
                    </div>
                    <div className={classes.board_titleBox_right}>
                        <img src="/napa.jpg" alt="미국 포도밭" id={classes.title_rightTop} />
                        <img src="/usa-winery.jpg" alt="미국 나파밸리" id={classes.title_rightBottom} />
                    </div>
                </div>
                <USABoard post={postArr} />
            </div>
        </div>
    );
}

export default UsaPage;