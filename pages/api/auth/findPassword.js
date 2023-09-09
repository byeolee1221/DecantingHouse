import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

const FindPassword = async (req, res) => {
    const db = (await connectDB).db('DecantingHouse');

    try {
        if (req.method === 'POST') {
            if (req.body.newPassword === req.body.newPassword2) {
                let hash = await bcrypt.hash(req.body.newPassword, 10);
                let hash2 = await bcrypt.hash(req.body.newPassword2, 10);
    
                req.body.newPassword = hash;
                req.body.newPassword2 = hash2;
    
                let updateValue = {
                    password1: req.body.newPassword,
                    password2: req.body.newPassword2
                };
    
                let updateUser = await db.collection('user').updateOne({ email: req.body.email }, {$set: updateValue});
    
                if (updateUser) {
                    return res.status(200).json({ status: 200 });
                };
            } else {
                return res.status(500).json({ status: 500, message: '비밀번호가 서로 다릅니다.' });
            };
        };
    } catch (error) {
        return res.status(500).redirect(302, '/error');
    }
}

export default FindPassword;