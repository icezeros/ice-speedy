const cwd = process.cwd();
import slash from 'slash';

export default {
  history: 'hash',
  outputPath: `../../dist/renderer`,
  publicPath: './',
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: true,
        title: 'umi-electron',
        dll: true,
        // routes: {
        //   exclude: [],
        // },
        hardSource: false,
        routes: {
          exclude: [/components/],
        },
      },
    ],
  ],
  externals(context, request, callback) {
    const isDev = process.env.NODE_ENV === 'development';
    let isExternal = false;
    const load = ['electron', 'fs', 'path', 'os', 'url', 'child_process'];
    if (load.includes(request)) {
      isExternal = `require("${request}")`;
    }
    // const appDeps = Object.keys(require('../../app/package').dependencies);
    // if (appDeps.includes(request)) {
    //   const orininalPath = slash(
    //     join(__dirname, '../../app/node_modules', request)
    //   );
    //   const requireAbsolute = `require('${orininalPath}')`;
    //   isExternal = isDev ? requireAbsolute : `require('${request}')`;
    // }
    // const orininalPath = slash(
    //   join(__dirname, '../../app/node_modules', request)
    // );
    // const requireAbsolute = `require('${orininalPath}')`;
    // isExternal = isDev ? requireAbsolute : `require('${request}')`;
    callback(null, isExternal);
  },
};
