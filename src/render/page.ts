import {
  audiences,
  benefits,
  faqCategories,
  faqClose,
  faqIntro,
  faqs,
  features,
  howItWorksClose,
  howItWorksIntro,
  modules,
  plansDisclaimer,
  site,
  stats,
  steps,
} from '../content'
import { escapeHtml } from '../lib/dom'
import { renderPlansLoading } from '../lib/plans'

/** Respeita o base do Vite. */
function asset(path: string) {
  const base = import.meta.env.BASE_URL
  return `${base}${path.replace(/^\//, '')}`
}

function renderFeature(
  feature: (typeof features)[number],
  index: number
) {
  const reverse = index % 2 === 1 ? ' feature--reverse' : ''
  const bullets = feature.bullets
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join('')

  return `
    <article class="feature${reverse}" id="${feature.id}" data-reveal>
      <div class="feature__copy">
        <p class="eyebrow">Módulo ${String(index + 1).padStart(2, '0')}</p>
        <h3>${escapeHtml(feature.title)}</h3>
        <p>${escapeHtml(feature.description)}</p>
        <ul class="feature__bullets">${bullets}</ul>
      </div>
      <figure class="feature__media">
        <button
          type="button"
          class="media-zoom"
          data-lightbox-src="${asset(feature.image)}"
          data-lightbox-alt="${escapeHtml(feature.imageAlt)}"
          aria-label="Ampliar imagem: ${escapeHtml(feature.imageAlt)}"
        >
          <img
            src="${asset(feature.image)}"
            alt="${escapeHtml(feature.imageAlt)}"
            loading="lazy"
            decoding="async"
          />
        </button>
      </figure>
    </article>
  `
}

