import './globals.css'
import Header from './header'
import { getServerSession } from 'next-auth/next'
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { connectDB } from '@/util/database';

export const metadata = {
  title: '디캔팅하우스 | Decanting House',
  description: '와인러들을 위한 와인커뮤니티 디캔팅하우스입니다.',
}

export default async function RootLayout({ children }) {
  const db = (await connectDB).db('DecantingHouse');

  let session = await getServerSession(authOptions);

  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
