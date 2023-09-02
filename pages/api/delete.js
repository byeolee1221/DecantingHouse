import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { ObjectId } from "mongodb";

const ContentsDelete = async (req, res) => {
    const db = (await connectDB).db('DecantingHouse');
    let session = await getServerSession(req, res, authOptions);
    // console.log(req.body);

    try {
        if (req.method === 'DELETE') {
            if (session.user.email === req.body.authorEmail) {
                let deleteContents = await db.collection('Forum').deleteOne({ _id: new ObjectId(req.body.id) });
                let deleteComments = await db.collection('comment').deleteOne({ parent: req.body.id });
                let deleteLike = await db.collection('Like').deleteOne({ parent: req.body.id });
                return res.status(200).json({ status: 200 });
            } else {
                return res.status(500).json({ status: 500 });
            }
        }
    } catch (error) {
        return res.status(500).redirect(302, "/error");
    }
}

export default ContentsDelete;