import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import EditFormPage from "./editForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import classes from "../../../write/write.module.css";

const editBoardContents = async (props) => {
    const db = (await connectDB).db('DecantingHouse');
    let editPost = await db.collection('Forum').findOne({ _id: new ObjectId(props.params.id) });
    let session = await getServerSession(authOptions);
    // console.log(editPost);
    // console.log(session)

    return (
        <div className={classes.board_write_container}>
            <div className={classes.write_wrapper}>
                <div className={classes.write_titleBox}>
                    <h1>게시글 수정하기</h1>
                </div>
                <form action="/api/update" method="POST" className={classes.write_userForm} >
                    <EditFormPage postInfo={editPost} session={session} />
                </form>
            </div>
        </div>
    );
}

export default editBoardContents;