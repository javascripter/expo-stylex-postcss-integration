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
