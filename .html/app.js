(() => {
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const on = (el, evt, fn) => el && el.addEventListener(evt, fn);

  function setupTopbar() {
    const topbar = qs('[data-topbar]');
    const onScroll = () => topbar?.classList.toggle('topbar--solid', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function setupMenu() {
    const menuBtn = qs('[data-menu-btn]');
    const nav = qs('[data-nav]');
    if (!menuBtn || !nav) return;
    nav.id = 'menu-principal';
    const close = () => {
      nav.classList.remove('nav--open');
      menuBtn.classList.remove('menu-btn--open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Abrir menu');
    };
    const open = () => {
      nav.classList.add('nav--open');
      menuBtn.classList.add('menu-btn--open');
      menuBtn.setAttribute('aria-expanded', 'true');
      menuBtn.setAttribute('aria-label', 'Fechar menu');
    };
    on(menuBtn, 'click', () => (nav.classList.contains('nav--open') ? close() : open()));
    qsa('a', nav).forEach((link) => on(link, 'click', close));
    on(document, 'keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  function setupContactForm() {
    const form = qs('[data-contact-form]');
    const note = qs('[data-form-note]');
    const submit = form && qs('[data-submit]', form);
    if (!form || !note || !submit) return;
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const clearErrors = () => {
      qsa('[data-error-for]', form).forEach((el) => { el.textContent = ''; });
      qsa('input, textarea, select', form).forEach((el) => el.removeAttribute('aria-invalid'));
    };

    on(form, 'submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const payload = {
        name: String(data.get('name') || '').trim(),
        email: String(data.get('email') || '').trim(),
        clinic: String(data.get('clinic') || '').trim(),
        phone: String(data.get('phone') || '').trim(),
        teamSize: String(data.get('teamSize') || '').trim(),
        message: String(data.get('message') || '').trim(),
      };
      const errors = {};
      if (payload.name.length < 2) errors.name = 'Informe seu nome completo.';
      if (!EMAIL_RE.test(payload.email)) errors.email = 'Informe um e-mail válido.';
      if (payload.clinic.length < 2) errors.clinic = 'Informe a clínica e a cidade.';
      if (payload.phone && payload.phone.replace(/\D/g, '').length < 10) {
        errors.phone = 'Telefone inválido. Use DDD + número.';
      }
      if (payload.message.length > 800) errors.message = 'Mensagem deve ter no máximo 800 caracteres.';

      clearErrors();
      if (Object.keys(errors).length) {
        for (const [field, message] of Object.entries(errors)) {
          const errorEl = qs('[data-error-for="' + field + '"]', form);
          const input = qs('[name="' + field + '"]', form);
          if (errorEl) errorEl.textContent = message;
          if (input) input.setAttribute('aria-invalid', 'true');
        }
        note.hidden = false;
        note.classList.add('form-note--error');
        note.textContent = 'Revise os campos destacados para continuar.';
        return;
      }

      try {
        const key = 'sanavita_leads';
        const current = JSON.parse(localStorage.getItem(key) || '[]');
        localStorage.setItem(key, JSON.stringify([...current, { ...payload, createdAt: new Date().toISOString() }].slice(-50)));
      } catch (_) {}

      submit.disabled = true;
      submit.textContent = 'Enviando...';
      setTimeout(() => {
        note.hidden = false;
        note.classList.remove('form-note--error');
        note.textContent = 'Recebemos seu interesse! Em produção, este formulário envia para o time comercial.';
        form.reset();
        submit.disabled = false;
        submit.textContent = 'Solicitar demonstração';
      }, 450);
    });
  }

  function setupReveal() {
    const nodes = qsa('[data-reveal]');
    if (!nodes.length || !('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    nodes.forEach((n) => observer.observe(n));
  }

  function setupLightbox() {
    const root = qs('[data-lightbox]');
    const image = qs('[data-lightbox-image]');
    const closeBtn = qs('[data-lightbox-close]');
    if (!root || !image || !closeBtn) return;
    const close = () => {
      root.hidden = true;
      image.removeAttribute('src');
      document.body.classList.remove('lightbox-open');
    };
    const open = (src, alt) => {
      image.src = src;
      image.alt = alt;
      root.hidden = false;
      document.body.classList.add('lightbox-open');
      closeBtn.focus();
    };
    qsa('[data-lightbox-src]').forEach((button) => {
      on(button, 'click', () => {
        const src = button.dataset.lightboxSrc;
        const alt = button.dataset.lightboxAlt || '';
        if (src) open(src, alt);
      });
    });
    on(closeBtn, 'click', close);
    on(root, 'click', (e) => { if (e.target === root) close(); });
    on(document, 'keydown', (e) => { if (e.key === 'Escape' && !root.hidden) close(); });
  }

  function setupFaq() {
    const list = qs('[data-faq]');
    if (!list) return;
    const items = qsa('details', list);
    items.forEach((item) => {
      on(item, 'toggle', () => {
        if (!item.open) return;
        items.forEach((other) => { if (other !== item) other.open = false; });
      });
    });
    const nav = qs('[data-faq-nav]');
    if (!nav) return;
    qsa('[data-faq-filter]', nav).forEach((button) => {
      on(button, 'click', () => {
        const filter = button.dataset.faqFilter || 'all';
        qsa('[data-faq-filter]', nav).forEach((other) => {
          other.classList.toggle('is-active', other === button);
        });
        items.forEach((item) => {
          const category = item.dataset.faqCategory || '';
          const match = filter === 'all' || category === filter;
          item.hidden = !match;
          if (!match) item.open = false;
        });
        const firstVisible = items.find((item) => !item.hidden);
        if (firstVisible && !items.some((item) => item.open && !item.hidden)) {
          firstVisible.open = true;
        }
      });
    });
  }

  function setupSmoothAnchors() {
    qsa('a[href^="#"]').forEach((link) => {
      on(link, 'click', (event) => {
        const id = link.getAttribute('href')?.slice(1);
        if (!id) return;
        const target = document.getElementById(id);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', '#' + id);
      });
    });
  }

  setupTopbar();
  setupMenu();
  setupContactForm();
  setupReveal();
  setupLightbox();
  setupFaq();
  setupSmoothAnchors();
})();
