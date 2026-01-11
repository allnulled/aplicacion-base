const fs = require("fs");
const path = require("path");
const child_process = require("child_process");
const distributionJsPath = path.resolve(__dirname + "/../../../dist.js");

module.exports = function (outterOptions = {}) {

  const defaultOptions = {
    directory: process.cwd(),
    port: 3000,
    filter: () => true,
  };
  const options = Object.assign(defaultOptions, outterOptions);

  const express = require('express');
  const http = require('http');
  const path = require('path');
  const socketIo = require('socket.io');
  const chokidar = require('chokidar');

  const app = express();
  const server = http.createServer(app);
  const io = socketIo(server, {
    cors: {
      origin: '*',
    }
  });

  io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');
    socket.on('refrescar', () => {
      console.log('El servidor ha recibido la señal de refrescar');
      io.emit('refrescar');
    });
    socket.on('disconnect', () => {
      console.log('Un cliente se ha desconectado');
    });
  });

  const directorioActual = options.directory;
  
  console.log("[*] Escuchando:", distributionJsPath);
  const existsDistjs = fs.existsSync(distributionJsPath);
  console.log("[*] ¿Existe acaso?", existsDistjs);
  if(!existsDistjs) throw new Error("El fichero «dist.js» debe estar accesible desde una ruta controlada en «reloader»");
  const watcher = chokidar.watch(distributionJsPath);
  
  watcher.on('change', async (relativeRuta) => {
    
    const ruta = path.resolve(directorioActual, relativeRuta);
    console.log(`Cambios han habido en el archivo: ${ruta}`);
    io.emit("refrescar");

  });

  watcher.on('error', error => {
    console.error('Error en el observador:', error);
  });

  server.listen(options.port, () => {
    console.log(`Servidor escuchando en el puerto ${options.port}`);
  });

};