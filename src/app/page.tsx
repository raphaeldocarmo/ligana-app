import { Categories } from '@/components/sections/Categories'
import { Closing } from '@/components/sections/Closing'
import { Difference } from '@/components/sections/Difference'
import { Footer } from '@/components/sections/Footer'
import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Problem } from '@/components/sections/Problem'
import { Signup } from '@/components/sections/Signup'

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Problem />
        <HowItWorks />
        <Difference />
        <Categories />
        <Signup />
        <Closing />
      </main>
      <Footer />
    </>
  )
}
