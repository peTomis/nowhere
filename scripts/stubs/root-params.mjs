// `next/root-params` outside Next (yarn validate): the real module only exists in a compiled
// route. The validator never renders, so the language is never read.
export const lang = async () => undefined
