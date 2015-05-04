# koco-url-utilities
URL utilities to be used with a [KOCO](https://github.com/cbcrc/generator-koco) project.

[See API reference](https://github.com/cbcrc/koco-url-utilities/wiki/API-reference-documentation)

## Installation

```bash
bower install koco-url-utilities
```

## Usage with KOCO

This is a shared module that is used in many other module. The convention is to configure an alias in the `require.configs.js` with the name `url-utilities` like so:

```javascript
paths: {
  ...
  'url-utilities': 'bower_components/koco-url-utilities/src/url-utilities'
  ...
}
```

### The configuration file

This module uses the `configs` object and will be using a property named `baseUrl`.

```javascript
{
	baseUrl: '/base-url-for-my-app/' // Note the leading and trailing slashes.
}
```