module.exports = {
  "stories": ["../stories/**/*.stories.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-storysource", "@storybook/addon-docs", "@storybook/preset-scss", "@storybook/addon-mdx-gfm"],
  docs: {
    autodocs: true
  },
  framework: {
    name: "@storybook/html-webpack5",
    options: {}
  }
};