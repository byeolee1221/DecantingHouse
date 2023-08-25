import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "@/util/database";

const USAWriteHandler = async (req, res) => {
    let session = await getServerSession(req, res, authOptions);

    const db = (await connectDB).db("DecantingHouse");
    // console.log(req.body);

    try {
        if (req.method === "POST") {
            let result = await db.collection("USA").insertOne(req.body);
            console.log(result);

            return res.status(200).redirect(302, "/board/usa");
        }
    } catch (error) {
        return res.status(500).json("서버에 문제가 있어 등록되지 않았습니다.");
    }
};

export default USAWriteHandler;
