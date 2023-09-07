import { connectDB } from "@/util/database";
import FranceBoard from "./board";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import classes from "./france.module.css";

const CountryPage = async () => {
    const db = (await connectDB).db('DecantingHouse');
    let session = await getServerSession(authOptions);

    const countries = ['france', 'usa', 'italy', 'chile', 'australia', 'germany'];

    let countrylist = countries.map((data) => {
        return data;
    })

    let postArr = await Promise.all(
        countries.map((country) => {
            return db.collection('Forum').find({ country: country }).toArray();
        })
    );

    postArr = postArr.map((data) => {
        data._id = data._id.toString();
        return data;
    });

    let popularPost = await Promise.all(
        countries.map((country) => {
            return db.collection('Forum').find({country: country, count: {$gt: 0}}).sort({ count: -1 }).limit(4).toArray();
        })
    );

    popularPost = popularPost.map((data) => {
        data._id = data._id.toString();
        return data;
    });

    let sessionUserPost = await Promise.all(
        countries.map((country) => {
            return db.collection('Forum').find({country: country, authorEmail: session?.user.email}).toArray();
        })
    );

    sessionUserPost = sessionUserPost.map((data) => {
        data._id = data._id.toString();
        return data;
    });

    const category = ['품종', '페어링', '제품', '맛', '기타'];

    let categoryPost = await Promise.all(
        countries.map((country) => {
            category.map((category) => {
                return db.collection('Forum').find({ country: country, category: category }).toArray();
            })
        })
    );

    return (
        <div className={classes.board_france_container}>
            <div className={classes.board_wrapper}>
                <div className={classes.board_titleBox}>
                    <div className={classes.title_left}>
                        <h1 className={classes.board_title}>{countrylist}</h1>
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
                    category={categoryPost}
                />
            </div>
        </div>
    );

}

export default CountryPage;