(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFormulatorFeatureMixer'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFormulatorFeatureMixer'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtFormulatorFeatureMixer = class {

    static isHook(k) {
      return [
        "created", "mounted", "updated",
        "beforeDestroy", "destroyed"
      ].includes(k)
    }

    static mix(interfaces) {
      trace("NwtFormulatorFeatureMixer.mix");
      const out = {
        data: null,
        methods: {},
        computed: {},
        watch: {}
      };
      const dataFns = []
      const hooks = {}
      for (const iface of interfaces) {
        // data
        if (iface.data) dataFns.push(iface.data)
        // methods / computed / props → NO se suman
        for (const k of ["methods", "computed", "props"]) {
          if (!iface[k]) continue
          for (const key in iface[k]) {
            if (out[k][key])
              throw new Error(`Collision on ${k}.${key}`)
            out[k][key] = iface[k][key]
          }
        }
        // watch → merge por clave
        if (iface.watch) {
          for (const key in iface.watch) {
            const cur = out.watch[key]
            out.watch[key] = cur
              ? [].concat(cur, iface.watch[key])
              : iface.watch[key]
          }
        }
        // hooks → se encadenan
        for (const key in iface) {
          if (typeof iface[key] === "function" && this.isHook(key)) {
            (hooks[key] ||= []).push(iface[key])
          }
        }
      }
      // data final
      out.data = dataFns.length ? function () {
        let res = {}
        for (const fn of dataFns)
          Object.assign(res, fn.call(this))
        return res
      } : () => ({});
      // hooks finales
      for (const key in hooks) {
        out[key] = function () {
          for (const fn of hooks[key])
            fn.call(this)
        }
      }
      return out
    }

  };

  return NwtFormulatorFeatureMixer;

});