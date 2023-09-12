import Header from './header';
import Footer from './footer';
import { getServerSession } from 'next-auth'
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { connectDB } from '@/util/database';

import './globals.css';

export const metadata = {
  title: '디캔팅하우스 | Decanting House',
  description: '와인러들을 위한 와인커뮤니티 디캔팅하우스입니다.',
  logo: '/mark.png'
}

export default async function RootLayout({ children }) {
  const db = (await connectDB).db('DecantingHouse');
  let session = await getServerSession(authOptions);

  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
