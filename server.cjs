const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const files = new Set(['index.html', 'edu.html', 'expelab.html', 'habi.html', 'DSCN7936.JPG']);
const port = Number(process.env.PORT || 5173);
http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  const file = pathname === '/' ? 'index.html' : pathname.slice(1);
  if (!files.has(file)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Página no encontrada');
    return;
  }
  fs.readFile(path.join(__dirname, file), (error, data) => {
    if (error) {
      res.writeHead(500);
      res.end('No se pudo cargar el archivo');
      return;
    }
    res.writeHead(200, { 'Content-Type': file.endsWith('.html') ? 'text/html; charset=utf-8' : 'image/jpeg' });
    res.end(data);
  });
}).listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}`));
