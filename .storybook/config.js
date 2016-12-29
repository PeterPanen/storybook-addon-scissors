import React from 'react';
import { configure, addDecorator } from '@kadira/storybook';
import { Carved } from '../src/index';

function loadStories() {
  require('../stories/index.js');
}

const devices = [
  {
    name: 'iPhone 6',
    width: 375,
    height: 667,
    dpr: 2,
  },
  {
    name: 'iPhone 5',
    width: 320,
    height: 568,
    dpr: 2,
  },
];
addDecorator((story) => (
  <Carved devices={devices}>
    {story()}
  </Carved>
));

configure(loadStories, module);
