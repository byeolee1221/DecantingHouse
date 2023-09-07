import { connectDB } from "@/util/database";
import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";

const ContentsLike = async (req, res) => {
    const db = (await connectDB).db('DecantingHouse');
    let session = await getServerSession(req, res, authOptions);

    try {
        if (req.method === 'POST') {
            // console.log(req.body);
            if (session.user.email === req.body.likeUser) {
                let auth = await db.collection('Like').findOne({ likeUser: req.body.likeUser, parent: req.body.parent });

                if(!auth) {
                    let sendLike = await db.collection('Like').insertOne(req.body);
                    let sendForum = await db.collection('Forum').updateOne({_id: new ObjectId(req.body.parent)}, {$set: {count: req.body.finalCount}});
                    // console.log(sendLike);
                    return res.status(200).json({ status: 200 });
                } else {
                    return res.status(500).json({ status: 500 });
                }
            } else {
                return res.status(500).json({ status: 500 });
            }
        }

        if (req.method === 'GET') {
            // console.log(req.query);
            let getData = await db.collection('Like').find({ parent: req.query.id }).toArray();
            // console.log(getData); 
            let getCount = getData.reduce((sum, obj) => sum + obj.count, 0);
            // console.log(getCount);
            
            return res.status(200).json(getCount);
        }
    } catch (error) {
        return res.status(500).redirect(302, '/error');
    }
}

export default ContentsLike;