# Storybook Addon Scissors
![alt text](https://raw.githubusercontent.com/PeterPanen/storybook-addon-scissors/master/assets/screenshot.png "screenshot")


### Install

```javascript
npm i -D storybook-addon-scissors
```

### Usage
- Create or open `.storybook/addons.js` and register the addon like below.
Provide your own devices or extend from `defaultDevices`.
```javascript
// addons.js
import '@kadira/storybook/addons';
import registerScissors, { defaultDevices } from 'storybook-addon-scissors';

const devices = [
  ...defaultDevices,
  {
    name: 'My Custom Device',
    width: 400,
    height: 400
  }
];

registerScissors(devices);
```
