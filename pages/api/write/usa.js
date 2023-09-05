import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "@/util/database";

const USAWriteHandler = async (req, res) => {
    let session = await getServerSession(req, res, authOptions);

    const db = (await connectDB).db("DecantingHouse");
    // console.log(req.body);

    try {
        if (req.method === "POST") {
            let result = await db.collection("Forum").insertOne(req.body);
            // console.log(result);

            return res.status(200).redirect(302, "/board/usa");
        }
    } catch (error) {
        return res.status(500).redirect(302, "/error");
    }
};

export default USAWriteHandler;
