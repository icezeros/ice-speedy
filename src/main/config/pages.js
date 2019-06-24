import is from 'electron-is';

export default {
  main: {
    window: {
      title: 'Test',
      width: 1024,
      height: 768,
      minWidth: 840,
      minHeight: 420,
      // backgroundColor: '#FFFFFF',
      //   transparent: !is.windows(),
    },
    bindCloseToHide: true,
    url: is.dev()
      ? `http://localhost:8000/`
      : url.format({
          pathname: path.join(__dirname, './dist/renderer/index.html'),
          protocol: 'file:',
          slashes: true,
        }),
  },
};
