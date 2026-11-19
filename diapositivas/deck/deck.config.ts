/**
 * Everything that may need changing five minutes before going on stage lives here.
 * After editing, rebuild (`npm run build` / `npm run present`).
 */
export const config = {
  title: 'La red de la gestoría, ordenada',
  /** One line under the title. Empty = none. */
  subtitle: 'Lo que hemos hecho y lo que queda por decidir',
  author: 'Grupo 3 — Fran, Judit y Paula',
  /** Destination of the QR on the closing screen. "TODO" = no QR (the presenter view warns). Never guess it. */
  qrUrl: 'https://fj-po.github.io/Proyecto-1--Bastionado-de-redes-G3/',
  /** Shown under the QR, e.g. "example.com/talk". */
  qrLabel: 'La web del proyecto',
} as const;
