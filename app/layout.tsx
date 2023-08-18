import './globals.css'
import type { Metadata } from 'next'
import Header from './header'

export const metadata: Metadata = {
  title: '디캔팅하우스 | Decanting House',
  description: '와인러들을 위한 와인커뮤니티 디캔팅하우스입니다.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
