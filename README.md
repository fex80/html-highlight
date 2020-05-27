# HTML HIGHLIGHT

Adds `<span>` tags to html content at specified positions – useful to highlight search results.


## Usage

Position parameters are gives as `[index, length]` arrays, so to highlight the first letter in a text, we use position `[0, 1]`.

Add a highlight on the first letter of the text with CSS class `c1`:

```TypeScript 
htmlHighlight('I say Hello World.', [{ position: [0, 1], className: 'c1' }])
 --> '<span class="c1">I</span> say Hello World.'
```


We can also add multiple highlights with different classes:

```TypeScript
htmlHighlight('I say Hello World.', [
  { position: [0, 1], className: 'c1' }, 
  { position: [2, 3], className: 'c2' }
])

--> '<span class="c1">I</span> <span class="c2">say</span> Hello World.')
```

That's it :)

Currently, *we do not support nested or overlapping highlights*.

# RELEASE NOTES

## 1.0.1
* including HighlightSpecs in error message


## 1.0.0
* Initial Release


# Developer's notes
### Internal: How to release a new version

* Make sure lint and tests pass
* Add release notes to README.md 
* Commit everything
* Run publish command 
    * PATCH: `npm run preversion && npm version patch && npm publish`
    * MINOR `npm run preversion && npm version minor && npm publish`

