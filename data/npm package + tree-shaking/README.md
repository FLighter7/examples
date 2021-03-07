## Npm package + tree-shaking

The given example shows, how an npm package should be published to be tree-shakeable, and fallbacks for CJS format. We'll consider this with the `lodash` library. This library has a big size - the difference will be easy to show. And it also has two packages in npm - exported as CJS format and exported in ESM format.

### Given

- 2 equal libraries presented as CJS and ESM formats
- Options of import:
```js
import library from 'library';
import {functionality} from 'library';
import functionality from 'library/functionality';
import {functionality} from 'library/functionality';
```

### Questions
- Which import option is the best for tree-shaking?
- CJS or ESM output to npm?

### Results

After building through webpack and rollup the results are:
##### CJS
| Import type | Webpack size | Rollup size | Was tree-shaken
| --- | --- | --- | --- 
| `import library from 'library';` | 535 KB | 547 KB | no
| `import {functionality} from 'library';` | 535 KB | 547 KB | no
| `import functionality from 'library/functionality';` | 11.3 KB | 4.94 KB | yes
| `import {functionality} from 'library/functionality';` | 11.3 KB | 4.95 KB | yes
##### ESM
| Import type | Webpack size | Rollup size | Was tree-shaken
| --- | --- | --- | --- 
| `import library from 'library';` | 1.18 MB | 531 KB | no
| `import {functionality} from 'library';` | 13.9 KB | 4.59 KB | yes
| `import functionality from 'library/functionality';` | 14 KB | 4.59 KB | yes
| * `import {functionality} from 'library/functionality';` | - | - | -

\* `lodash-es` doesn't provide this import option, but the result will be the same as `import functionality from 'library/functionality';`

According to the results, the best import option is ESM `import {functionality} from 'library';`, because ESM doesn't need fallbacks `'library/functionality'`, this style is short enough and tree-shakeable.

### Summary
- Publish your npm package in ESM format, but if you use it in Node.js and published package in CJS then provide fallbacks `'library/functionality'` for independent functions in your library.
- Load only what you need, avoid using `import library from 'library';`, better choice is `import {functionality} from 'library';`(for ESM).

### Links
- [How CommonJS is making your bundles larger](https://web.dev/commonjs-larger-bundles)
- [JavaScript tree shaking, like a pro](https://bluepnume.medium.com/javascript-tree-shaking-like-a-pro-7bf96e139eb7)
- [Creating a tree shakable library with rollup](https://stackoverflow.com/questions/56775433/creating-a-tree-shakable-library-with-rollup)
