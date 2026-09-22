const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach((item) => observer.observe(item));

document.querySelectorAll('details').forEach((detail) => {
  detail.addEventListener('toggle', () => {
    if (detail.open) {
      document.querySelectorAll('details').forEach((other) => {
        if (other !== detail) other.removeAttribute('open');
      });
    }
  });
});

const planDetails = {
  basic: {
    kicker: 'PARA EMPEZAR CON BUEN PIE',
    title: 'Plan Básico',
    description: 'Todo lo necesario para dar tus primeros pasos profesionales en redes.',
    features: [
      { icon: '▣', title: 'Gestión de red', description: 'Acompañamiento de 1 red social.', badge: '1 red' },
      { icon: '▤', title: 'Posts', description: 'Diseños claros para mantener tu feed activo.', badge: '3 / semana' },
      { icon: '◌', title: 'Historias', description: 'Contenido básico para estar presente cada día.', badge: 'básicas' },
      { icon: '▥', title: 'Reporte', description: 'Lectura simple de lo que funcionó en el mes.', badge: '1 / mes' },
    ],
    note: 'Ideal para pequeños locales que quieren dar sus primeros pasos profesionales en redes.',
    message: 'Hola Paula, me interesa el Plan Básico',
  },
  business: {
    kicker: 'PARA HACER CRECER TU MARCA',
    title: 'Plan Business',
    description: 'Más contenido, estrategia y seguimiento para que tu comunidad se mueva.',
    features: [
      { icon: '▣', title: 'Gestión de redes', description: 'Presencia coordinada en 2 redes sociales.', badge: '2 redes' },
      { icon: '▤', title: 'Posts', description: 'Grilla estética pensada para convertir.', badge: '4 / semana' },
      { icon: '◌', title: 'Historias', description: 'Contenido diario para conversar con tu comunidad.', badge: 'diarias' },
      { icon: '▷', title: 'Reels / Colabs', description: 'Videos dinámicos y colaboraciones locales.', badge: '2 / mes' },
      { icon: '▥', title: 'Reporte', description: 'Métricas, aprendizajes y próximos pasos.', badge: '1 / mes' },
    ],
    note: 'Para marcas que ya empezaron y quieren sostener un ritmo de crecimiento.',
    message: 'Hola Paula, me interesa el Plan Business',
  },
  star: {
    kicker: 'PARA DESPEGAR CON TODO',
    title: 'Plan Star',
    description: 'La experiencia completa para marcas que quieren ocupar un lugar inolvidable.',
    features: [
      { icon: '▣', title: 'Gestión total', description: 'Dirección de 3 redes con estrategia unificada.', badge: '3 redes' },
      { icon: '▤', title: 'Posts', description: 'Contenido de alto impacto y dirección creativa.', badge: '5 / semana' },
      { icon: '◌', title: 'Historias', description: 'Presencia diaria, interacción y comunidad.', badge: 'diarias' },
      { icon: '▷', title: 'Reels / Colabs', description: 'Videos, tendencias y colaboraciones.', badge: '4 / mes' },
      { icon: '✦', title: 'Campañas', description: 'Concepto, producción y seguimiento creativo.', badge: 'a medida' },
      { icon: '▥', title: 'Estrategia', description: 'Reunión quincenal y optimización continua.', badge: '2 / mes' },
    ],
    note: 'Para marcas ambiciosas que quieren delegar su crecimiento con una mirada integral.',
    message: 'Hola Paula, me interesa el Plan Star',
  },
};

const planModal = document.querySelector('#plan-modal');
const focusModal = document.querySelector('#focus-modal');
const modalTitle = document.querySelector('#modal-plan-title');
const modalKicker = document.querySelector('#modal-plan-kicker');
const modalDescription = document.querySelector('#modal-plan-description');
const modalFeatures = document.querySelector('#modal-plan-features');
const modalNote = document.querySelector('#modal-plan-note');
const modalLink = document.querySelector('#modal-plan-link');
let lastPlanTrigger = null;
let lastFocusTrigger = null;

function openFocusModal(trigger) {
  lastFocusTrigger = trigger;
  focusModal.classList.add('is-open');
  focusModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  focusModal.querySelector('.focus-close').focus();
}

