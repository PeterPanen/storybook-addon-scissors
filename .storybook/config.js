import React from 'react';
import { configure, addDecorator } from '@kadira/storybook';
import { Carved, defaultDevices } from '../src/index';

function loadStories() {
  require('../stories/index.js');
}

const devices = [
  {
    name: 'My own device',
    width: 900,
    height: 1400,
  },
  ...defaultDevices
]

addDecorator((story) => (
  <Carved devices={devices}>
    {story()}
  </Carved>
));

configure(loadStories, module);
