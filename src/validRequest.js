const fs = require('fs');

function validRequest(url, filePath) {
  const res = { errorCode: 200, errorMessage: 'success' };

  if (url.includes('..')) {
    res.errorCode = 400;
    res.errorMessage = 'traversal path';
  }

  if (url.includes('//')) {
    res.errorCode = 404;
    res.errorMessage = 'path have duplicated slashes';
  }

  if (!fs.existsSync(`public/${filePath}`)) {
    res.errorCode = 404;
    res.errorMessage = 'non-existent file';
  }

  return res;
}

module.exports = {
  validRequest,
};
