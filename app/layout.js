import Header from './header';
import Footer from './footer';

import './globals.css';

export const metadata = {
  title: '디캔팅하우스 | Decanting House',
  description: '와인러들을 위한 와인커뮤니티 디캔팅하우스입니다.',
}

export default async function RootLayout({ children }) {

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
