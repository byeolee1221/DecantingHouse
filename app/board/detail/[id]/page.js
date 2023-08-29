import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

import classes from "../../detail.module.css";
import Link from "next/link";
 
const boardDetail = async (props) => {
    const db = (await connectDB).db('DecantingHouse');
    let checkPost = await db.collection('Forum').findOne({ _id: new ObjectId(props.params.id) });
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
                        <p>💚 <span>0</span></p>
                    </div>
                    <div className={classes.btnBox_right}>
                        <button type="button">🧡 좋아요</button>
                        <Link href={`/board/edit/${checkPost._id}`}>수정하기</Link>
                        <button type="button">삭제하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default boardDetail;