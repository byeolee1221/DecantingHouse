import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import LikeBtn from "./likeBtn";
import DeleteBtn from "./deleteBtn";
import CommentPage from "./comment";
import Hits from "./hits";
import ReportBtn from "./reportBtn";
 
import classes from "../../detail.module.css";

const boardDetail = async (props) => {
    const db = (await connectDB).db('DecantingHouse');
    let checkPost = await db.collection('Forum').findOne({ _id: new ObjectId(props.params.id)});
    let session = await getServerSession(authOptions);
    
    let isPossibleEdit = false;
    let isAdmin = false;

    if (checkPost.authorEmail === session?.user.email || session?.user.email === 'decantinghouse.official@gmail.com') {
        isPossibleEdit = true;
    };

    if (session?.user.email === 'decantinghouse.official@gmail.com') {
        isAdmin = true;
    }

    // console.log(session);
    // console.log(checkPost);

    return (
        <div className={classes.detail_container}>
            <div className={classes.detail_wrapper}>
                <div className={classes.detail_titleBox}>
                    <p>카테고리: {checkPost.category}</p>
                    <h1>{checkPost.userTitle}</h1>
                    <div className={classes.title_inner}>
                        <div className={classes.title_inner_left}>
                            <p>{checkPost.uploadDate}</p>
                            <p>{checkPost.country.toUpperCase()}</p>
                            <p>게시자: {checkPost.author}</p>
                        </div>
                        <div className={classes.title_inner_right}>
                            <Hits checkPost={checkPost} />
                        </div>
                    </div>
                </div>
                <div className={classes.detail_contentsBox}>
                    <p>{checkPost.userContents}</p>
                </div>
                <div className={classes.detail_btnBox}>
                    <div className={classes.btnBox_left}>
                        {session?.user.email !== checkPost.authorEmail ? <ReportBtn checkPost={checkPost} session={session} /> : ''}
                    </div>
                    <div className={classes.btnBox_right}>
                        <LikeBtn checkPost={checkPost} session={session} />
                        {isPossibleEdit ? <Link href={`/board/edit/${checkPost._id.toString()}`}>수정하기</Link> : ''}
                        {isPossibleEdit ? <DeleteBtn checkPost={checkPost} session={session} /> : ''}
                    </div>
                </div>
                <CommentPage checkPost={checkPost} session={session} isAdmin={isAdmin} />
            </div>
        </div>
    );
}

export default boardDetail;