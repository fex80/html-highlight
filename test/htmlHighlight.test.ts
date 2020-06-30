import { htmlHighlight } from '../src'

describe('htmlHighlight', function () {
  it('does nothing if highlightSpecs is not set', function () {
    const result = htmlHighlight('I say Hello World.', undefined)
    expect(result).toEqual('I say Hello World.')
  })

  it('does nothing if highlightSpecs is empty', function () {
    const result = htmlHighlight('I say Hello World.', [])
    expect(result).toEqual('I say Hello World.')
  })

  it('adds the class in a mark', function () {
    const result = htmlHighlight('I say Hello World.', [{ position: [0, 1], className: 'c1' }])
    expect(result).toEqual('<mark class="c1">I</mark> say Hello World.')
  })

  it('adds another class in a mark', function () {
    const result = htmlHighlight('I say Hello World.', [{ position: [0, 1], className: 'c2' }])
    expect(result).toEqual('<mark class="c2">I</mark> say Hello World.')
  })

  it('does not mind the order of the specified positions A', function () {
    const result = htmlHighlight('I say Hello World.', [{ position: [0, 1], className: 'c1' }, { position: [2, 3], className: 'c2' }])
    expect(result).toEqual('<mark class="c1">I</mark> <mark class="c2">say</mark> Hello World.')
  })

  it('does not mind the order of the specified positions B', function () {
    const result = htmlHighlight('I say Hello World.', [{ position: [2, 3], className: 'c2' }, { position: [0, 1], className: 'c1' }])
    expect(result).toEqual('<mark class="c1">I</mark> <mark class="c2">say</mark> Hello World.')
  })

  it('throws when there is an overlap', function () {
    expect(() => {
      htmlHighlight('I say Hello World.', [{ position: [2, 3], className: 'c2' }, { position: [0, 10], className: 'c1' }])
    }).toThrowError('not supported')
  })

  it('includes the sorted highlightSpecs in the error message', function () {
    expect(() => {
      htmlHighlight('I say Hello World.', [{ position: [2, 3], className: 'c2' }, { position: [0, 10], className: 'c1' }])
    }).toThrowError('{"position":[0,10],"className":"c1"},{"position":[2,3],"className":"c2"}')
  })
})
