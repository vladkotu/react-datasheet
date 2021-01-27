export default {
  input: 'lib/index.js',
  external: ['react', 'prop-types'],
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    exports: 'named',
    name: 'ReactDatasheet',
    globals: {
      react: 'React',
      'prop-types': 'PropTypes'
    }
  }
};