import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "./[...nextauth]";
import { ObjectId } from "mongodb";

const SocialSignOut = async (req, res) => {
    const db = (await connectDB).db('test');
    const mainDb = (await connectDB).db('DecantingHouse');
    let session = await getServerSession(req, res, authOptions);

    try {
        if (req.method === 'GET') {    
            let userAuth = await db.collection('users').findOne({ email: session.user.email });
            // console.log(userAuth);
            
            if (userAuth) {
                let findAccount = await db.collection('accounts').findOne({ userId: new ObjectId(userAuth._id) });

                let deleteUserContents = await mainDb.collection('Forum').deleteMany({ authorEmail: userAuth.email });
                let deleteUserLike = await mainDb.collection('Like').deleteMany({ likeUser: userAuth.email });
                let deleteUserComment = await mainDb.collection('comment').deleteMany({ commentUserEmail: userAuth.email });
                let deleteUserAccounts = await db.collection('accounts').deleteOne({ userId: new ObjectId(findAccount.userId) });
                let deleteUserInfo = await db.collection('users').deleteOne({ email: userAuth.email });
                                    
                return res.status(200).json({ status: 200 });
            } else {
                return res.status(500).json({ status: 500, message: '오류가 발생하여 아직 탈퇴되지 않았습니다.' });
            };
        };

        if (req.method === 'DELETE') {
            let checkWarning = await db.collection('users').findOne({ email: req.body.email });

            if (checkWarning.reportWarning === 5) {
                let findAccount = await db.collection('account').findOne({ userId: new ObjectId(checkWarning._id) });

                let deleteUserContents = await mainDb.collection('Forum').deleteMany({ authorEmail: userAuth.email });
                let deleteUserLike = await mainDb.collection('Like').deleteMany({ likeUser: userAuth.email });
                let deleteUserComment = await mainDb.collection('comment').deleteMany({ commentUserEmail: userAuth.email });
                let deleteUserAccounts = await db.collection('accounts').deleteOne({ userId: new ObjectId(findAccount.userId) });
                let deleteUserInfo = await db.collection('users').deleteOne({ email: checkWarning.email });
                                
                return res.status(200).json({ status: 200 });                      
            };
        };

    } catch (error) {
        return res.status(500).redirect(302, '/error');
    }
}

export default SocialSignOut;