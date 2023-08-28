import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

const Signup = async (req, res) => {
    const db = (await connectDB).db('DecantingHouse');
    // console.log(req.body);

    try {
        if (req.method === 'POST') { 
            let hash = await bcrypt.hash(req.body.password1, 10);
            let hash2 = await bcrypt.hash(req.body.password2, 10);

            req.body.password1 = hash;
            req.body.password2 = hash2;

            let Auth = await db.collection('user').findOne({ email: req.body.email });

            if (Auth) {
                return res.status(500).json({message: '이미 가입한 회원입니다.', status: 500});
            }

            await db.collection('user').insertOne(req.body);
            return res.status(200).json({message: '가입이 완료되었습니다.', status: 200});
        }
    } catch (error) {
        return res.status(500).redirect(302, '/error');
    }
}

export default Signup;
