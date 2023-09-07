import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "./[...nextauth]";
import { ObjectId } from "mongodb";

const SocialSignOut = async (req, res) => {
    const db = (await connectDB).db('test');
    const mainDb = (await connectDB).db('DecantingHouse');
    let session = await getServerSession(req, res, authOptions);

    try {
        if (req.method === 'POST') {    
            let userAuth = await db.collection('users').findOne({ email: session.user.email });
            let status = '';
            
            if (userAuth) {
                let tokenCheckUser = await db.collection('accounts').findOne({ userId: new ObjectId(userAuth._id) });
                // console.log(tokenCheckUser);
                let tokenCheck = tokenCheckUser.expires_at;
                let tokenDate = new Date(tokenCheck * 1000);
                console.log(tokenDate);
                let currentDate = new Date()
                console.log(currentDate);

                    let getUserInfo = await db.collection('accounts').findOne({ userId: new ObjectId(userAuth._id) });
                    let getAccessToken = '';
                    // console.log(userAuth);

                    if (getUserInfo.provider === 'google') {
                        // console.log(getUserInfo);
                        getAccessToken = getUserInfo.access_token;
                        let googleKey = process.env.GOOGLE_API_KEY;
                        let deleteProvider = ['google.com'];
    
                        console.log(getAccessToken);
                        const signOut = await fetch(` https://oauth2.googleapis.com/revoke?token=${getAccessToken}`, {
                            method: 'POST',
                            headers: { 'content-type' : 'application/x-www-form-urlencoded' }
                        });
    
                        const googleResult = await signOut.json();
                        console.log(googleResult);
    
                        if (googleResult.status === 200) {   
                            console.log(yes)              
                            status = 200;                     
                        } else if (googleResult.error_description === 'Token expired or revoked') {
                            console.log('토큰 만료되어 직접 삭제대상');
                            status = 200;
                        }
                    };
                    
                    if (getUserInfo.provider === 'kakao') {
                        getAccessToken = getUserInfo.access_token;
                        console.log(getAccessToken)
                        const signOut = await fetch('https://kapi.kakao.com/v1/user/unlink', {
                            method: 'POST',
                            headers: { 
                                'content-type' : 'application/x-www-form-urlencoded',
                                'Authorization' : `Bearer ${getAccessToken}` 
                            }
                        });
    
                        const kakaoResult = await signOut.json();
                        console.log(kakaoResult)
    
                        if (kakaoResult.status === 200) {
                            console.log(yes)              
                            status = 200;
                        } else if (kakaoResult.msg === 'this access token does not exist') {
                            console.log('카카오 토큰만료')
                            status = 200;
                        }
                    }
    
                    if (getUserInfo.provider === 'naver') {
                        getAccessToken = getUserInfo.access_token;
                        console.log(getAccessToken)
                        const tokenCheck = await fetch(`https://openapi.naver.com/v1/nid/me?Authorization=${getAccessToken}`, {
                            method: 'GET'
                        });

                        const tokenResult = await tokenCheck.json();
                        console.log(tokenResult);

                        const signOut = await fetch(
                            `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&access_token=${getAccessToken}`, {
                            method: 'GET'
                        });
            
                        const naverResult = await signOut.json();
                        console.log(naverResult);
            
                        if (naverResult.result === 'success') {
                            status = 200;
                        };
                    }
                
                if (status === 200) {
                    let deleteUserInfo = await db.collection('users').deleteOne({ email: userAuth.email });
                    let deleteUserAccounts = await db.collection('accounts').deleteOne({ userId: new ObjectId(getUserInfo.userId) });
                    let deleteUserContents = await mainDb.collection('Forum').deleteMany({ authorEmail: userAuth.email });
                    let deleteUserLike = await mainDb.collection('Like').deleteMany({ likeUser: userAuth.email });
                    let deleteUserComment = await mainDb.collection('comment').deleteMany({ commentUserEmail: userAuth.email });
                                
                    if (deleteUserInfo && deleteUserAccounts && deleteUserContents && deleteUserLike && deleteUserComment) {
                        return res.status(200).json({ status: 200 });                      
                    }
                }
                // console.log(getAccessToken);
            } else {
                return res.status(500).json({ status: 500 });
            }
        } 
    } catch (error) {
        return res.status(500).redirect(302, '/error');
    }
}

export default SocialSignOut;