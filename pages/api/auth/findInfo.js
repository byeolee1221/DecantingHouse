import { connectDB } from "@/util/database";

const FindInfo = async (req, res) => {
    const db = (await connectDB).db('DecantingHouse');

    try {
        if (req.method === 'POST') {
            if (req.body.find === 'email') {
                let findUser = await db.collection('user').findOne({ realName: req.body.realName, name: req.body.name });

                if (findUser) {
                    return res.status(200).json({ status: 200, email: findUser.email });
                } else {
                    return res.status(500).json({ status: 500, message: '입력하신 정보가 맞지 않습니다.' });
                };
            };

            if (req.body.find === 'password') {
                let findUser = await db.collection('user').findOne({ email: req.body.email, realName: req.body.realName, name: req.body.name });

                if (findUser) {
                    return res.status(200).json({ status: 200 });
                } else {
                    return res.status(500).json({ status: 500, message: '입력하신 정보가 맞지 않습니다.' });
                }
            };
        };
        
    } catch (error) {
        return res.status(500).redirect(302, '/error');
    }
}

export default FindInfo;