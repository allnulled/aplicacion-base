// @code.start: LswReloadable injection | @$section: LswReloader API » LswReloadable injection
const serverUrl = 'http://127.0.0.1';
const serverPort = 3000;

if (window.location.href.startsWith("http://") || window.location.href.startsWith("chrome-extension://")) {
  const socket = io(`${serverUrl}:${serverPort}`);
  socket.on('refrescar', () => {
    console.log('Recibida la señal de refrescar desde el servidor');
    location.reload();
  });
}
// @code.end: LswReloadable injection