import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { ObjectId } from "mongodb";

const CommentReport = async (req, res) => {
    const db = (await connectDB).db('DecantingHouse');
    const dbTest = (await connectDB).db('test');
    let session = await getServerSession(req, res, authOptions);

    try {
        if (req.method === 'POST') {
            if (session.user.email === req.body.reportClickUser) {
                let reportAuth = await db.collection('Report').findOne({ reportedPost: req.body.commentId, reportClick: req.body.reportClickUser });

                if (!reportAuth) {
                    let updateComment = await db.collection('comment').updateOne({ _id: new ObjectId(req.body.commentId)}, {$inc: {report: 1}});
                    let updateReport = await db.collection('Report').insertOne({ reportedPost: req.body.commentId, reportClick: req.body.reportClickUser });
                    let findComment = await db.collection('comment').findOne({ _id: new ObjectId(req.body.commentId)});

                    if (findComment.report === 10) {
                        let deleteComment = await db.collection('comment').deleteOne({ _id: req.body.commentId });
                        let deleteReport = await db.collection('Report').deleteOne({ reportedPost: req.body.commentId });
                        let findUser = await db.collection('user').findOne({ email: findComment.commentUserEmail });
                        let findUsers = await dbTest.collection('users').findOne({ email: findComment.commentUserEmail });

                        if (findUser) {
                            let updateUser = await db.collection('user').updateOne({ email: findComment.commentUserEmail }, {$inc: {reportWarning: 1}});
                        } else if (findUsers) {
                            let updateUsers = await dbTest.collection('users').updateOne({ email: findComment.commentUserEmail }, {$inc: {reportWarning: 1}});
                        };
                    }

                    return res.status(200).json({ status: 200 });
                } else {
                    return res.status(500).json({ status: 500, message: '신고는 한번만 할 수 있습니다.' });
                };
            } else {
                return res.status(500).json({ status: 500, message: '올바른 접근이 아닙니다.' });
            }
        }
    } catch (error) {
        return res.status(500).redirect(302, "/error");
    }
}

export default CommentReport;