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
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            // allowDangerousEmailAccountLinking: true
        }),
        KakaoProvider({
            clientId: process.env.AUTH_KAKAO_ID,
            clientSecret: process.env.AUTH_KAKAO_SECRET,
            // allowDangerousEmailAccountLinking: true
        }),
        NaverProvider({
            clientId: process.env.AUTH_NAVER_ID,
            clientSecret: process.env.AUTH_NAVER_SECRET,
            // allowDangerousEmailAccountLinking: true
        }),

        CredentialsProvider({
            name: "credentials",
            credentials: {
              email: { type: "text" },
              password: { type: "password" },
            },

            async authorize(credentials) {
                let db = (await connectDB).db("DecantingHouse");
                let dbSocial = (await connectDB).db('test')
                let user = await db.collection("user").findOne({ email: credentials.email });
                let userSocial = await db.collection("users").findOne({ email: credentials.email });
                // console.log(credentials);
                // console.log(user);

                if (!user) {
                    return null;
                }

                const pwcheck = await bcrypt.compare(
                    credentials.password,
                    user.password1
                );

                if (!pwcheck) {
                    return null;
                }

                return user;
            },
        }),
    ],

    pages: {
        signIn: "/signIn",
        error: "/signIn"
    },

    session: {
        strategy: "jwt",
        maxAge: 1 * 60 * 60,
        rollingSession: true
    },

    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.user = {};
                token.user.name = user.name;
                token.user.realName = user.realName;
                token.user.email = user.email;
                token.user.role = user.role;
                token.user.reportWarning = user.reportWarning;
            };
            return token;
        },
      
        session: async ({ session, token }) => {
            session.user = token.user;
            return session;
        },

        async redirect({url, baseUrl}) {
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            else if (new URL(url).origin === baseUrl) return 'https://decanting-house.vercel.app/';
            return baseUrl;
        }
    },

    secret: process.env.NEXTAUTH_SECRET,
    adapter: MongoDBAdapter(connectDB)
};

export default NextAuth(authOptions); 