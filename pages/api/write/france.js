import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "@/util/database";

const FranceWriteHandler = async (req, res) => {
    let session = await getServerSession(req, res, authOptions);

    const db = (await connectDB).db("DecantingHouse");
    // console.log(req.body);

    // 사용자에게서 이메일을 받지 말고 api 내에서 세션정보 중 이메일 받아서 db에 저장하는 것으로 바꾸기

    try {
        if (req.method === "POST") {
            let result = await db.collection("Forum").insertOne(req.body);
            // console.log(result);

            return res.status(200).redirect(302, "/board/france");
        }
    } catch (error) {
        return res.status(500).redirect(302, "/error");
    }
};

export default FranceWriteHandler;
