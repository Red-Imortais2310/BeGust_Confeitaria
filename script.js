// Rolagem suave para links da navbar
document.querySelectorAll('.menu a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('href').substring(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Simulação de envio do formulário de contato (ajuste para seu backend)
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.textContent = 'Enviando...';

    // Exemplo: enviar via Formspree / seu endpoint
    try {
      // Substitua pela sua URL de backend
      // const res = await fetch('https://seu-endpoint.com/contato', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(Object.fromEntries(new FormData(form)))
      // });

      // Simulação de sucesso:
      await new Promise(r => setTimeout(r, 800));
      statusEl.textContent = 'Mensagem enviada! Vamos responder em breve.';
      form.reset();
    } catch (err) {
      statusEl.textContent = 'Erro ao enviar. Tente novamente ou chame no WhatsApp.';
    }
  });
}

// Pequena otimização do efeito parallax para mobile (desativa attachment fixo se necessário)
function adjustParallaxForMobile() {
  const isMobile = window.matchMedia('(max-width: 640px)').matches;
  document.querySelectorAll('.parallax').forEach(sec => {
    if (isMobile) {
      sec.style.backgroundAttachment = 'scroll';
    } else {
      sec.style.backgroundAttachment = 'fixed';
    }
  });
}
adjustParallaxForMobile();
window.addEventListener('resize', adjustParallaxForMobile);

// --- Galeria / Lightbox (zoom ao clicar) ---
document.addEventListener('DOMContentLoaded', () => {
  const galleryImgs = document.querySelectorAll('.gallery-item img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  if (!lightbox) return;

  function openLightbox(src, title, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || title || '';
    lightboxCaption.textContent = title || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    // pequeno delay para forçar a transição
    requestAnimationFrame(() => lightboxImg.style.transform = 'scale(1.02)');
  }

  function closeLightbox() {
    lightboxImg.style.transform = 'scale(1)';
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
  }

  galleryImgs.forEach(img => {
    img.addEventListener('click', () => {
      openLightbox(img.src, img.dataset.title || img.alt || 'Foto do bolo', img.alt);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
});
