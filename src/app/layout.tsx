import './globals.css'
export const metadata = { title: 'Let Them Play Canada', description: 'TRP with conditions + transparency.' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>)
}
