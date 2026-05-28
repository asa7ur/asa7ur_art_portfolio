import { Cinzel } from 'next/font/google'
import './globals.css'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-cinzel',
})

export const metadata = {
  title: 'ASA7UR',
  description: 'ASA7UR — Garik Asatryan\'s art portfolio. Character illustration and digital art. Shop prints on Etsy.',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={cinzel.className}>
        {children}
      </body>
    </html>
  )
}
