import babel from '@babel/core'
import reactStrictBabelPreset from 'react-strict-dom/babel-preset'

type StyleXRule = string

/**
 * Creates a bundler for processing StyleX rules using Babel and React Strict DOM.
 * @returns An object with methods to transform files, remove entries, and bundle CSS.
 */
export function createBundler() {
  const styleXRulesMap = new Map<string, StyleXRule[]>()

  /**
   * Transforms the source code using Babel, extracting StyleX rules and storing them.
   * @param id - The unique identifier for the file (usually the file path).
   * @param sourceCode - The source code to transform.
   * @param babelConfig - The Babel configuration options to use during transformation.
   * @returns An object containing the transformed code, source map, and metadata.
   */
  async function transform(
    id: string,
    sourceCode: string,
    babelConfig: babel.TransformOptions
  ) {
    const { code, map, metadata } = await babel.transformAsync(sourceCode, {
      filename: id,
      caller: {
        name: 'postcss-react-strict-dom',
        platform: 'web',
        isDev: process.env.NODE_ENV === 'development',
        supportsStaticESM: true,
      },
      ...babelConfig,
    })
    const stylex = (metadata as { stylex?: StyleXRule[] }).stylex
    if (stylex != null && stylex.length > 0) {
      styleXRulesMap.set(id, stylex)
    }

    return { code, map, metadata }
  }

  /**
   * Removes the stored StyleX rules for the specified file.
   * @param id - The unique identifier for the file (usually the file path).
   */
  function remove(id: string) {
    styleXRulesMap.delete(id)
  }

  /**
   * Bundles all collected StyleX rules into a single CSS string.
   * @returns The generated CSS string from the collected StyleX rules.
   */
  function bundle() {
    const rules = Array.from(styleXRulesMap.values()).flat()

    const css = reactStrictBabelPreset.generateStyles(rules)

    return css
  }

  return {
    transform,
    remove,
    bundle,
  }
}
