import React, { Component } from 'react';
import addons from '@storybook/addons';
import Toggle from 'react-toggle';
import Select from './Select';
import './main.css';

class Scissors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDevice: null,
      rotated: false,
    };
  }

  onSelectDevice = device => {
    this.setState({ selectedDevice: device });
  };

  toggleRotate = () => this.setState(state => ({ rotated: !state.rotated }));

  render() {
    const { selectedDevice, rotated } = this.state;
    const { devices } = this.props;

    const isEnabled = selectedDevice !== null;
    const deviceWidth = selectedDevice
      ? rotated
        ? Number.parseInt(selectedDevice.height)
        : Number.parseInt(selectedDevice.width)
      : 0;
    const deviceHeight = selectedDevice
      ? rotated
        ? Number.parseInt(selectedDevice.width)
        : Number.parseInt(selectedDevice.height)
      : 0;

    return (
      <div className="storybook-addon-scissors scissors-panel">
        <label>Device</label>
        <Select
          selectedDevice={selectedDevice}
          devices={devices}
          onChange={this.onSelectDevice}
        />
        <div className="storybook-addon-scissors-rotate">
          <label htmlFor="storybook-addon-scissors-rotate-toggle">Rotate</label>
          <Toggle
            id="storybook-addon-scissors-rotate-toggle"
            defaultChecked={rotated}
            onChange={this.toggleRotate}
            disabled={!isEnabled}
          />
        </div>
        {isEnabled && (
          <style
            dangerouslySetInnerHTML={{
              __html: `
            #storybook-preview-iframe {
              display: block !important;
              background: #fff !important;
              margin: 40px auto !important;
              width: ${deviceWidth}px !important;
              height: ${deviceHeight}px !important;
              box-shadow: 0 2px 6px 0px #cccccc;
              transition: all 200ms !important;
            }
            .Pane.horizontal.Pane1 > div > div, .Pane.vertical.Pane2 .SplitPane .Pane.vertical.Pane1 > div > div {
              overflow: auto !important;
              background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAAAAACo4kLRAAAAF0lEQVR4AWP4CQf/4WBoCyKYCOkhLQgAFBGJ0NmZHwYAAAAASUVORK5CYII=) !important;
            }
          `,
            }}
          />
        )}
      </div>
    );
  }
}

export default devices => {
  addons.register('PeterPanen/storybook-addon-scissors', () => {
    // Add panel with unique name.
    addons.addPanel('PeterPanen/storybook-addon-scissors/panel', {
      title: 'Scissors',
      render: () => (
        <Scissors devices={devices} channel={addons.getChannel()} />
      ),
    });
  });
};
