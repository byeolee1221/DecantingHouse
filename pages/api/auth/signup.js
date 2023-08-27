import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(요청, 응답) {
  if (요청.method === "POST") {
    const hash = await bcrypt.hash(요청.body.userPassword, 10);
    요청.body.userPassword = hash;

    let db = (await connectDB).db('DecantingHouse');
    await db.collection('user').insertOne(요청.body);
    응답.status(200).json('성공');
  }
}; 