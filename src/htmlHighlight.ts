
/** Defines the highlights we will add to the document.
 * It's a array of {HighlightSpec} objects.
 */
export type HighlightSpecs = HighlightSpec[]

/** Defines one highlight. 
 */
export type HighlightSpec = {
  /** Defines where the highlight will be applied */
  position: HighlightPosition,
  /** The CSS class(es) to apply on the highlight <span> element */
  className: string,
}

/**
 * Defines where to apply the highlight: [index, length]
 * index: the index where the highlight should start
 * length: the length of the highlight  
 */
export type HighlightPosition = [number, number]

/**
 * Adds highlights to a source document, e.g. a html document. The highlights
 * will be added in form of <span> elements, whose CSS-class we can specify.
 * @param {string} sourceDoc - The document we should add highlights to
 * @param {HighlightSpecs} highlightSpecs - Defines the highlights we will add to the document. It's a array of {HighlightSpec} objects.
 */
export function htmlHighlight(
  sourceDoc: string,
  highlightSpecs: HighlightSpecs | undefined,
): string {
  if (!highlightSpecs) return sourceDoc

  let result = ''
  let lastIndex = 0

  highlightSpecs.sort(byPositionAscending)

  for (let i = 0; i < highlightSpecs.length; i++) {
    const highlightSpec = highlightSpecs[i]
    const positionIndex = highlightSpec.position[0]
    if (positionIndex < lastIndex) throw new Error('nested highlights are not supported: ' + JSON.stringify(highlightSpecs))

    const length = highlightSpec.position[1]

    const highlightStart = '<span class="' + highlightSpec.className + '">'
    const highlightEnd = '</span>'

    result +=
      sourceDoc.substr(lastIndex, positionIndex - lastIndex) + // Text since last highlight (or beginning of document)
      highlightStart + // highlight opener
      sourceDoc.substr(positionIndex, length) + // highlighted text
      highlightEnd // highlight closer

    lastIndex = positionIndex + length
  }
  result += sourceDoc.substr(lastIndex) // text after last highlight

  return result
}

function byPositionAscending(a: HighlightSpec, b: HighlightSpec): number {
  return a.position[0] - b.position[0]
}
