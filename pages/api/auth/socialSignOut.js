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
                // let tokenCheckUser = await db.collection('accounts').findOne({ userId: new ObjectId(userAuth._id) });
                // // console.log(tokenCheckUser);
                // let tokenCheck = tokenCheckUser.expires_at;
                // let tokenDate = new Date(tokenCheck * 1000);
                // // console.log(tokenDate);
                // let currentDate = new Date()
                // console.log(currentDate);

                    let getUserInfo = await db.collection('accounts').findOne({ userId: new ObjectId(userAuth._id) });
                    let getAccessToken = '';
                    // console.log(userAuth);

                    if (getUserInfo.provider === 'google') {
                        // console.log(getUserInfo);
                        let accessToken = getUserInfo.access_token;
                        let googleKey = process.env.GOOGLE_API_KEY;
                        let deleteProvider = ['google.com'];
    
                        // console.log(idToken);
                        const signOut = await fetch(`https://accounts.google.com/o/oauth2/revoke?token=${accessToken}`, {
                            method: 'GET',
                        });
    
                        const googleResult = await signOut.json();
                        console.log(googleResult);
    
                        if (googleResult.status === 200) {   
                            console.log(yes)              
                            status = 200;
                            return;                        
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
                            return; 
                        } else if (kakaoResult.msg === 'this access token does not exist') {
                            status = 200;
                            return;
                        }
                    }
    
                    if (getUserInfo.provider === 'naver') {
                        console.log('naver')
                        const signOut = await fetch(
                            `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&access_token=${getAccessToken}`, {
                            method: 'GET'
                        });
            
                        const naverResult = await signOut.json();
            
                        if (naverResult.result === 'success') {
                            return res.status(200).json({ status: 200 });
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