import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { ObjectId } from "mongodb";
import LikedBoard from "./likedBoard";

import classes from "./likedPost.module.css";

const LikedPost = async () => {
    const db = (await connectDB).db('DecantingHouse');
    let session = await getServerSession(authOptions);
    let likedPost = await db.collection('Like').find({ likeUser: session.user.email }).toArray();
    let postIds = likedPost.map((data) => data.parent);
    // console.log(postIds);
    let userLikePost = await db.collection('Forum').find({ _id: {$in: postIds.map((id) => new ObjectId(id))} }).toArray();
    // console.log(userLikePost);

    return (
        <div className={classes.LikedPost_container}>
            <div className={classes.LikedPost_wrapper}>
                <div className={classes.LikedPost_titleBox}>
                    <h2>좋아요한 게시물</h2>
                </div>
                <div className={classes.LikedPost_board}>
                    {userLikePost ? <LikedBoard userLikePost={userLikePost} /> : '좋아요한 게시물이 없습니다.'};
                </div>
            </div>
        </div>
    );
}

export default LikedPost;