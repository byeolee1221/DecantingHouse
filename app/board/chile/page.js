import { connectDB } from "@/util/database";
import ChileBoard from "./board";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import classes from "./chile.module.css";

const ChilePage = async () => {
    const db = (await connectDB).db('DecantingHouse');
    let session = await getServerSession(authOptions);

    let postArr = await db.collection('Forum').find({country: 'chile'}).toArray();
    let popularPost = await db.collection('Forum').find({country: 'chile', count: {$gt: 0}}).sort({ count: -1 }).limit(4).toArray();
    let sessionUserPost = await db.collection('Forum').find({country: 'chile', authorEmail: session?.user.email}).toArray();

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
                <ChileBoard post={postArr} popular={popularPost} sessionUserPost={sessionUserPost} session={session} />
            </div>
        </div>
    );
}

export default ChilePage;