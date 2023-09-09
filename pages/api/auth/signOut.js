import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "./[...nextauth]";
import bcrypt from "bcrypt";

const SignOutAuth = async (req, res) => {
    const db = (await connectDB).db('DecantingHouse');
    let session = await getServerSession(req, res, authOptions);

    try {
        if (req.method === 'POST') {
            // console.log(req.body);
            let userAuth = await db.collection('user').findOne({ email: req.body.email }); 

            let passwordAuth = await bcrypt.compare(
                req.body.password,
                userAuth.password1
            );

            if (session.user.email === req.body.email && passwordAuth) {
                // console.log(req.body);
                let deleteUserInfo = await db.collection('user').deleteOne({ email: req.body.email });
                let deleteUserContents = await db.collection('Forum').deleteMany({ authorEmail: req.body.email });
                let deleteUserLike = await db.collection('Like').deleteMany({ likeUser: req.body.email });
                let deleteUserComment = await db.collection('comment').deleteMany({ commentUserEmail: req.body.email });
                // console.log(deleteUserInfo);
                return res.status(200).json({ status: 200 });
            } else {
                return res.status(500).json({ status: 500, message: '이메일이나 비밀번호를 다시 확인해주세요.' });
            }
        }

        if (req.method === 'DELETE') {
            let deleteUserInfo = await db.collection('user').deleteOne({ email: req.body.email });
            let deleteUserContents = await db.collection('Forum').deleteMany({ authorEmail: req.body.email });
            let deleteUserLike = await db.collection('Like').deleteMany({ likeUser: req.body.email });
            let deleteUserComment = await db.collection('comment').deleteMany({ commentUserEmail: req.body.email });
            // console.log(deleteUserInfo);
            return res.status(200).json({ status: 200 });
        }
        
    } catch (error) {
        return res.status(500).redirect(302, '/error');
    }
}

export default SignOutAuth;