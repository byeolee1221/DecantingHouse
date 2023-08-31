import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { ObjectId } from "mongodb";

const commentSendDate = async (req, res) => {
    const db = (await connectDB).db('DecantingHouse');
    let session = await getServerSession(req, res, authOptions);
    // console.log(req.body);

    let data = {
        commentUserEmail: req.body.commentUserEmail,
        commentUser: req.body.commentUser,
        comment: req.body.comment,
        parent: req.body.parent
    };
    
    try {
        if (req.method === 'POST') {
            if (session.user.email === data.commentUserEmail) {
                let sendData = await db.collection('comment').insertOne(data);

                // console.log(sendData);
                return res.status(200).json({ status: 200 });
            } else {
                return res.status(500).json({ status: 500, message: '올바른 접근이 아닙니다.' });
            }
        } 

        if (req.method === 'GET') {
            // console.log(req.query);
            let storedComment = await db.collection('comment').find({ parent: req.query.id }).toArray();
            // console.log(storedComment) 
            return res.status(200).json(storedComment);
        } 

        if (req.method === 'DELETE') {
            if (session.user.email === req.body.commentUserEmail) {
                // console.log(req.body);
                let findData = await db.collection('comment').findOne({ _id: new ObjectId(req.body.commentId)});
                // console.log(findData);
                let deleteData = await db.collection('comment').deleteOne({ _id: new ObjectId(req.body.commentId) });
                return res.status(200).json({ status: 200 });
            } else {
                return res.status(500).json({ status: 500, message: '본인만 댓글을 삭제할 수 있습니다.' });
            }
        }
    } catch (error) {
        return res.status(500).redirect(302, '/error');
    }
}

export default commentSendDate;