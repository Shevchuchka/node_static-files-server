'use strict';

const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');

// const PREFIX = '/file';

function createServer() {
  const server = http.createServer((req, res) => {
    const requestPrefix = '/file';

    res.setHeader('Content-Type', 'text/plain');

    const { pathname } = new URL(req.url, `http://${req.headers.host}`);

    if (pathname.includes('//')) {
      res.writeHead(404, 'paths have duplicated slashes');

      res.end(
        `Please, use next format: http://${req.headers.host}${PREFIX}/<path_to_your_file>`,
      );

      return;
    }

    if (!pathname.startsWith(requestPrefix)) {
      res.writeHead(400, 'Bad request');

      res.end(
        `Please, use next format: http://${req.headers.host}${PREFIX}/<path_to_your_file>`,
      );

      return;
    }

    const fileName = path.join(
      'public',
      pathname === requestPrefix || pathname === `${requestPrefix}/`
        ? 'index.html'
        : pathname.replace(requestPrefix, ''),
    );

    fs.readFile(fileName, (err, data) => {
      if (err) {
        res.writeHead(404, 'Not Found');
        res.end(`404 Not Found`);

        return;
      }

      res.statusCode = 200;
      res.statusMessage = 'OK';

      if (!pathname.startsWith('/file/')) {
        res.statusMessage = 'route not starting with /file/';
      }

      res.end(data);
    });
  });

  return server;
}

module.exports = {
  createServer,
};
