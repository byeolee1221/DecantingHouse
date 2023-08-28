import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID,
            clientSecret: process.env.KAKAO_CLIENT_SECRET,
        }),
        NaverProvider({
            clientId: process.env.NAVER_CLIENT_ID,
            clientSecret: process.env.NAVER_CLIENT_SECRET,
        }),

        CredentialsProvider({
            name: "credentials",
            credentials: {
              email: { type: "text" },
              password: { type: "password" },
            },

            async authorize(credentials, req, res) {
                let db = (await connectDB).db("DecantingHouse");
                let user = await db.collection("user").findOne({ email: credentials.email });
                // console.log(credentials);
                // console.log(user);

                let result = {};

                if (!user) {
                    // return result = { message: '가입된 이메일이 아닙니다.', cause: 'register', status: 500 };
                    return null;
                }

                const pwcheck = await bcrypt.compare(
                    credentials.password,
                    user.password1
                );

                if (!pwcheck) {
                    // return result = { message: '이메일 또는 비밀번호를 다시 확인해주세요.', cause: 'password', status: 500 };
                    return null;
                }

                return user;
            },
        }),
    ],

    pages: {
        signIn: "/signIn",
    },

    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },

    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.user = {};
                token.user.name = user.name;
                token.user.nickName = user.nickName;
                token.user.email = user.email;
                token.user.role = user.role;
            }
            return token;
        },
      
        session: async ({ session, token }) => {
            session.user = token.user;
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
    adapter: MongoDBAdapter(connectDB)
};

export default NextAuth(authOptions); 