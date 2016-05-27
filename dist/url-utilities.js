(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'koco-configs', 'koco-array-utilities', 'koco-string-utilities', 'koco-query'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('koco-configs'), require('koco-array-utilities'), require('koco-string-utilities'), require('koco-query'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.kocoConfigs, global.kocoArrayUtilities, global.kocoStringUtilities, global.kocoQuery);
        global.urlUtilities = mod.exports;
    }
})(this, function (exports, _kocoConfigs, _kocoArrayUtilities, _kocoStringUtilities, _kocoQuery) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _kocoConfigs2 = _interopRequireDefault(_kocoConfigs);

    var _kocoArrayUtilities2 = _interopRequireDefault(_kocoArrayUtilities);

    var _kocoStringUtilities2 = _interopRequireDefault(_kocoStringUtilities);

    var _kocoQuery2 = _interopRequireDefault(_kocoQuery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    // Copyright (c) CBC/Radio-Canada. All rights reserved.
    // Licensed under the MIT license. See LICENSE file in the project root for full license information.

    var UrlUtilities = function UrlUtilities() {};

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
        baseUrl = (baseUrl || _kocoConfigs2.default.baseUrl).replace(/^\/|\/$/g, '');
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

        var context = router.viewModel();

        if (context && context.route) {
            var query = new _kocoQuery2.default(context.route.url);

            if (query.params.returnTo) {
                result = query.params.returnTo;
            }
        }

        return result || '';
    };

    UrlUtilities.prototype.joinUrlParts = function () {
        var result = '';
        var urlParts = Array.prototype.slice.call(arguments, 0);

        if (_kocoArrayUtilities2.default.isNotEmptyArray(urlParts)) {
            for (var i = 0; i < urlParts.length; i++) {
                var urlPart = urlParts[i];
                var isLast = i == urlParts.length - 1;

                if (urlPart && !isLast) {
                    urlPart = _kocoStringUtilities2.default.trimRight(urlPart, '/');
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
});