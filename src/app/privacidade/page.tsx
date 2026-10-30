import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { Logo } from '@/components/brand/Logo'
import { Container } from '@/components/ui/Container'
import { siteConfig } from '@/config/site'
import { PRIVACY_POLICY_UPDATED_AT, PRIVACY_POLICY_VERSION, RETENTION_MONTHS } from '@/content/privacy'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Como a Ligana trata os dados de quem demonstra interesse na fase de pré-lançamento.',
  alternates: { canonical: '/privacidade' },
}

/** Mostra o valor configurado ou um aviso bem visível do que falta preencher antes de publicar. */
function Configured({ value, envVar }: { value: string | null; envVar: string }) {
  if (value) return <>{value}</>
  return (
    <mark className="rounded bg-orange-soft px-1 font-bold text-orange-text">[preencher {envVar}]</mark>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-black">{title}</h2>
      <div className="mt-3 space-y-3 text-ink-soft [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-ink">{children}</div>
    </section>
  )
}

export default function PrivacyPage() {
  const { controller, contact } = siteConfig
  const privacyEmail = controller.email ?? contact.email

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-line">
        <Container className="flex h-18 items-center justify-between">
          <Link href="/" aria-label="Ligana — página inicial">
            <Logo />
          </Link>
          <Link href="/" className="font-bold underline underline-offset-4">
            Voltar
          </Link>
        </Container>
      </header>

      <main id="conteudo">
        <Container className="max-w-3xl py-12 sm:py-16">
          <h1 className="text-4xl font-black">Política de Privacidade</h1>
          <p className="mt-3 text-ink-soft">
            Versão {PRIVACY_POLICY_VERSION} · atualizada em {PRIVACY_POLICY_UPDATED_AT}
          </p>
          <p className="mt-6 rounded-2xl bg-green-soft p-5 text-lg">
            <strong>Resumindo:</strong> a Ligana está em pré-lançamento. Pedimos só o necessário para
            entender quem precisa contratar e quem quer trabalhar em Campo Grande e organizar um piloto. Não
            pedimos CPF, documentos ou dados bancários, não vendemos seus dados e você pode pedir para apagá-los
            quando quiser.
          </p>

          <Section title="1. Quem cuida dos seus dados">
            <p>
              O responsável pelo tratamento dos dados (controlador, conforme a Lei Geral de Proteção de Dados —
              LGPD, Lei nº 13.709/2018) é{' '}
              <strong>
                <Configured value={controller.name} envVar="NEXT_PUBLIC_CONTROLLER_NAME" />
              </strong>
              {controller.document && <>, inscrito sob o nº {controller.document}</>}
              {controller.address && <>, com endereço em {controller.address}</>}.
            </p>
            <p>
              Contato para assuntos de privacidade e dados pessoais (encarregado):{' '}
              <strong>
                <Configured value={privacyEmail} envVar="NEXT_PUBLIC_CONTROLLER_EMAIL" />
              </strong>
              .
            </p>
          </Section>

          <Section title="2. Em que fase a Ligana está">
            <p>
              A Ligana ainda <strong>não está funcionando</strong>. Nesta fase de pré-lançamento, não realizamos
              contratações, não intermediamos pagamentos e não garantimos vagas, renda ou profissionais. O
              cadastro serve para demonstrar interesse e, se você quiser, participar de um piloto.
            </p>
          </Section>

          <Section title="3. Quais dados coletamos">
            <p>Pelo formulário, só o que você mesmo informa:</p>
            <ul>
              <li>Nome e WhatsApp;</li>
              <li>Região de Campo Grande e, se quiser, CEP e bairro;</li>
              <li>Nome da empresa ou negócio (opcional, só para quem contrata);</li>
              <li>
                Tipos de trabalho, tipo de contratação, frequência, urgência, disponibilidade, experiência e
                faixa de remuneração (estes dois últimos são opcionais);
              </li>
              <li>Seu interesse no piloto e suas autorizações (com data e versão desta política).</li>
            </ul>
            <p>
              Também guardamos, junto do cadastro, a origem da visita: parâmetros de campanha (UTM) do link
              pelo qual você chegou e o site de origem (apenas o domínio).
            </p>
            <p>
              Se você informar o CEP, ele é consultado no ViaCEP (serviço público de consulta de endereços)
              direto do seu navegador, só para preencher o bairro. Guardamos o CEP, mas não pedimos rua nem
              número.
            </p>
            <p>
              <strong>Não pedimos</strong> CPF, RG, documentos, foto, dados bancários, senha ou qualquer dado
              sensível. Por favor, não escreva esse tipo de informação nos campos livres.
            </p>
          </Section>

          <Section title="4. Para que usamos">
            <ul>
              <li>Entender quantas pessoas e empresas têm interesse, em quais áreas e regiões da cidade;</li>
              <li>No piloto, aproximar pessoas e oportunidades que estejam perto uma da outra (pelo CEP ou bairro);</li>
              <li>Planejar e organizar o piloto da Ligana em Campo Grande;</li>
              <li>
                Falar com você pelo WhatsApp sobre novidades e o piloto, <strong>somente se você autorizar</strong>{' '}
                marcando a caixa específica no formulário.
              </li>
            </ul>
            <p>Os resultados das análises são usados de forma agregada, sem identificar ninguém.</p>
          </Section>

          <Section title="5. Base legal">
            <p>
              Tratamos seus dados com base no seu <strong>consentimento</strong> (art. 7º, I, da LGPD), dado de
              forma separada para (a) o uso das respostas e (b) o contato pelo WhatsApp. Nenhuma caixa vem marcada.
              Você pode retirar o consentimento a qualquer momento pelo contato acima.
            </p>
          </Section>

          <Section title="6. Com quem compartilhamos">
            <p>
              Não vendemos nem alugamos seus dados. Eles ficam guardados em prestadores de serviço de tecnologia
              (hospedagem do site e banco de dados), que atuam apenas segundo as nossas instruções.
            </p>
            <p>
              Podemos usar ferramentas de estatística de visitas (por exemplo, quantas pessoas clicaram em um
              botão). Essas ferramentas <strong>não recebem</strong> seu nome, WhatsApp, bairro ou respostas do
              formulário.
            </p>
          </Section>

          <Section title="7. Como protegemos">
            <ul>
              <li>Conexão criptografada (HTTPS) em todo o site;</li>
              <li>Acesso aos cadastros restrito à equipe responsável, com controle de acesso no banco de dados;</li>
              <li>Coleta mínima: só perguntamos o que é útil nesta fase.</li>
            </ul>
          </Section>

          <Section title="8. Por quanto tempo guardamos">
            <p>
              Guardamos os dados até o fim do piloto ou por até {RETENTION_MONTHS} meses após o cadastro, o que
              acontecer primeiro. Depois disso, eles são apagados ou transformados em números gerais que não
              identificam ninguém. Se você pedir a exclusão antes, apagamos assim que possível.
            </p>
          </Section>

          <Section title="9. Seus direitos">
            <p>A qualquer momento, você pode pedir:</p>
            <ul>
              <li>Confirmação de que tratamos seus dados e acesso a eles;</li>
              <li>Correção de dados incompletos ou errados;</li>
              <li>Exclusão dos dados e retirada do consentimento;</li>
              <li>Informação sobre com quem compartilhamos;</li>
              <li>Portabilidade, nos termos da LGPD.</li>
            </ul>
            <p>
              É só escrever para{' '}
              <strong>
                <Configured value={privacyEmail} envVar="NEXT_PUBLIC_CONTROLLER_EMAIL" />
              </strong>
              . Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).
            </p>
          </Section>

          <Section title="10. Cookies e armazenamento no navegador">
            <p>
              Não usamos cookies de publicidade. Guardamos temporariamente no seu navegador (só durante a visita)
              a origem do link pelo qual você chegou, para registrar junto do cadastro. Se ferramentas de
              estatística estiverem ativas, elas podem usar recursos próprios do navegador para contar visitas.
            </p>
          </Section>

          <Section title="11. Idade">
            <p>O cadastro é destinado a pessoas com 18 anos ou mais.</p>
          </Section>

          <Section title="12. Mudanças nesta política">
            <p>
              Se esta política mudar, publicaremos a nova versão nesta página, com a data de atualização. Cada
              cadastro guarda a versão que estava valendo quando você deu seu consentimento.
            </p>
          </Section>
        </Container>
      </main>
    </div>
  )
}
