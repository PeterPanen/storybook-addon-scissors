**:warning: WARNING: This repo is no longer maintained!:warning:**

# Storybook Addon Scissors

![alt text](https://raw.githubusercontent.com/PeterPanen/storybook-addon-scissors/master/assets/screenshot.png 'screenshot')

> Requires storybook version 3+

### Install

```javascript
npm i -D storybook-addon-scissors
```

### Usage

* Download and import device list from [ChromeDevTools devices](https://github.com/ChromeDevTools/devtools-frontend/blob/master/front_end/emulated_devices/module.json) (or bring your own with instructions below)
* Create or open `.storybook/addons.js` and register the addon like below.

```javascript
// addons.js
import '@storybook/addon-actions/register';
import registerScissors from 'storybook-addon-scissors';
import devicesJSON from './devices.json';

// registerScissors() takes an array of device objects with the following signature:
// [{
//   uid: String (must be unique)
//   title: String
//   width: Number
//   height: Number
// }]
// In the case of using the device list from ChromeDevTools,
// we can map them the following way.
const devices = devicesJSON.extensions.map(({ device }) => ({
  uid: device.title,
  title: device.title,
  width: device.screen.vertical.width,
  height: device.screen.vertical.height,
}));

registerScissors(devices);
```
