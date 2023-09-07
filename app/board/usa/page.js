import { connectDB } from "@/util/database";
import USABoard from "./board";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import classes from "./usa.module.css";

const UsaPage = async () => {
    const db = (await connectDB).db('DecantingHouse');
    let session = await getServerSession(authOptions);

    let postArr = await db.collection('Forum').find({country: 'usa'}).toArray();

    postArr = postArr.map((data) => {
        data._id = data._id.toString();
        return data;
    });

    let popularPost = await db.collection('Forum').find({country: 'usa', count: {$gt: 0}}).sort({ count: -1 }).limit(4).toArray();

    popularPost = popularPost.map((data) => {
        data._id = data._id.toString();
        return data;
    });

    let sessionUserPost = await db.collection('Forum').find({country: 'usa', authorEmail: session?.user.email}).toArray();

    sessionUserPost = sessionUserPost.map((data) => {
        data._id = data._id.toString();
        return data;
    });

    let category1Post = await db.collection('Forum').find({ country: 'usa', category: '품종' }).toArray();
    let category2Post = await db.collection('Forum').find({ country: 'usa', category: '페어링' }).toArray();
    let category3Post = await db.collection('Forum').find({ country: 'usa', category: '제품' }).toArray();
    let category4Post = await db.collection('Forum').find({ country: 'usa', category: '맛' }).toArray();
    let category5Post = await db.collection('Forum').find({ country: 'usa', category: '기타' }).toArray();

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
                <USABoard 
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

export default UsaPage;