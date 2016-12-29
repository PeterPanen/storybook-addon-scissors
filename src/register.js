import React, { Component } from 'react';
import addons from '@kadira/storybook-addons';

const styles = {
  notesPanel: {
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
    };
    this.onReceiveDevices = this.onReceiveDevices.bind(this);
  }

  componentDidMount() {
    const { channel, api } = this.props;
    // Listen for device list.
    channel.on('PeterPanen/storybook-addon-scissors/devices', this.onReceiveDevices);

    // Clear the current device list on every story change.
    this.stopListeningOnStory = api.onStory(() => this.onReceiveDevices([]));
  }

  onReceiveDevices(devices) {
    const { selectedDevice } = this.state;

    this.setState({ devices });
    this.onSelectDevice(selectedDevice);
  }

  onSelectDevice(deviceName) {
    const { channel } = this.props;
    const { devices } = this.state;

    const device = devices.filter(device => device.name === deviceName)[0];

    this.setState({ selectedDevice: device ? device.name : 'none' });
    channel.emit('PeterPanen/storybook-addon-scissors/carve', device || null);
  }

  render() {
    const { devices, selectedDevice } = this.state;
    if (!devices.length) return null;

    return (
      <div style={styles.notesPanel}>
        <label htmlFor="device">Device </label>
        <select name="device" value={selectedDevice} onChange={(e) => this.onSelectDevice(e.target.value)}>
          <option value="none">None</option>
          {devices.map(device => <option key={device.name} value={device.name}>{device.name}</option>)}
        </select>
      </div>
    );
  }

  // Cleanup event listeners when unmounting.
  componentWillUnmount() {
    const { channel } = this.props;

    if(this.stopListeningOnStory) {
      this.stopListeningOnStory();
    }

    channel.removeListener('PeterPanen/storybook-addon-scissors/devices', this.onReceiveDevices);
  }
}

// Register the addon with a unique name.
addons.register('PeterPanen/storybook-addon-scissors', (api) => {
  // Also set a unique name for the panel.
  addons.addPanel('PeterPanen/storybook-addon-scissors/panel', {
    title: 'Scissors',
    render: () => (
      <Scissors channel={addons.getChannel()} api={api}/>
    ),
  })
})
