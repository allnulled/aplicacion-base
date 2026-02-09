/**
 * 
 * 
 * # Nwt V-Draggable Directive - Vue directive
 * 
 * Directiva para `vue2` con la que convertir a un elemento en arrastrable de manera global (position: fixed).
 * 
 * ## Exposición
 * 
 * Se expone vía la directiva:
 * 
 * ```html
 * <div v-draggable />
 * ```
 * 
 */
Vue.directive("draggable", {
  inserted(el) {
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;
    // Tamaño inicial (si lo necesitas)
    el.style.width = "75%";
    el.style.height = "75%";
    // Asegurar position fixed
    el.style.position = "fixed";
    // CENTRADO INICIAL
    const center = () => {
      Dependencia_a_process_manager_dialogs_list: {
        const r = el.getBoundingClientRect();
        const offset = NwtProcessManager.dialogs.$list.length * 5;
        el.style.left = (((window.innerWidth - r.width) / 2) + parseFloat(offset)) + "px";
        el.style.top = (((window.innerHeight - r.height) / 2) + parseFloat(offset)) + "px";
      }
    };
    // Centrar justo después del render real
    requestAnimationFrame(center);
    // DRAGGING
    const onMouseDown = function (e) {
      if (!e.target.classList.contains("drag-handle")) {
        return;
      }
      e.preventDefault();
      startX = e.clientX;
      startY = e.clientY;
      const r = el.getBoundingClientRect();
      startLeft = r.left;
      startTop = r.top;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };
    const onMouseMove = function (e) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      el.style.left = startLeft + dx + "px";
      el.style.top = startTop + dy + "px";
    };
    const onMouseUp = function () {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    el.addEventListener("mousedown", onMouseDown);
    // Recentrar si la ventana cambia de tamaño
    window.addEventListener("resize", center);
  }
});