import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import CredentialsProvider from "next-auth/providers/credentials";

const EnvVariable = (name) => {
    const value = process.env[name];

    if (!value) {
        throw new Error (`환경변수 ${name}이 없습니다.`);
    };

    return value;
}

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: EnvVariable('AUTH_GOOGLE_ID'),
            clientSecret: EnvVariable('AUTH_GOOGLE_SECRET'),
        }),
        KakaoProvider({
            clientId: EnvVariable('AUTH_KAKAO_ID'),
            clientSecret: EnvVariable('AUTH_KAKAO_SECRET'),
        }),
        NaverProvider({
            clientId: EnvVariable('AUTH_NAVER_ID'),
            clientSecret: EnvVariable('AUTH_NAVER_SECRET'),
        }),

        CredentialsProvider({
            name: "credentials",
            credentials: {
              email: { type: "text" },
              password: { type: "password" },
            },

            async authorize(credentials) {
                if (!credentials) {
                    return null;
                };

                let db = (await connectDB).db("DecantingHouse");
                let userDocument = await db.collection("user").findOne({ email: credentials.email });

                // console.log(credentials);
                // console.log(user);

                if (!userDocument) {
                    return null;
                };

                const pwcheck = await bcrypt.compare(
                    credentials.password,
                    userDocument.password1
                );

                if (!pwcheck) {
                    return null;
                };

                const user = {
                    id: userDocument._id.toString(),
                    name: userDocument.name,
                    realName: userDocument.realName,
                    email: userDocument.email,
                    role: userDocument.role,
                    reportWarning: userDocument.reportWarning
                };

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
        maxAge: 1 * 60 * 60
    },

    callbacks: {
        jwt: async ({ token, user }) => {
            if ('name' in user && 'realName' in user && 'email' in user && 'role' in user && 'reportWarning' in user) {
                token.user = {};
                token.user.name = user.name;
                token.user.realName = user.realName;
                token.user.email = user.email;
                token.user.role = user.role;
                token.user.reportWarning = user.reportWarning;
            };
            return Promise.resolve(token);
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