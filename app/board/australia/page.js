import { connectDB } from "@/util/database";
import AustraliaBoard from "./board";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import classes from "./australia.module.css";

const AustraliaPage = async () => {
    const db = (await connectDB).db('DecantingHouse');
    let session = await getServerSession(authOptions);

    let postArr = await db.collection('Forum').find({country: 'australia'}).toArray();
    let popularPost = await db.collection('Forum').find({country: 'australia', count: {$gt: 0}}).sort({ count: -1 }).limit(4).toArray();
    let sessionUserPost = await db.collection('Forum').find({country: 'australia', authorEmail: session?.user.email}).toArray();

    return (
        <div className={classes.board_australia_container}>
            <div className={classes.board_wrapper}>
                <div className={classes.board_titleBox}>
                    <div className={classes.title_left}>
                        <h1 className={classes.board_title}>AUSTRALIA</h1>
                    </div>
                    <div className={classes.board_titleBox_right}>
                        <img src="/longview-winery.jpg" alt="오스트레일리아 포도밭" id={classes.title_rightTop} />
                        <img src="/australia.jpg" alt="오스트레일리아 포도밭" id={classes.title_rightBottom} />
                    </div>
                </div>
                <AustraliaBoard post={postArr} popular={popularPost} sessionUserPost={sessionUserPost} session={session} />
            </div>
        </div>
    );
}

export default AustraliaPage;