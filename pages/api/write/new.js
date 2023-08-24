import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "@/util/database";


const WriteHandler = async (req, res) => {
    let session = await getServerSession(req, res, authOptions);
    // console.log(req.body);

    const db = (await connectDB).db('DecantingHouse');

    try {
        if (req.method === 'POST') {
            let result = await db.collection('NewPost').insertOne(req.body);
            console.log(result);
            
            return res.status(200).json('등록 완료');
        }
    } catch (error) {
        return res.status(500).json('서버에 문제가 있어 등록되지 않았습니다.');
    }
}

export default WriteHandler;