/**
 * 
 * # Nwt V-Resizable Directive - Vue directive
 * 
 * Directiva para `vue2` con la que convertir a un elemento en auto-redimensionable.
 * 
 * ## Exposición
 * 
 * Se expone vía la directiva:
 * 
 * ```html
 * <div v-resizable />
 * ```
 * 
 * 
 * 
 * 
 */
Vue.directive("resizable", {
  inserted(el) {
    el.style.position = el.style.position || "fixed";
    el.style.userSelect = "none";
    const EDGE_SIZE = 10; // píxeles sensibles al resize

    let resizing = false;
    let resizeDir = null;
    let startX = 0;
    let startY = 0;
    let startW = 0;
    let startH = 0;

    const onMouseDown = function (e) {
      const rect = el.getBoundingClientRect();
      const insideRight = e.clientX >= rect.right - EDGE_SIZE && e.clientX <= rect.right;
      const insideBottom = e.clientY >= rect.bottom - EDGE_SIZE && e.clientY <= rect.bottom;

      if (!insideRight && !insideBottom) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      resizing = true;
      resizeDir = (insideRight && insideBottom) ? "both"
        : insideRight ? "right"
          : "bottom";

      startX = e.clientX;
      startY = e.clientY;
      startW = rect.width;
      startH = rect.height;

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = function (e) {
      if (!resizing) {
        return;
      }

      let newW = startW;
      let newH = startH;

      if (resizeDir === "right" || resizeDir === "both") {
        newW = startW + (e.clientX - startX);
      }

      if (resizeDir === "bottom" || resizeDir === "both") {
        newH = startH + (e.clientY - startY);
      }

      el.style.width = Math.max(50, newW) + "px";
      el.style.height = Math.max(50, newH) + "px";
    };

    const onMouseUp = function () {
      resizing = false;
      resizeDir = null;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    const onMouseMoveCursor = function (e) {
      const rect = el.getBoundingClientRect();
      const insideRight = e.clientX >= rect.right - EDGE_SIZE && e.clientX <= rect.right;
      const insideBottom = e.clientY >= rect.bottom - EDGE_SIZE && e.clientY <= rect.bottom;

      if (insideRight && insideBottom) {
        el.style.cursor = "nwse-resize";
      } else if (insideRight) {
        el.style.cursor = "ew-resize";
      } else if (insideBottom) {
        el.style.cursor = "ns-resize";
      } else {
        el.style.cursor = "";
      }
    };

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mousemove", onMouseMoveCursor);

  }
});