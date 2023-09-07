import { connectDB } from "@/util/database";
import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";

const Hits = async (req, res) => {
    const db = (await connectDB).db('DecantingHouse');
    let session = await getServerSession(req, res, authOptions);

    try {
        if (req.method === 'POST') {
            // console.log(req.body);
            let countHits = await db.collection('Forum').updateOne({ _id: new ObjectId(req.body.postId)}, {$inc: {hits: 1}});
            // console.log(countHits)
            let findPost = await db.collection('Forum').findOne({ _id: new ObjectId(req.body.postId) });
            // console.log(findPost.hits);

            return res.status(200).json({getHits: findPost.hits, status: 200});
        }
    } catch (error) {
        return res.status(500).redirect(302, '/error');
    }
}

export default Hits;