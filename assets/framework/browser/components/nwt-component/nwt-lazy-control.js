(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtLazyControl'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtLazyControl'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtLazyControl = class extends NwtLazyComponent {

    static defaultBasedir = NwtPaths.global.relative("assets/framework/browser/components/nwt-component/type");

  };

  return NwtLazyControl;

});