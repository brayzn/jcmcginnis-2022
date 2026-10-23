const WORD = /[\w\u00c0-\u024f]/;

/**
 * Straight ASCII quotes to typographic quotes for display copy.
 * Apostrophes inside words become the right single quote so possessives
 * ("frameworks' sake") and contractions ("it's") read correctly.
 */
export const smartQuotes = (text: string): string =>
  text
    .replace(/(^|[\s([{\u2014\u2013])"/g, "$1\u201c")
    .replace(/"/g, "\u201d")
    .replace(new RegExp(`(${WORD.source})'(?=${WORD.source})`, "g"), "$1\u2019")
    .replace(new RegExp(`(${WORD.source})'`, "g"), "$1\u2019")
    .replace(/(^|[\s([{\u2014\u2013])'/g, "$1\u2018")
    .replace(/'/g, "\u2019");

/**
 * Keep an em dash with the word that follows it, so a wrapped line never
 * begins with a bare dash.
 */
export const keepEmDash = (text: string): string =>
  text.replace(/\u2014\s+/g, "\u2014\u00a0");

export const displayText = (text: string): string =>
  keepEmDash(smartQuotes(text));
