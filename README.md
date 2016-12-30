# Storybook Addon Scissors
![alt text](https://raw.githubusercontent.com/PeterPanen/storybook-addon-scissors/master/assets/screenshot.png "screenshot")

### Install

```javascript
npm i -D storybook-addon-scissors
```

### Usage
1. Create or open `.storybook/addons.js` and register the addon like below.
```javascript
// addons.js
import '@kadira/storybook/addons';
import 'storybook-addon-scissors/register';
```
2. Add the `Carved` component as a global decorator in `.storybook/config.js` like below. Provide your own devices or extend from `defaultDevices`.
```javascript
// config.js
import React from 'react';
import { configure, addDecorator } from '@kadira/storybook';
import { Carved, defaultDevices } from 'storybook-addon-scissors';

function loadStories() {
  require('../stories/index.js');
}

const devices = [
  ...defaultDevices,
  {
    name: 'My own device',
    width: 400,
    height: 400,
  }
]

addDecorator((story) => (
  <Carved devices={devices}>
    {story()}
  </Carved>
));

configure(loadStories, module);

```
