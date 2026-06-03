// src/data/faqs.ts
// Sofía Castañeda LP — preguntas frecuentes (consumidas por FAQ.astro).

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    question: '¿Las sesiones son completamente virtuales?',
    answer: 'Sí. Todas las sesiones se realizan por videollamada, así que puedes conectarte desde donde te sientas cómoda o cómodo, en Colombia o en el exterior. Solo necesitas conexión a internet y un espacio tranquilo.',
  },
  {
    question: '¿Cómo puedo agendar?',
    answer: 'Puedes reservar una llamada gratuita de 15 minutos directamente desde el botón principal de la página, o escribirme por WhatsApp y coordinamos un horario. En esa primera llamada resolvemos dudas y, si quieres, agendamos la primera sesión.',
  },
  {
    question: '¿Qué ocurre en la llamada gratuita de 15 minutos?',
    answer: 'Es una conversación breve y sin compromiso para conocernos: me cuentas qué te trae, resuelvo tus dudas sobre cómo trabajo y vemos juntos si este acompañamiento es lo que estás buscando. Si sentimos que encaja, coordinamos la primera sesión.',
  },
  {
    question: '¿Cuánto dura cada sesión y cuál es el valor?',
    answer: 'Cada sesión dura 50 minutos y tiene un valor de $50.000 COP. La llamada inicial de 15 minutos es gratuita.',
  },
  {
    question: '¿Qué métodos de pago aceptas?',
    answer: 'Coordinamos el pago por transferencia o los medios digitales más cómodos para ti (por ejemplo Nequi o Bancolombia). Te comparto los detalles al agendar tu primera sesión.',
  },
];
