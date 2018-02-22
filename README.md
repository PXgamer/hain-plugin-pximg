# hain-plugin-pximg
[Hain](https://github.com/appetizermonster/hain) plugin to search PXIMG.  

[![Release Version](https://img.shields.io/github/release/pxgamer/hain-plugin-pximg.svg?maxAge=2592000)](https://github.com/PXgamer/hain-plugin-pximg/releases)
[![NPM Downloads](https://img.shields.io/npm/dt/hain-plugin-pximg.svg?maxAge=2592000)](https://www.npmjs.com/package/hain-plugin-pximg)
[![Dependency Statuses](https://img.shields.io/librariesio/github/pxgamer/hain-plugin-pximg.svg?maxAge=2592000)](https://libraries.io/npm/hain-plugin-pximg)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

## Install

Type this in the Hain input:
```
/hpm install pximg
```

First you'll need to get your API key from the [settings](https://pximg.xyz/settings/) page, this allows you to use the API for getting details. (Please note the API key in these images does not exist.)
![Get the API Key](https://cdn.pximg.xyz/02a1dc05946faac9193935b415f0f294.png)

Next you'll need to enter your API key into the Preferences in Hain. This can be done by typing `/preferences` and then entering your API key in the `hain-plugin-pximg` tab. (Preference changing is broken in Hain v0.5.0 so, either use v0.4.1, or change it manually in the `%localappdata%\hain-user\plugins\hain-plugin-pximg\preferences.json` file.)
![Enter the API key into Hain](https://cdn.pximg.xyz/32cd07597f0ff7a99b176be9d0177179.png)

Now you're ready to use the plugin.

## Usage

Type /px followed by your image id, then select to go to that image:
```
/px 5316
```

You can also check your winnings on the site by using:
```
/px winnings
```

![Example](https://cdn.pximg.xyz/382bec1b2d1c8ea01ce7e442a530f57e.gif)
