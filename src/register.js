import React, { Component } from 'react';
import addons from '@kadira/storybook-addons';

const styles = {
  scissorsPanel: {
    margin: 10,
    fontFamily: 'Arial',
    fontSize: 14,
    color: '#444',
    width: '100%',
    overflow: 'auto',
  }
};

class Scissors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: props.devices,
      selectedDeviceName: 'none',
      rotated: false,
    };
  }

  onSelectDevice(deviceName, rotated) {
    const { channel } = this.props;
    const { devices } = this.state;
    const device = { rotated, ...(devices.filter(device => device.name === deviceName)[0]) };

    this.setState({ selectedDeviceName: device ? device.name || 'none' : 'none', rotated });
  }

  toggleRotate() {
    const { selectedDeviceName, rotated } = this.state;
    this.onSelectDevice(selectedDeviceName, !rotated);
  }

  render() {
    const { devices, selectedDeviceName, rotated } = this.state;

    const selectedDevice = devices.filter(({name}) => name === selectedDeviceName)[0];
    const isEnabled = selectedDeviceName !== 'none';
    const deviceWidth = selectedDevice ? (rotated ? selectedDevice.height : selectedDevice.width) : 0;
    const deviceHeight = selectedDevice ? (rotated ? selectedDevice.width : selectedDevice.height) : 0;

    return (
      <div style={styles.scissorsPanel}>
        <label htmlFor="device">Device </label>
        <select name="device" value={selectedDeviceName} onChange={(e) => this.onSelectDevice(e.target.value, rotated)}>
          <option value="none">None</option>
          {devices.map(device => <option key={device.name} value={device.name}>{device.name}</option>)}
        </select>
        <br/>
        <br/>
        <label>
          Rotate
          <input
            type="checkbox"
            disabled={selectedDeviceName === 'none'}
            checked={rotated}
            onChange={() => this.toggleRotate()}
          />
        </label>
        {isEnabled && (
          <style dangerouslySetInnerHTML={{__html: `
            #storybook-preview-iframe {
              display: block !important;
              background: #fff !important;
              margin: 40px auto !important;
              width: ${deviceWidth}px !important;
              height: ${deviceHeight}px !important;
              box-shadow: 0px 0px 8px 1px #d2d2d2;
              transition: all 200ms !important;
            }
            .Pane.horizontal.Pane1 > div > div {
              overflow: auto !important;
              background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAAAAACo4kLRAAAAF0lEQVR4AWP4CQf/4WBoCyKYCOkhLQgAFBGJ0NmZHwYAAAAASUVORK5CYII=) !important;
            }
          `}}/>
        )}
      </div>
    );
  }
}

export default (devices) => {
  addons.register('PeterPanen/storybook-addon-scissors', () => {
    // Add panel with unique name.
    addons.addPanel('PeterPanen/storybook-addon-scissors/panel', {
      title: 'Scissors',
      render: () => (
        <Scissors devices={devices} channel={addons.getChannel()}/>
      ),
    })
  })
}

export defaultDevices from './devices';
