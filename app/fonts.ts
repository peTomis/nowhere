import { Source_Serif_4 } from 'next/font/google'

/** The site's typeface, shared by the root layout and the global 404. */
export const sourceSerif = Source_Serif_4({
  variable: '--font-source-serif',
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
})
