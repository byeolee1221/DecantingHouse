import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const middleware = async (request) => {
    const session = await getToken({ req: request });
    // console.log(session);

    if (request.nextUrl.pathname.startsWith('/write')) {
        if (session === null) {
            return NextResponse.redirect('http://localhost:3000/signIn?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F');
        };
    };

    if (request.nextUrl.pathname.startsWith('/board/likedPost')) {
        if (session === null) {
            return NextResponse.redirect('http://localhost:3000/signIn?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F');
        };
    };

    if (request.nextUrl.pathname.startsWith('/mypage')) {
        if (session === null) {
            return NextResponse.redirect('http://localhost:3000/signIn?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F');
        };
    };
}

export default middleware;