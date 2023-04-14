import prettier from 'prettier/standalone'
import htmlParser from 'prettier/parser-html'

export const prettifyHtml = str => {
  if (!str) return

  // https://prettier.io/docs/en/api.html#prettierformatsource-options
  return prettier.format(str, {
    plugins: [htmlParser],
    parser: 'html',
    htmlWhitespaceSensitivity: 'ignore'
  });
}
