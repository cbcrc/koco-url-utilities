// Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import configs from 'koco-configs';
import arrayUtilities from 'koco-array-utilities';
import stringUtitilies from 'koco-string-utilities';
import Query from 'koco-query';
import $ from 'jquery';
import koco from 'koco';

var UrlUtilities = function UrlUtilities() {};

UrlUtilities.prototype.urlBase64Decode = function(str) {
  var output = str.replace('-', '+').replace('_', '/');

  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw 'Illegal base64url string!';
  }

  return window.atob(output); //TODO: polifyll https://github.com/davidchambers/Base64.js
};

UrlUtilities.prototype.isSameUrl = function(url1, url2) {
  return cleanUrl(url1) === cleanUrl(url2);
};

UrlUtilities.prototype.url = function(url, baseUrl) {
  baseUrl = (baseUrl || configs.baseUrl).replace(/^\/|\/$/g, '');
  url = url.replace(/^\//g, '');

  if (baseUrl) {
    return '/' + baseUrl + '/' + url;
  }

  return '/' + url;
};

UrlUtilities.prototype.patternWithQueryString = function(url) {
  return this.url(url) + ':?queryString:';
};

UrlUtilities.prototype.getReturnUrl = function(_default) {
  var self = this;
  var result = self.url(_default);

  var context = koco.router.viewModel();

  if (context && context.route) {
    var query = new Query(context.route.url);

    if (query.params.returnTo) {
      result = query.params.returnTo;
    }
  }

  return result || '';
};

UrlUtilities.prototype.joinUrlParts = function() {
  var result = '';
  var urlParts = Array.prototype.slice.call(arguments, 0);

  if (arrayUtilities.isNotEmptyArray(urlParts)) {
    for (var i = 0; i < urlParts.length; i++) {
      var urlPart = urlParts[i];
      var isLast = i == (urlParts.length - 1);

      if (urlPart && !isLast) {
        urlPart = stringUtitilies.trimRight(urlPart, '/');
        urlPart += '/';
      }

      result += urlPart;
    }
  }

  return result;
};

UrlUtilities.prototype.appendParams = function(url, data, traditionalParam) {
  if (!$.isEmptyObject(data)) {
    return `${url}${(url.indexOf('?') >= 0 ? '&' : '?')}${$.param(data, !!traditionalParam)}`;
  }

  return url;
};

function cleanUrl(url) {
  var result = url || '';
  result = result.replace(/#.*$/, '').replace(/^\/|\/$/g, '').toLowerCase();

  return result;
}

export default new UrlUtilities();
