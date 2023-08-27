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
                    email: { label: "email", type: "text" },
                    password: { label: "password", type: "password" },
                },
            async authorize(credentials) {
                
                let db = (await connectDB).db("DecantingHouse");
                let user = await db.collection("user").findOne({ userEmail: credentials.email });

                if (!user) {
                    console.log("해당 이메일은 없습니다.");
                    return null;
                }

                const pwcheck = await bcrypt.compare(
                    credentials.password,
                    user.userPassword
                );

                if (!pwcheck) {
                    console.log("비밀번호가 틀렸습니다.");
                    return null;
                }

                return user;
            },
        }),
    ],

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