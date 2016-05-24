'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _configs = require('configs');

var _configs2 = _interopRequireDefault(_configs);

var _router = require('router');

var _router2 = _interopRequireDefault(_router);

var _arrayUtilities = require('array-utilities');

var _arrayUtilities2 = _interopRequireDefault(_arrayUtilities);

var _stringUtilities = require('string-utilities');

var _stringUtilities2 = _interopRequireDefault(_stringUtilities);

var _query = require('query');

var _query2 = _interopRequireDefault(_query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UrlUtilities = function UrlUtilities() {}; // Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

UrlUtilities.prototype.urlBase64Decode = function (str) {
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

UrlUtilities.prototype.isSameUrl = function (url1, url2) {
    return cleanUrl(url1) === cleanUrl(url2);
};

UrlUtilities.prototype.url = function (url, baseUrl) {
    baseUrl = (baseUrl || _configs2.default.baseUrl).replace(/^\/|\/$/g, '');
    url = url.replace(/^\//g, '');

    if (baseUrl) {
        return '/' + baseUrl + '/' + url;
    }

    return '/' + url;
};

UrlUtilities.prototype.patternWithQueryString = function (url) {
    return this.url(url) + ':?queryString:';
};

UrlUtilities.prototype.getReturnUrl = function (_default) {
    var self = this;
    var result = self.url(_default);

    var context = _router2.default.viewModel();

    if (context && context.route) {
        var query = new _query2.default(context.route.url);

        if (query.params.returnTo) {
            result = query.params.returnTo;
        }
    }

    return result || '';
};

UrlUtilities.prototype.joinUrlParts = function () {
    var result = '';
    var urlParts = Array.prototype.slice.call(arguments, 0);

    if (_arrayUtilities2.default.isNotEmptyArray(urlParts)) {
        for (var i = 0; i < urlParts.length; i++) {
            var urlPart = urlParts[i];
            var isLast = i == urlParts.length - 1;

            if (urlPart && !isLast) {
                urlPart = _stringUtilities2.default.trimRight(urlPart, '/');
                urlPart += '/';
            }

            result += urlPart;
        }
    }

    return result;
};

function cleanUrl(url) {
    var result = url || '';
    result = result.replace(/#.*$/, '').replace(/^\/|\/$/g, '').toLowerCase();

    return result;
}

exports.default = new UrlUtilities();