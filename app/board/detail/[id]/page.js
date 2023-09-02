import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import LikeBtn from "./likeBtn";
import DeleteBtn from "./deleteBtn";
import CommentPage from "./comment";

import classes from "../../detail.module.css";

const boardDetail = async (props) => {
    const db = (await connectDB).db('DecantingHouse');
    let checkPost = await db.collection('Forum').findOne({ _id: new ObjectId(props.params.id)});
    let session = await getServerSession(authOptions);
    
    let isPossibleEdit = false;

    if (checkPost.authorEmail === session?.user.email) {
        isPossibleEdit = true;
    };

    // console.log(session);
    // console.log(checkPost);

    return (
        <div className={classes.detail_container}>
            <div className={classes.detail_wrapper}>
                <div className={classes.detail_titleBox}>
                    <p>카테고리: {checkPost.category}</p>
                    <h1>{checkPost.userTitle}</h1>
                    <div className={classes.title_inner}>
                        <p>{checkPost.uploadDate}</p>
                        <p>{checkPost.country.toUpperCase()}</p>
                        <p>게시자: {checkPost.author}</p>
                    </div>
                </div>
                <div className={classes.detail_contentsBox}>
                    <p>{checkPost.userContents}</p>
                </div>
                <div className={classes.detail_btnBox}>
                    <div className={classes.btnBox_left}>
                        
                    </div>
                    <div className={classes.btnBox_right}>
                        <LikeBtn checkPost={checkPost} session={session} />
                        {isPossibleEdit ? <Link href={`/board/edit/${checkPost._id}`}>수정하기</Link> : ''}
                        {isPossibleEdit ? <DeleteBtn checkPost={checkPost} session={session} /> : ''}
                    </div>
                </div>
                <CommentPage checkPost={checkPost} session={session} />
            </div>
        </div>
    );
}

export default boardDetail;