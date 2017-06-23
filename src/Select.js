import React, { Component } from 'react';
import VirtualizedSelect from 'react-virtualized-select'
import 'react-select/dist/react-select.css';

const optionRenderer = ({ option, style, selectValue }) => (
  <div className="storybook-addon-scissors option" onClick={() => selectValue(option)} style={style} key={option['Device Name'] + option['OS Version']}>
    <span className="storybook-addon-scissors col name">{option['Device Name']}</span>
    <span className="storybook-addon-scissors col width">{option['Portrait Width']} W</span>
    <span className="storybook-addon-scissors col height">{option['Landscape Width']} H</span>
  </div>
);

const valueRenderer = option => (
  <div className="storybook-addon-scissors value">
    <span className="storybook-addon-scissors col name">{option['Device Name']}</span>
    <span className="storybook-addon-scissors col width">{option['Portrait Width']} W</span>
    <span className="storybook-addon-scissors col height">{option['Landscape Width']} H</span>
  </div>
);

export default ({ selectedDevice, devices, onChange }) => (
  <VirtualizedSelect
    value={selectedDevice ? selectedDevice['Device Name'] : 'None'}
    options={devices}
    onChange={onChange}
    valueKey='Device Name'
    optionRenderer={optionRenderer}
    valueRenderer={valueRenderer}
  />
);
