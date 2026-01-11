/**
 * 
 * # Nwt Environment API
 * 
 * API para poder discriminar entre diferentes entornos del JavaScript.
 * 
 * ## Exposición
 * 
 * Se expone a través de:
 * 
 * ```js
 * NwtEnvironment
 * NwtFramework.Environment
 * Vue.prototype.$nwt.Environment
 * ```
 * 
 * ## Ventajas
 * 
 * Puedes hacer cosas como:
 * 
 * ```js
 * NwtEnvironment.summary() // Object con todas las propiedades
 * NwtEnvironment.isDesktop // Boolean
 * NwtEnvironment.isBrowser // Boolean
 * NwtEnvironment.isMobile // Boolean
 * NwtEnvironment.isLinux // Boolean
 * NwtEnvironment.isWindows // Boolean
 * NwtEnvironment.isMac // Boolean
 * NwtEnvironment.isAndroid // Boolean
 * NwtEnvironment.isIOS // Boolean
 * NwtEnvironment.isElectron // Boolean
 * NwtEnvironment.isNode // Boolean
 * NwtEnvironment.isCordova // Boolean
 * NwtEnvironment.isCapacitor // Boolean
 * NwtEnvironment.isNWJS // Boolean
 * NwtEnvironment.isTouchDevice // Boolean
 * NwtEnvironment.isHeadless // Boolean
 * NwtEnvironment.canUseLocalStorage // Boolean
 * NwtEnvironment.canUseFilesystem // Boolean
 * NwtEnvironment.hasWindow // Boolean
 * NwtEnvironment.hasDOM // Boolean
 * NwtEnvironment.hasGlobal // Boolean
 * NwtEnvironment.hasRequire // Boolean
 * ```
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtEnvironment'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtEnvironment'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const hasGlobal = function() {
    return typeof global !== "undefined";
  }

  const hasWindow = function() {
    return typeof window !== "undefined";
  }

  const hasDocument = function() {
    return typeof document !== "undefined";
  }

  const hasRequire = function() {
    return typeof require === "function";
  }

  const detectNode = function() {
    return hasGlobal() && hasRequire() && typeof process !== "undefined";
  }

  const detectCordova = function() {
    return hasWindow() && (window.cordova || window.PhoneGap || window.phonegap);
  }

  const detectCapacitor = function() {
    return hasWindow() && window.Capacitor;
  }

  const detectElectron = function() {
    return detectNode() && !!process.versions.electron;
  }

  const detectNWJS = function() {
    return detectNode() && !!process.versions.nw;
  }

  const detectOS = function() {
    if (detectNode()) {
      const p = process.platform;
      if (p === "win32") return "windows";
      if (p === "linux") return "linux";
      if (p === "darwin") return "macos";
      if (p === "android") return "android";
      return p;
    } else {
      const ua = navigator.userAgent || "";
      if (/Windows/i.test(ua)) return "windows";
      if (/Linux/i.test(ua) && !/Android/i.test(ua)) return "linux";
      if (/Macintosh|Mac OS X/i.test(ua)) return "macos";
      if (/Android/i.test(ua)) return "android";
      if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
      return "unknown";
    }
  }

  const detectTouch = function() {
    if (!hasWindow()) return false;
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  }

  const detectLocalStorage = function() {
    try {
      if (!hasWindow()) return false;
      const x = "ls_test";
      localStorage.setItem(x, x);
      localStorage.removeItem(x);
      return true;
    } catch (e) {
      return false;
    }
  }

  const detectFilesystem = function() {
    if (detectNode()) return true;
    // Browser FS APIs (File System Access API)
    if (hasWindow() && window.showOpenFilePicker) return true;
    return false;
  }

  const detectHeadless = function() {
    if (!hasWindow()) return true;
    if (!hasDocument()) return true;
    return false;
  }

  const NwtEnvironment = class {

    static initialize() {

      const isNode = detectNode();
      const isCordova = !!detectCordova();
      const isCapacitor = !!detectCapacitor();
      const os = detectOS();

      this.isDesktop = isNode && !isCordova && !isCapacitor;
      this.isBrowser = hasWindow() && !isNode && !isCordova && !isCapacitor;
      this.isMobile = isCordova || isCapacitor || os === "android" || os === "ios";

      this.isLinux = os === "linux";
      this.isWindows = os === "windows";
      this.isMac = os === "macos";
      this.isAndroid = os === "android";
      this.isIOS = os === "ios";

      this.isElectron = detectElectron();
      this.isNode = isNode;
      this.isCordova = isCordova;
      this.isCapacitor = isCapacitor;
      this.isNWJS = detectNWJS();

      this.isTouchDevice = detectTouch();
      this.isHeadless = detectHeadless();

      this.canUseLocalStorage = detectLocalStorage();
      this.canUseFilesystem = detectFilesystem();

      this.hasDOM = hasDocument();
      this.hasWindow = hasWindow();
      this.hasGlobal = hasGlobal();
      this.hasRequire = hasRequire();

      return this;

    }

    static summary() {
      return {
        isDesktop: this.isDesktop,
        isBrowser: this.isBrowser,
        isMobile: this.isMobile,
        isLinux: this.isLinux,
        isWindows: this.isWindows,
        isMac: this.isMac,
        isAndroid: this.isAndroid,
        isIOS: this.isIOS,
        isElectron: this.isElectron,
        isNode: this.isNode,
        isCordova: this.isCordova,
        isCapacitor: this.isCapacitor,
        isNWJS: this.isNWJS,
        isTouchDevice: this.isTouchDevice,
        isHeadless: this.isHeadless,
        canUseLocalStorage: this.canUseLocalStorage,
        canUseFilesystem: this.canUseFilesystem,
        hasWindow: this.hasWindow,
        hasDOM: this.hasDOM,
        hasGlobal: this.hasGlobal,
        hasRequire: this.hasRequire
      };
    }



  };

  // Ejecutamos detection automáticamente
  NwtEnvironment.initialize();

  return NwtEnvironment;

});