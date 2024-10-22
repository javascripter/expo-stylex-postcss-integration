import { PluginCreator } from 'postcss';

interface PluginOptions {
    include: string[];
    exclude?: string[];
    cwd?: string;
}
/**
 * PostCSS plugin for processing StyleX and React Strict DOM rules.
 * @param options - Configuration options for the plugin, including file patterns to include/exclude and the working directory.
 * @returns A PostCSS plugin object with async processing for StyleX at-rules.
 */
declare const plugin: PluginCreator<PluginOptions>;

export { plugin as default };
