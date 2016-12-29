import React from 'react';
import { configure, addDecorator } from '@kadira/storybook';
import { Carved, defaultDevices } from '../src/index';

function loadStories() {
  require('../stories/index.js');
}

const devices = [
  {
    name: 'Test device',
    width: 400,
    height: 400,
  },
  ...defaultDevices
]

addDecorator((story) => (
  <Carved devices={devices}>
    {story()}
  </Carved>
));

configure(loadStories, module);
