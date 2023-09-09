import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { ObjectId } from "mongodb";

const ContentsDelete = async (req, res) => {
    const db = (await connectDB).db('DecantingHouse');
    const dbTest = (await connectDB).db('test');
    let session = await getServerSession(req, res, authOptions);
    // console.log(req.body);
    try {
        if (req.method === 'DELETE') {
            if (session.user.email === req.body.authorEmail || session.user.email === 'decantinghouse.official@gmail.com') {
                let deleteContents = await db.collection('Forum').deleteOne({ _id: new ObjectId(req.body.id) });
                let deleteComments = await db.collection('comment').deleteMany({ parent: req.body.id });
                let deleteLike = await db.collection('Like').deleteMany({ parent: req.body.id });
                return res.status(200).json({ status: 200 });
            } else {
                return res.status(500).json({ status: 500 });
            }
        }

        if (req.method === 'POST') {
            if (session.user.email === req.body.reportClickUser) {
                let reportAuth = await db.collection('Report').findOne({ reportedPost: req.body.postId, reportClick: req.body.reportClickUser });

                if (!reportAuth) {
                    let updatePost = await db.collection('Forum').updateOne({ _id: new ObjectId(req.body.postId)}, {$inc: {report: 1}});
                    let findPost = await db.collection('Forum').findOne({ _id: new ObjectId(req.body.postId) });
                    let updateReport = await db.collection('Report').insertOne({ reportedPost: req.body.postId, reportClick: req.body.reportClickUser });
    
                    if (findPost.report === 10) {
                        let deleteContents = await db.collection('Forum').deleteOne({ _id: new ObjectId(req.body.postId) });
                        let deleteComments = await db.collection('comment').deleteMany({ parent: req.body.id });
                        let deleteLike = await db.collection('Like').deleteMany({ parent: req.body.id });
                        let deleteReport = await db.collection('Report').deleteOne({ reportedPost: req.body.postId });
                        let findUser = await db.collection('user').findOne({ email: req.body.reportedUser });
                        let findUsers = await dbTest.collection('users').findOne({ email: req.body.reportedUser });

                        if (findUser) {
                            let updateUser = await db.collection('user').updateOne({ email: req.body.reportedUser }, {$inc: {reportWarning: 1}});
                            let checkWarning = await db.collection('user').findOne({ email: req.body.reportedUser });

                            if (checkWarning.reportWarning === 5) {
                                const deleteRequest = await fetch('/api/signOut', {
                                    method: 'DELETE',
                                    headers: { 'content-type' : 'application/json' },
                                    body: JSON.stringify(checkWarning)
                                });
                            };
                        
                        } else if (findUsers) {
                            let updateUsers = await dbTest.collection('users').updateOne({ email: req.body.reportedUser }, {$inc: {reportWarning: 1}});
                            let checkWarning = await dbTest.collection('users').findOne({ email: req.body.reportedUser });

                            if (checkWarning.reportWarning === 5) {
                                const deleteRequest = await fetch('/api/socialSignOut', {
                                    method: 'DELETE',
                                    headers: { 'content-type' : 'application/json' },
                                    body: JSON.stringify(checkWarning)
                                });
                            };
                        };
                    };
                    return res.status(200).json({ status: 200 });
                } else {
                    return res.status(500).json({ status: 500, message: '신고는 한 번만 할 수 있습니다.' });
                }
            } else {
                return res.status(500).json({ status: 500, message: '올바른 접근이 아닙니다.' });
            }
        }

    } catch (error) {
        return res.status(500).redirect(302, "/error");
    }
}

export default ContentsDelete;