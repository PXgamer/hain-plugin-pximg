# hain-plugin-pximg

[![Release Version](https://img.shields.io/npm/v/hain-plugin-pximg.svg)](https://www.npmjs.com/package/hain-plugin-pximg)
[![NPM Downloads](https://img.shields.io/npm/dt/hain-plugin-pximg.svg?maxAge=2592000)](https://www.npmjs.com/package/hain-plugin-pximg)
[![Dependency Statuses](https://img.shields.io/librariesio/github/pxgamer/hain-plugin-pximg.svg?maxAge=2592000)](https://libraries.io/npm/hain-plugin-pximg)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

[Hain](https://github.com/appetizermonster/hain) plugin to search PXIMG.

## Install

Type this in the Hain input:
```
/hpm install pximg
```

First you'll need to get your API key from the *Settings* page, this allows you to use the API for getting details.

Next you'll need to enter your API key into the Preferences in Hain. This can be done by typing `/preferences` and then entering your API key in the `hain-plugin-pximg` tab.

**Note:** Preference changing is broken in Hain v0.5.0 so, either use v0.4.1, or change it manually in the `%localappdata%\hain-user\plugins\hain-plugin-pximg\preferences.json` file.

Now you're ready to use the plugin.

## Usage

Type `/px` followed by your image id, then select to go to that image:

```
/px 5316
```

You can also check your winnings on the site by using:

```
/px winnings
```
