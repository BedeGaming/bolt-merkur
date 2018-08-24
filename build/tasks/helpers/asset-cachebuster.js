'use strict';

var through = require('through2');
var interpolate = require('interpolate');

function isCss(filepath) {
  return (/\.css$/).test(filepath);
}

function bust(buster, url) {
  return (typeof buster === 'function') ? buster(url) : buster;
}

function replace(replacer, options) {
  return function _replace(match, p1) {
    if (!options.ignore.some(function(ignore) { return match.indexOf(ignore) > -1; })) {
      return interpolate(replacer, { p1: p1, buster: bust(options.buster, p1) });
    } else {
      return match;
    }
  };
}

function cacheBustCss(css, options) {
  var img = /url\(['"]?(?!data:)([^)'"?]+)['"]?(?:\?v=[0-9]+)*\)/gi;
  return css.replace(img, replace('url({p1}?v={buster})', options));
}

function cacheBustHtml(html, options) {
  var css = /href="(.+\.css)"/gi;
  html = html.replace(css, replace('href="{p1}?v={buster}"', options));

  var cssVersion = /{{CACHE_BUST}}/gi;
  html = html.replace(cssVersion, replace('{buster}', options));

  var js = /src="(.+\.js)"/gi;
  html = html.replace(js, replace('src="{p1}?v={buster}"', options));

  var images = /src="(.+\.(?:png|gif|jpg|jpeg))"/gi;
  html = html.replace(images, replace('src="{p1}?v={buster}"', options));
  return html;
}

function cacheBust(file, enc, options) {
  if (isCss(file.path)) {
    file.contents = new Buffer(cacheBustCss(file.contents.toString(), options), enc);
  } else {
    file.contents = new Buffer(cacheBustHtml(file.contents.toString(), options), enc);
  }
}

module.exports = function(options) {
  return through.obj(function(file, enc, callback) {
    options = options || {};
    options.buster = options.buster || Date.now();
    options.ignore = options.ignore || [];

    // Pass file through if:
    // - file has no contents
    // - file is a directory
    if (file.isNull() || file.isDirectory()) {
      this.push(file);
      return callback();
    }

    if (file.isBuffer()) {
      cacheBust(file, enc, options);

      this.push(file);
      return callback();
    }
  });
};
