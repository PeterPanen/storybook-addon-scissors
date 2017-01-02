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
      devices: [],
      selectedDevice: 'none',
      width: 0,
      height: 0,
      rotated: false,
    };
    this.onReceiveDevices = this.onReceiveDevices.bind(this);
  }

  componentDidMount() {
    const { channel } = this.props;
    // Listen for device list.
    channel.on('PeterPanen/storybook-addon-scissors/devices', this.onReceiveDevices);
  }

  onReceiveDevices(devices) {
    const { selectedDevice, rotated } = this.state;

    this.setState({ devices });
    this.onSelectDevice(selectedDevice, rotated);
  }

  onSelectDevice(deviceName, rotated) {
    const { channel } = this.props;
    const { devices } = this.state;

    const device = { rotated, ...(devices.filter(device => device.name === deviceName)[0]) };

    this.setState({ selectedDevice: device ? device.name || 'none' : 'none', rotated });
    channel.emit('PeterPanen/storybook-addon-scissors/carve', device || null);
  }

  toggleRotate() {
    const { selectedDevice, rotated } = this.state;
    this.onSelectDevice(selectedDevice, !rotated);
  }

  render() {
    const { devices, selectedDevice, rotated } = this.state;
    if (!devices.length) return null;

    return (
      <div style={styles.scissorsPanel}>
        <label htmlFor="device">Device </label>
        <select name="device" value={selectedDevice} onChange={(e) => this.onSelectDevice(e.target.value, rotated)}>
          <option value="none">None</option>
          {devices.map(device => <option key={device.name} value={device.name}>{device.name}</option>)}
        </select>
        <br/>
        <br/>
        <label>
          Rotate
          <input
            type="checkbox"
            disabled={selectedDevice === 'none'}
            checked={rotated}
            onChange={() => this.toggleRotate()}
          />
        </label>
        <style dangerouslySetInnerHTML={{__html: `
          iframe {
            width: ${}px !important;
            height: ${}px !important;
          }
        `}}/>
      </div>
    );
  }

  // Cleanup event listeners when unmounting.
  componentWillUnmount() {
    const { channel } = this.props;
    channel.removeListener('PeterPanen/storybook-addon-scissors/devices', this.onReceiveDevices);
  }
}

// Register the addon with a unique name.
addons.register('PeterPanen/storybook-addon-scissors', () => {
  // Add panel with unique name.
  addons.addPanel('PeterPanen/storybook-addon-scissors/panel', {
    title: 'Scissors',
    render: () => (
      <Scissors channel={addons.getChannel()}/>
    ),
  })
})
