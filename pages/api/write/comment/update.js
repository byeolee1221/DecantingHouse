import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { ObjectId } from "mongodb";

const CommentUpdate = async (req, res) => {
    const db = (await connectDB).db('DecantingHouse');
    let session = await getServerSession(req, res, authOptions);
    // console.log(req.body);

    let updateCommentValue = {
        comment: req.body.comment
    };

    try {
        if (req.method === 'POST') {
            if (session.user.email === req.body.commentUserEmail) {
                let updateComment = await db.collection('comment').updateOne({ _id: new ObjectId(req.body.id)}, {$set: updateCommentValue});
                // console.log(updateComment);
                return res.status(200).json({ status: 200 });
            } else {
                return res.status(500).json({ status: 500, message: '본인만 수정할 수 있습니다.' });
            }
        }
    } catch (error) {
        return res.status(500).redirect(302, '/error');
    }
}

export default CommentUpdate;