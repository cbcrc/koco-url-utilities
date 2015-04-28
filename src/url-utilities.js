define(['configs', 'lodash', 'router', 'array-utilities', 'string-utilities'],
    function(configs, _, router, arrayUtilities, stringUtitilies) {
        'use strict';

        var UrlUtilities = function UrlUtilities() {};

        UrlUtilities.prototype.url = function(url, baseUrl) {
            var baseUrl = (baseUrl || configs.baseUrl).replace(/^\/|\/$/g, '');
            url = url.replace(/^\//g, '');

            return '/' + baseUrl + '/' + url;
        };

        UrlUtilities.prototype.patternWithQueryString = function(url) {
            return this.url(url) + ':?queryString:';
        };

        UrlUtilities.prototype.getReturnUrl = function(_default) {
            var self = this;

            var context = router.context();
            var result =  self.url(_default);

            if (context && context.route.query.returnTo) {
                result = context.route.query.returnTo;
            }

            return result || '';
        };

        UrlUtilities.prototype.joinUrlParts = function () {
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

        return new UrlUtilities();
    });
