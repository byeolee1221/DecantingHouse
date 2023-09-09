import { connectDB } from "@/util/database";
import ChileBoard from "./board";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import PageBtn from "../pageBtn";

import classes from "./chile.module.css";

const ChilePage = async () => {
    const db = (await connectDB).db('DecantingHouse');
    let session = await getServerSession(authOptions);

    let postArr = await db.collection('Forum').find({country: 'chile'}).toArray();

    postArr = postArr.map((data) => {
        data._id = data._id.toString();
        return data;
    });

    let popularPost = await db.collection('Forum').find({country: 'chile', count: {$gt: 0}}).sort({ count: -1 }).limit(4).toArray();

    popularPost = popularPost.map((data) => {
        data._id = data._id.toString();
        return data;
    });

    let sessionUserPost = await db.collection('Forum').find({country: 'chile', authorEmail: session?.user.email}).toArray();

    sessionUserPost = sessionUserPost.map((data) => {
        data._id = data._id.toString();
        return data;
    });

    const category = ['품종', '페어링', '제품', '맛', '기타'];
    
    let categoryPost = {};

    const categoryMap = await Promise.all(
        category.map(async (data) => {
            const result = await db.collection('Forum').find({ country: 'chile', category: data }).toArray();
            categoryPost[data] = result;
        })
    )

    let category1Post = categoryPost['품종'];
    let category2Post = categoryPost['페어링'];
    let category3Post = categoryPost['제품'];
    let category4Post = categoryPost['맛'];
    let category5Post = categoryPost['기타'];

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
                <ChileBoard 
                    post={postArr} 
                    popular={popularPost} 
                    sessionUserPost={sessionUserPost} 
                    session={session} 
                    category1={category1Post} 
                    category2={category2Post}
                    category3={category3Post}
                    category4={category4Post}
                    category5={category5Post}
                />
                <PageBtn country="chile"/>
            </div>
        </div>
    );
}

export default ChilePage;