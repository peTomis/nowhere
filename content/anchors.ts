/** HTML id of a card: `ro.person.vlad-iii` → `vlad-iii`, `ro.sibiu` → `sibiu`. */
export const cardAnchor = (id: string) => id.replace(/^[a-z]{2}\.(person\.)?/, '')

/** HTML id of a trace inside a card (prefix: a pinned copy's `ev-`). */
export const traceAnchor = (card: string, trace: string, prefix = '') =>
  `${prefix}trace-${cardAnchor(card)}-${trace.replace(/^[a-z]{2}\.(place\.)?/, '')}`