export function renderPage() {
  const year = new Date().getFullYear()

  return `
  <a class="skip-link" href="#conteudo">Ir para o conteúdo</a>

  <header class="topbar" data-topbar>
    <div class="container topbar__inner">
      <a class="brand" href="#inicio" aria-label="${site.name} início">
        <span class="brand__mark" aria-hidden="true"></span>
        <span class="brand__name">${site.name}</span>
      </a>

      <nav class="nav" data-nav aria-label="Principal">
        <a href="#produto">Produto</a>
        <a href="#modulos">Módulos</a>
        <a href="#como-funciona">Como funciona</a>
        <a href="#planos">Planos</a>
        <a href="#faq">FAQ</a>
        <a href="#contato">Contato</a>
        <div class="nav__mobile-ctas">
          <a class="btn btn--ghost" href="#contato">Falar com vendas</a>
          <a class="btn btn--primary" href="#demo">Ver demonstração</a>
        </div>
      </nav>

      <div class="topbar__actions">
        <a class="btn btn--ghost topbar__cta" href="#contato">Falar com vendas</a>
        <a class="btn btn--primary topbar__cta" href="#demo">Ver demonstração</a>
        <button
          class="menu-btn"
          type="button"
          data-menu-btn
          aria-expanded="false"
          aria-controls="menu-principal"
          aria-label="Abrir menu"
        >
          <span></span><span></span>
        </button>
      </div>
    </div>
  </header>

  <main id="conteudo">
    <section class="hero" id="inicio">
      <div class="hero__glow" aria-hidden="true"></div>
      <div class="container hero__grid">
        <div class="hero__copy">
          <p class="brand-hero">${site.name}</p>
          <h1>O sistema que organiza a clínica do agendamento aos indicadores.</h1>
          <p class="lead">
            Plataforma para clínicas: pacientes, agenda, prontuário, financeiro,
            portal do paciente e BI integrado — simples para a recepção e clara
            para a gestão.
          </p>
          <div class="hero__cta">
            <a class="btn btn--primary btn--lg" href="#contato">Quero apresentar na minha clínica</a>
            <a class="btn btn--soft btn--lg" href="#produto">Explorar o produto</a>
          </div>
          <ul class="hero__points">
            <li>Agenda com slots de 30 minutos</li>
            <li>PEP, financeiro e BI com Excel/PDF</li>
            <li>Multi-clínica e portal do paciente</li>
          </ul>
        </div>

        <div class="hero__visual" id="demo">
          <div class="device" data-reveal>
            <div class="device__chrome" aria-hidden="true">
              <span></span><span></span><span></span>
            </div>
            <img
              src="${asset('/screenshots/bi-dashboard.png')}"
              alt="Painel de BI do Sanavita com indicadores e gráficos"
              class="device__screen"
              width="1024"
              height="576"
              decoding="async"
              fetchpriority="high"
            />
          </div>
          <div class="hero__float" data-reveal>
            <img
              src="${asset('/screenshots/consulta-detalhe.png')}"
              alt="Detalhe de consulta no Sanavita"
              width="1024"
              height="306"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="stats" aria-label="Destaques do produto">
      <div class="container stats__grid">
        ${stats
          .map(
            (item) => `
          <article class="stat" data-reveal>
            <strong>${escapeHtml(item.value)}</strong>
            <span>${escapeHtml(item.label)}</span>
          </article>
        `
          )
          .join('')}
      </div>
    </section>

    <section class="section" id="para-quem">
      <div class="container">
        <header class="section__header" data-reveal>
          <p class="eyebrow">Para quem é</p>
          <h2>Feito para quem faz a clínica acontecer.</h2>
        </header>
        <div class="audience">
          ${audiences
            .map(
              (item) => `
            <article class="audience-card" data-reveal>
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.text)}</p>
            </article>
          `
            )
            .join('')}
        </div>
      </div>
    </section>

    <section class="section section--alt" id="produto">
      <div class="container">
        <header class="section__header" data-reveal>
          <p class="eyebrow">Produto em ação</p>
          <h2>Telas reais. Fluxos pensados para o dia a dia.</h2>
          <p>
            Conheça os principais módulos do Sanavita com capturas do sistema
            em uso — da agenda ao atendimento, com BI integrado para a gestão.
          </p>
        </header>
        <div class="features">
          ${features.map(renderFeature).join('')}
        </div>
      </div>
    </section>

    <section class="section" id="modulos">
      <div class="container">
        <header class="section__header" data-reveal>
          <p class="eyebrow">Ecossistema</p>
          <h2>Tudo que a clínica precisa, conectado.</h2>
        </header>
        <div class="modules">
          ${modules
            .map(
              (item) => `
            <article class="module-card" data-reveal>
              ${
                item.fromPlan
                  ? `<p class="module-card__plan">A partir do ${escapeHtml(item.fromPlan)}</p>`
                  : ''
              }
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.description)}</p>
            </article>
          `
            )
            .join('')}
        </div>
      </div>
    </section>

    <section class="section section--alt" id="como-funciona">
      <div class="container">
        <header class="section__header section__header--wide" data-reveal>
          <p class="eyebrow">${escapeHtml(howItWorksIntro.eyebrow)}</p>
          <h2>${escapeHtml(howItWorksIntro.title)}</h2>
          <p>${escapeHtml(howItWorksIntro.lead)}</p>
        </header>

        <div class="journey-nav" data-reveal aria-label="Etapas do fluxo">
          ${steps
            .map(
              (item, index) => `
            <a class="journey-nav__item" href="#passo-${index + 1}">
              <span>${index + 1}</span>
              ${escapeHtml(item.subtitle)}
            </a>
          `
            )
            .join('')}
        </div>

        <ol class="journey">
          ${steps
            .map((item, index) => {
              const reverse = index % 2 === 1 ? ' journey-step--reverse' : ''
              const bullets = item.bullets
                .map((b) => `<li>${escapeHtml(b)}</li>`)
                .join('')
              return `
            <li class="journey-step${reverse}" id="passo-${index + 1}" data-reveal>
              <div class="journey-step__copy">
                <div class="journey-step__meta">
                  <span class="step__num">${index + 1}</span>
                  <span class="journey-step__audience">${escapeHtml(item.audience)}</span>
                </div>
                <p class="journey-step__kicker">${escapeHtml(item.subtitle)}</p>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.text)}</p>
                <ul class="feature__bullets">${bullets}</ul>
                <p class="journey-step__tip">${escapeHtml(item.tip)}</p>
              </div>
              <figure class="journey-step__media">
                <button
                  type="button"
                  class="media-zoom"
                  data-lightbox-src="${asset(item.image)}"
                  data-lightbox-alt="${escapeHtml(item.imageAlt)}"
                  aria-label="Ampliar: ${escapeHtml(item.imageAlt)}"
                >
                  <img
                    src="${asset(item.image)}"
                    alt="${escapeHtml(item.imageAlt)}"
                    loading="lazy"
                    decoding="async"
                    width="1024"
                    height="640"
                  />
                </button>
                <figcaption>${escapeHtml(item.imageAlt)}</figcaption>
              </figure>
            </li>
          `
            })
            .join('')}
        </ol>

        <aside class="journey-close" data-reveal>
          <div>
            <h3>${escapeHtml(howItWorksClose.title)}</h3>
            <p>${escapeHtml(howItWorksClose.text)}</p>
          </div>
          <a class="btn btn--primary btn--lg" href="#contato">
            ${escapeHtml(howItWorksClose.cta)}
          </a>
        </aside>
      </div>
    </section>

    <section class="section" id="beneficios">
      <div class="container benefits">
        <header class="section__header" data-reveal>
          <p class="eyebrow">Por que Sanavita</p>
          <h2>Resultado na operação, não só software bonito.</h2>
        </header>
        <div class="benefits__grid">
          ${benefits
            .map(
              (item) => `
            <article class="benefit-card" data-reveal>
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.text)}</p>
            </article>
          `
            )
            .join('')}
        </div>
        <div class="showcase">
          <figure data-reveal>
            <img
              src="${asset('/screenshots/agendar-consulta.png')}"
              alt="Fluxo de agendamento Sanavita"
              loading="lazy"
            />
            <figcaption>Fluxo de nova consulta — do paciente ao horário livre.</figcaption>
          </figure>
          <figure data-reveal>
            <img
              src="${asset('/screenshots/bi-dashboard.png')}"
              alt="BI integrado Sanavita"
              loading="lazy"
            />
            <figcaption>BI integrado — indicadores e relatórios no mesmo sistema.</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section class="section section--alt" id="planos">
      <div class="container">
        <header class="section__header" data-reveal>
          <p class="eyebrow">Comercial</p>
          <h2>Planos com módulos certos para cada momento da clínica.</h2>
          <p>
            Acesso liberado por pacotes, alinhado ao que a equipe vê no sistema.
            Valores sob proposta após entender volume e suporte.
          </p>
        </header>
        <div class="plans" data-plans data-reveal aria-live="polite">
          ${renderPlansLoading()}
        </div>
        <p class="plans__disclaimer" data-reveal>${escapeHtml(plansDisclaimer)}</p>
      </div>
    </section>

    <section class="section section--alt" id="faq">
      <div class="container faq">
        <header class="section__header section__header--wide" data-reveal>
          <p class="eyebrow">${escapeHtml(faqIntro.eyebrow)}</p>
          <h2>${escapeHtml(faqIntro.title)}</h2>
          <p>${escapeHtml(faqIntro.lead)}</p>
        </header>

        <div class="faq-nav" data-faq-nav data-reveal aria-label="Categorias do FAQ">
          <button type="button" class="faq-nav__item is-active" data-faq-filter="all">
            Todas
          </button>
          ${faqCategories
            .map(
              (category) => `
            <button type="button" class="faq-nav__item" data-faq-filter="${escapeHtml(category)}">
              ${escapeHtml(category)}
            </button>
          `
            )
            .join('')}
        </div>

        <div class="faq__list" data-faq>
          ${faqs
            .map((item, index) => {
              const bullets = item.bullets
                ?.map((b) => `<li>${escapeHtml(b)}</li>`)
                .join('')
              const tip = item.tip
                ? `<p class="faq__tip">${escapeHtml(item.tip)}</p>`
                : ''
              const media =
                item.image && item.imageAlt
                  ? `
              <figure class="faq__media">
                <button
                  type="button"
                  class="media-zoom"
                  data-lightbox-src="${asset(item.image)}"
                  data-lightbox-alt="${escapeHtml(item.imageAlt)}"
                  aria-label="Ampliar: ${escapeHtml(item.imageAlt)}"
                >
                  <img
                    src="${asset(item.image)}"
                    alt="${escapeHtml(item.imageAlt)}"
                    loading="lazy"
                    decoding="async"
                    width="1024"
                    height="640"
                  />
                </button>
                <figcaption>${escapeHtml(item.imageAlt)}</figcaption>
              </figure>`
                  : ''

              return `
            <details
              class="faq__item"
              data-reveal
              data-faq-category="${escapeHtml(item.category)}"
              id="faq-${escapeHtml(item.id)}"
              ${index === 0 ? 'open' : ''}
            >
              <summary>
                <span class="faq__category">${escapeHtml(item.category)}</span>
                <span class="faq__question">${escapeHtml(item.question)}</span>
              </summary>
              <div class="faq__body${media ? ' faq__body--with-media' : ''}">
                <div class="faq__copy">
                  <p>${escapeHtml(item.answer)}</p>
                  ${bullets ? `<ul class="feature__bullets">${bullets}</ul>` : ''}
                  ${tip}
                </div>
                ${media}
              </div>
            </details>
          `
            })
            .join('')}
        </div>

        <aside class="faq-close" data-reveal>
          <div>
            <h3>${escapeHtml(faqClose.title)}</h3>
            <p>${escapeHtml(faqClose.text)}</p>
          </div>
          <a class="btn btn--primary btn--lg" href="#contato">
            ${escapeHtml(faqClose.cta)}
          </a>
        </aside>
      </div>
    </section>

    <section class="cta" id="contato">
      <div class="container cta__panel">
        <div data-reveal>
          <p class="eyebrow eyebrow--light">Próximo passo</p>
          <h2>Leve o Sanavita para a sua clínica.</h2>
          <p>
            Agende uma demonstração e veja como o sistema se encaixa na sua
            operação — recepção, médicos e gestão.
          </p>
          <ul class="cta__contacts">
            <li><a href="mailto:${site.email}">${site.email}</a></li>
            <li><a href="tel:+551140000000">${site.phone}</a></li>
          </ul>
        </div>
        <form class="cta__form" data-contact-form novalidate>
          <div class="form-grid">
            <label>
              Nome *
              <input name="name" type="text" required placeholder="Seu nome" autocomplete="name" />
              <span class="field-error" data-error-for="name"></span>
            </label>
            <label>
              E-mail profissional *
              <input name="email" type="email" required placeholder="voce@clinica.com.br" autocomplete="email" />
              <span class="field-error" data-error-for="email"></span>
            </label>
            <label>
              Clínica / cidade *
              <input name="clinic" type="text" required placeholder="Nome da clínica e cidade" />
              <span class="field-error" data-error-for="clinic"></span>
            </label>
            <label>
              WhatsApp / telefone
              <input name="phone" type="tel" placeholder="(11) 99999-9999" autocomplete="tel" />
              <span class="field-error" data-error-for="phone"></span>
            </label>
            <label>
              Plano de interesse
              <select name="planInterest" data-plan-select>
                <option value="">Ainda não sei</option>
              </select>
            </label>
            <label>
              Tamanho da equipe
              <select name="teamSize">
                <option value="">Selecione</option>
                <option value="1-5">1 a 5 pessoas</option>
                <option value="6-20">6 a 20 pessoas</option>
                <option value="21-50">21 a 50 pessoas</option>
                <option value="50+">Mais de 50</option>
              </select>
            </label>
            <label class="form-grid__full">
              Mensagem
              <textarea name="message" rows="3" placeholder="Conte um pouco sobre sua operação (opcional)" maxlength="800"></textarea>
              <span class="field-error" data-error-for="message"></span>
            </label>
          </div>
          <button class="btn btn--primary btn--lg" type="submit" data-submit>
            Solicitar demonstração
          </button>
          <p class="form-note" data-form-note role="status" aria-live="polite" hidden></p>
        </form>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container footer__grid">
      <div>
        <div class="brand brand--footer">
          <span class="brand__mark" aria-hidden="true"></span>
          <span class="brand__name">${site.name}</span>
        </div>
        <p>${escapeHtml(site.tagline)}</p>
      </div>
      <div>
        <p class="footer__title">Navegação</p>
        <a href="#produto">Produto</a>
        <a href="#planos">Planos</a>
        <a href="#faq">FAQ</a>
        <a href="#contato">Contato</a>
      </div>
      <div>
        <p class="footer__title">Contato</p>
        <a href="mailto:${site.email}">${site.email}</a>
        <a href="tel:+551140000000">${site.phone}</a>
      </div>
    </div>
    <div class="container footer__copy">
      <p>© ${year} ${site.name}. Todos os direitos reservados.</p>
    </div>
  </footer>

  <div class="lightbox" data-lightbox hidden>
    <button type="button" class="lightbox__close" data-lightbox-close aria-label="Fechar imagem">×</button>
    <img data-lightbox-image alt="" />
  </div>
  `
}
