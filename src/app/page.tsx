import { EmployerForm } from '@/components/forms/EmployerForm'
import { WorkerForm } from '@/components/forms/WorkerForm'
import { AudienceSection } from '@/components/sections/AudienceSection'
import { Faq } from '@/components/sections/Faq'
import { Footer } from '@/components/sections/Footer'
import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { MatchingDemo } from '@/components/sections/MatchingDemo'
import { forCompanies, forWorkers } from '@/content/landing'

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <AudienceSection audience="employer" content={forCompanies} form={<EmployerForm />} />
        <MatchingDemo />
        <AudienceSection audience="worker" content={forWorkers} form={<WorkerForm />} />
        <HowItWorks />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
