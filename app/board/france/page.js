import { connectDB } from "@/util/database";
import FranceBoard from "./board";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import classes from "./france.module.css";

const FrancePage = async () => {
    const countries = ['france', 'usa', 'italy', 'chile', 'australia', 'germany'];

    const db = (await connectDB).db('DecantingHouse');
    let session = await getServerSession(authOptions);

    let postArr = await db.collection('Forum').find({country: 'france'}).toArray();

    postArr = postArr.map((data) => {
        data._id = data._id.toString();
        return data;
    });

    let popularPost = await db.collection('Forum').find({country: 'france', count: {$gt: 0}}).sort({ count: -1 }).limit(4).toArray();

    popularPost = popularPost.map((data) => {
        data._id = data._id.toString();
        return data;
    });

    let sessionUserPost = await db.collection('Forum').find({country: 'france', authorEmail: session?.user.email}).toArray();

    sessionUserPost = sessionUserPost.map((data) => {
        data._id = data._id.toString();
        return data;
    });

    const category = ['품종', '페어링', '제품', '맛', '기타'];

    let category1Post = await db.collection('Forum').find({ country: 'france', category: '품종' }).toArray();
    let category2Post = await db.collection('Forum').find({ country: 'france', category: '페어링' }).toArray();
    let category3Post = await db.collection('Forum').find({ country: 'france', category: '제품' }).toArray();
    let category4Post = await db.collection('Forum').find({ country: 'france', category: '맛' }).toArray();
    let category5Post = await db.collection('Forum').find({ country: 'france', category: '기타' }).toArray();
    // console.log(sessionUserPost);

    return (
        <div className={classes.board_france_container}>
            <div className={classes.board_wrapper}>
                <div className={classes.board_titleBox}>
                    <div className={classes.title_left}>
                        <h1 className={classes.board_title}>FRANCE</h1>
                    </div>
                    <div className={classes.board_titleBox_right}>
                        <img src="/france-vineyard.jpg" alt="프랑스 포도밭" id={classes.title_rightTop} />
                        <img src="/france-road.jpg" alt="프랑스 포도밭 도로" id={classes.title_rightBottom} />
                    </div>
                </div>
                <FranceBoard 
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
            </div>
        </div>
    );
}

export default FrancePage;