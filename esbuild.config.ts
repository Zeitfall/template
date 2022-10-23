const dotenv = require('dotenv').config();
const server = require('@compodoc/live-server');
const esbuild = require('esbuild');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const { sassPlugin } = require('esbuild-sass-plugin');

server.start({
  port: process.env.PORT,
  host: process.env.HOST,
  root: './public',
  open: true,
  ignore: 'node_modules',
});

esbuild.build({
  entryPoints: [
    'src/App.ts',
    // 'src/assets/scss/App.scss'
  ],
  outdir: 'public',
  bundle: true,
  watch: true,
  plugins: [
    sassPlugin({
      // @ts-ignore
      async transform(source) {
        const { css } = await postcss([autoprefixer]).process(source);

        return css;
      },
    }),
  ],
});
