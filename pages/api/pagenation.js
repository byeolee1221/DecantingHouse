import { connectDB } from "@/util/database";

const Pagenation = async (req, res) => {
    const db = (await connectDB).db('DecantingHouse');

    try {
        if (req.method === 'GET') {
            // console.log(req.query);
            let findPost = await db.collection('Forum').find({country: req.query.country}).sort({ _id: -1}).skip(req.query.page * 20).limit(20).toArray();
            // console.log(findPost);
            return res.status(200).json({ status: 200, findPost });
        }
    } catch (error) {
        return res.status(500).redirect(302, '/error');
    }
}

export default Pagenation;