const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs/promises');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    let filePath = path.resolve(__dirname, 'index.html');

    const fileExists = await fs.stat(filePath).catch((e) => false);

    if (!fileExists) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end(`
              <html>
                <body>
                  <h3>Page not found</h3>
                </body>
              </html>`);
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      const indexFile = await fs.readFile(filePath);
      res.write(indexFile);
      res.end();
    }
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
