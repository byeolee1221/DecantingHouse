import { connectDB } from "@/util/database";

const SearchPost = async (req, res) => {
    const db = (await connectDB).db('DecantingHouse');
    await db.collection('Forum').createIndex({ userTitle: 'text', userContents: 'text' });

    try {
        if (req.method === 'GET') {
            // console.log(req.query);
            let searchPost = await db.collection('Forum').find({
                $text: {
                    $search: req.query.search,
                    $caseSensitive: false,
                    $diacriticSensitive: false
                }
            }).toArray();

            // console.log(searchPost);
            return res.status(200).json({ status: 200, searchPost });
        } 

    } catch (error) {
        return res.status(500).redirect(302, '/error');
    }
}

export default SearchPost;