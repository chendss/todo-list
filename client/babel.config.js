module.exports = {
  presets: [
    '@vue/app',
    ['@babel/env', { modules: 'commonjs' }],
  ],
  plugins: [
    'add-module-exports',
    '@babel/plugin-proposal-class-properties'
  ],
}
