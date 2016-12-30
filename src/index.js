import React, { Component } from 'react';
import addons from '@kadira/storybook-addons';

const carvedOuterStyle = {
  position: 'relative',
  margin: '0 auto',
  padding: 24,
  fontFamily: 'sans-serif',
  fontSize: 12,
  color: '#999',
  transition: 'all 400ms',
}

const carvedStyle = {
  margin: '0 auto',
  border: '1px solid #ccc',
  overflow: 'auto',
  transition: 'all 400ms',
}

export class Carved extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: undefined,
      height: undefined,
      rotated: false,
    }
    this.carve = this.carve.bind(this);
  }

  componentDidMount() {
    const { devices } = this.props;
    const channel = addons.getChannel();

    // Listen for events from the panel.
    channel.on('PeterPanen/storybook-addon-scissors/carve', this.carve);

    // Emit devices to the panel.
    channel.emit('PeterPanen/storybook-addon-scissors/devices', devices);
  }

  componentWillUnmount() {
    const { devices } = this.props;
    const channel = addons.getChannel();

    channel.removeListener('PeterPanen/storybook-addon-scissors/carve', this.carve);
  }

  carve(device) {
    if (device) {
      this.setState({ width: device.width, height: device.height, rotated: device.rotated });
    } else {
      this.setState({ width: undefined, height: undefined, rotated: false });
    }
  }

  render() {
    const { children } = this.props;
    const { width, height, rotated } = this.state;

    if (!width) return children;

    const style = rotated ?
      { width: height, height: width, ...carvedStyle }
    :
      { width, height, ...carvedStyle };

    return (
      <div style={{ width: style.width, ...carvedOuterStyle }}>
        <div style={{ position: 'absolute', left: 24, right: 24, top: -4, height: 12, borderBottom: '1px dashed #ccc', textAlign: 'center', paddingBottom: 4, transition: 'all 400ms' }}>{style.width}px</div>
        <div style={{ position: 'absolute', left: -29, top: 24, bottom: 24, width: 40, borderRight: '1px dashed #ccc', transition: 'all 400ms' }}><span style={{ position: 'relative', top: '50%', transform: 'translateY(-50%)' }}>{style.height}px</span></div>
        <div style={style}>{children}</div>
      </div>
    );
  }
}

export defaultDevices from './devices';
