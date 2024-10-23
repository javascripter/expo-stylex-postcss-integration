# Expo Web with Static CSS Extraction using PostCSS (Proof of Concept)

This repository demonstrates how to integrate **StyleX** and **React Strict DOM** with **Expo Web**, enabling **Static CSS Extraction** through a custom **PostCSS** plugin located in `lib/postcss-react-strict-dom`.

### Highlights

- **Bypassing Metro for CSS extraction in Web**: Works seamlessly on both **web** and **native** platforms.
- **Fast Refresh**: Fully supported across platforms.
- **Transpiling External Modules**: Partially supported by specifying the files to transpile in the `include` option in `postcss.config.js`.
- **PostCSS Plugin Flexibility**: Easily generate StyleX CSS bundles for other bundlers via the PostCSS CLI or integrate into Expo and Next.js.

### Configuration

To integrate with Expo Web:

1. Update `babel.config.js`:

```js
// Based on:
// https://github.com/facebook/react-strict-dom/blob/13f3958ae876b871250b893bd6d71aae4eb38310/apps/examples/babel.config.js
const reactStrictPreset = require('react-strict-dom/babel-preset')

function getPlatform(caller) {
  return caller && caller.platform
}

function getIsDev(caller) {
  if (caller?.isDev != null) return caller.isDev
  // https://babeljs.io/docs/options#envname
  return (
    process.env.BABEL_ENV === 'development' ||
    process.env.NODE_ENV === 'development'
  )
}

module.exports = function (api) {
  //api.cache(true);

  const platform = api.caller(getPlatform)
  const isDev = api.caller(getIsDev)

  const presets = ['babel-preset-expo']
  const plugins = []

  if (platform === 'web') {
    presets.push([
      reactStrictPreset,
      {
        debug: true,
        dev: false, // This should be set `false` to disable runtime injection
        rootDir: __dirname,
      },
    ])
  }

  return {
    plugins,
    presets,
  }
}
```

2. Update `postcss.config.js`:

```js
module.exports = {
  plugins: {
    'postcss-react-strict-dom': {
      include: [
        'src/**/*.{js,jsx,ts,tsx}',
        'node_modules/react-strict-dom/dist/**/*.{js,jsx,ts,tsx}',
      ],
    },
    autoprefixer: {},
  },
}
```

3. Create `src/global.css`:

```css
@stylex;
```

4. Import `src/global.css` in your root layout (`src/app/layout.tsx`):

```typescript
import '@/global.css'
import { Stack } from 'expo-router'

export default Stack
```

### How to Run

1. Install dependencies:

   ```bash
   bun install
   ```

2. Start development mode for web:

   ```bash
   bun web
   # or
   bun start
   ```

3. For native platforms (iOS/Android):
   ```bash
   bun ios
   bun android
   ```
   > On native platforms, StyleX integration is skipped, because it requires no configuration.

### Approach Overview

This repository uses:

- **`babel.config.js`** for JavaScript/TypeScript compilation.
- **`postcss.config.js`** for Static CSS extraction.

This approach simplifies integration across bundlers like **Metro** and **Turbopack**, allowing easy configuration without complex bundler-specific integration.

### Why PostCSS?

Unlike my previous Metro-based solution ([`stylex-expo`](https://github.com/javascripter/stylex-expo)), this PostCSS-based approach avoids Metro’s side-effect issues, particularly cache invalidation problems as discussed [here](https://github.com/facebook/react-strict-dom/issues/34#issuecomment-2101256176).

### Limitations & Future Improvements

- **Proof of Concept**: This repository currently serves as a PoC and lacks thorough testing. The plugin isn't published on npm yet.
- **Tree Shaking**: Since the PostCSS plugin processes all files matching the
  glob patterns, unused code may affect CSS output. This issue is similar to
  CLI-based tools like Tailwind CLI/StyleX CLI and should be addressed with
  deeper bundler integration.
