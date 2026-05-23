// src/data/faqs.ts
// Phase 2 (CONT-08, D-13): 6 FAQs consumidas por FAQ.astro sólo en home.
// Las respuestas respetan docs/copy-glossary.md lista PROHIBIDO — sin atribución clínica, sin nombres de sustancia.
// Phase 3 puede refinar via revisión de abogado; para Phase 2 son la v1 escrita dentro del glosario.

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    question: '¿Qué encuadre legal tiene este espacio?',
    answer: 'planetapsilo ofrece espacios de exploración personal y acompañamiento no clínico. No constituye terapia ni servicio de salud. Para necesidades de salud mental, consulta a un profesional habilitado.',
  },
  {
    question: '¿Qué tan confidencial es lo que se conversa aquí?',
    answer: 'Lo que se conversa aquí no sale de aquí. Trabajamos con discreción profesional y archivamos sólo lo mínimo necesario para responderte y coordinar próximos encuentros.',
  },
  {
    question: '¿Cómo sé si esto es para mí?',
    answer: 'Si estás en un momento de inflexión profesional o personal y buscas un espacio para reordenar desde otra altura, conversemos antes. Hay una conversación previa — para saber si lo que pides y lo que ofrecemos calzan.',
  },
  {
    question: '¿Qué pasa en un encuentro de acompañamiento?',
    answer: 'Una conversación uno-a-uno en un espacio sin interrupciones. Sin protocolo clínico, sin diagnóstico, sin recetario. La forma se ajusta a lo que cada persona necesita en cada momento.',
  },
  {
    question: '¿Cuánto tiempo dura un proceso típico?',
    answer: 'Depende. Algunas personas vienen por una conversación puntual; otras sostienen encuentros recurrentes durante varios meses. No hay número mínimo ni paquete obligatorio — se construye sobre la marcha.',
  },
  {
    question: '¿Cómo decido entre acompañamiento y un retiro?',
    answer: 'El acompañamiento es ongoing: encuentros que sostienen un proceso en tu vida cotidiana. El retiro es una pausa profunda concentrada en pocos días, con preparación e integración. Si nunca participaste en un espacio similar, conviene empezar por la conversación.',
  },
];