function closeFocusModal() {
  focusModal.classList.remove('is-open');
  focusModal.setAttribute('aria-hidden', 'true');
  if (!planModal.classList.contains('is-open')) document.body.classList.remove('modal-open');
  lastFocusTrigger?.focus();
}

function openPlanModal(planKey, trigger) {
  const plan = planDetails[planKey];
  if (!plan) return;
  lastPlanTrigger = trigger;
  modalKicker.textContent = plan.kicker;
  modalTitle.textContent = plan.title;
  modalDescription.textContent = plan.description;
  modalFeatures.innerHTML = plan.features.map((feature) => `<li class="feature-tile"><span class="feature-icon">${feature.icon}</span><strong>${feature.title}</strong><p>${feature.description}</p><span class="feature-badge">${feature.badge}</span></li>`).join('');
  modalNote.textContent = plan.note;
  modalLink.href = `https://wa.me/5493855190838?text=${encodeURIComponent(plan.message)}`;
  planModal.classList.add('is-open');
  planModal.setAttribute('aria-hidden', 'false');
  planModal.scrollTop = 0;
  document.body.classList.add('modal-open');
  planModal.querySelector('.modal-close').focus();
}

function closePlanModal() {
  planModal.classList.remove('is-open');
  planModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  lastPlanTrigger?.focus();
}

document.querySelectorAll('[data-plan]').forEach((trigger) => {
  trigger.addEventListener('click', () => openPlanModal(trigger.dataset.plan, trigger));
});
document.querySelectorAll('.focus-trigger').forEach((trigger) => trigger.addEventListener('click', () => openFocusModal(trigger)));
document.querySelectorAll('[data-close-plan]').forEach((closeTrigger) => closeTrigger.addEventListener('click', closePlanModal));
document.querySelectorAll('[data-close-focus]').forEach((closeTrigger) => closeTrigger.addEventListener('click', closeFocusModal));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && planModal.classList.contains('is-open')) closePlanModal();
  if (event.key === 'Escape' && focusModal.classList.contains('is-open')) closeFocusModal();
});

const draggableObjects = document.querySelectorAll('.draggable');
const positions = new Map();
const velocity = new Map();
let dragging = null;
let pointerOffset = { x: 0, y: 0 };

draggableObjects.forEach((object, index) => {
  const rect = object.getBoundingClientRect();
  const position = { x: rect.left, y: rect.top };
  positions.set(object, position);
  velocity.set(object, { x: index % 2 ? -0.18 : 0.14, y: index % 2 ? 0.12 : -0.1 });
  object.addEventListener('pointerdown', (event) => {
    dragging = object;
    object.setPointerCapture(event.pointerId);
    const current = positions.get(object);
    pointerOffset = { x: event.clientX - current.x, y: event.clientY - current.y };
    object.classList.add('is-dragging');
  });
  object.addEventListener('pointermove', (event) => {
    if (dragging !== object) return;
    positions.set(object, { x: event.clientX - pointerOffset.x, y: event.clientY - pointerOffset.y });
  });
  object.addEventListener('pointerup', () => {
    dragging = null;
    object.classList.remove('is-dragging');
  });
});

function animateObjects() {
  const padding = 18;
  draggableObjects.forEach((object) => {
    const current = positions.get(object);
    const speed = velocity.get(object);
    if (!current || !speed) return;
    if (dragging !== object) {
      current.x += speed.x;
      current.y += speed.y;
      const maxX = window.innerWidth - object.offsetWidth - padding;
      const maxY = window.innerHeight - object.offsetHeight - padding;
      if (current.x <= padding || current.x >= maxX) speed.x *= -1;
      if (current.y <= padding || current.y >= maxY) speed.y *= -1;
      current.x = Math.max(padding, Math.min(current.x, maxX));
      current.y = Math.max(padding, Math.min(current.y, maxY));
    }
    object.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) rotate(${Math.sin(current.x / 40) * 5}deg)`;
  });
  requestAnimationFrame(animateObjects);
}
animateObjects();

window.addEventListener('resize', () => {
  draggableObjects.forEach((object) => {
    const current = positions.get(object);
    if (current) {
      current.x = Math.min(current.x, window.innerWidth - object.offsetWidth - 18);
      current.y = Math.min(current.y, window.innerHeight - object.offsetHeight - 18);
    }
  });
});
