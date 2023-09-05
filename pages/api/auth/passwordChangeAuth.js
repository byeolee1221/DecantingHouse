import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "./[...nextauth]";
import bcrypt from "bcrypt";

const PasswordChangeAuth = async (req, res) => {
    const db = (await connectDB).db('DecantingHouse');
    let session = await getServerSession(req, res, authOptions);

    let updateValue = {
        password1: req.body.newPs,
        password2: req.body.newPs2
    };

    try {
        if (req.method === 'POST') {
            // console.log(req.body);
            let userCheck = await db.collection('user').findOne({ email: session.user.email });

            if (userCheck) {
                let currentPsCheck = await bcrypt.compare(
                    req.body.currentPs,
                    userCheck.password1
                );
                // console.log(currentPsCheck);  
                if (currentPsCheck) {
                    if (req.body.newPs === req.body.newPs2) {
                        let hash = await bcrypt.hash(updateValue.password1, 10);
                        let hash2 = await bcrypt.hash(updateValue.password2, 10);
    
                        updateValue.password1 = hash;
                        updateValue.password2 = hash2;
    
                        let passwordUpdate = await db.collection('user').updateOne({ email: session.user.email }, {$set: updateValue});
                        console.log(passwordUpdate);
                        return res.status(200).json({ status: 200 });
                    } else {
                        return res.status(500).json({ status: 500, message: '새 비밀번호가 서로 맞지 않습니다.' });
                    };
                } else {
                    return res.status(500).json({ status: 500, message: '현재 비밀번호가 다릅니다.' });
                }                
            } else {
                return res.status(500).json({ status: 500, message: '해당 웹사이트에서 변경해주세요.' });
            };
        }
    } catch (error) {
        return res.status(500).redirect(302, '/error');
    };
}

export default PasswordChangeAuth;