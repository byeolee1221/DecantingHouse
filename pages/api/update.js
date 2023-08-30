import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

const updatePost = async (req, res) => {
    const db = (await connectDB).db('DecantingHouse');
    let session = await getServerSession(req, res, authOptions);

    let updateValue = {
        author: req.body.author,
        category: req.body.category,
        userTitle: req.body.userTitle,
        userContents: req.body.userContents,
        userFile: req.body.userFile
    };

    // console.log(req.body);
    try {
        if (req.method === 'POST') {
            let authorAuth = await db.collection('Forum').findOne({ _id: new ObjectId(req.body.authorId) });
            // console.log(authorAuth);
            
            if (authorAuth.authorEmail === req.body.authorEmail || session.user.role === 'admin') {
                let updatePost = await db.collection('Forum').updateOne({ _id: new ObjectId(req.body.authorId)}, {$set: updateValue});
                // console.log(updatePost);
                return res.status(200).redirect(302, `/board/${req.body.country}`);
            } 
        }
    } catch (error) {
        return res.status(500).redirect(302, "/error");
    }
}

export default updatePost;