import React, { Component } from 'react';
import addons from '@kadira/storybook-addons';

const rulerStyles = {
  fontFamily: 'sans-serif',
  position: 'absolute',
  fontSize: 12,
  color: '#999',
  transition: 'all 400ms',
}

const styles = {
  carvedOuterStyles: {
    position: 'relative',
    margin: '0 auto',
    padding: 24,
    transition: 'all 400ms',
  },
  carvedStyles: {
    margin: '0 auto',
    border: '1px solid #ccc',
    overflow: 'auto',
    transition: 'all 400ms',
  },
  rulerTopStyles: {
    ...rulerStyles,
    left: 24,
    right: 24,
    top: -4,
    height: 12,
    borderBottom: '1px dashed #ccc',
    textAlign: 'center',
    paddingBottom: 4,
  },
  rulerLeftStyles: {
    ...rulerStyles,
    left: -29,
    top: 24,
    bottom: 24,
    width: 40,
    borderRight: '1px dashed #ccc',
  }
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

    const newStyles = rotated ?
      { width: height, height: width, ...styles.carvedStyles }
    :
      { width, height, ...styles.carvedStyles };

    return (
      <div style={{ width: newStyles.width, ...styles.carvedOuterStyles }}>
        <div style={styles.rulerTopStyles}>{newStyles.width}px</div>
        <div style={styles.rulerLeftStyles}><span style={{ position: 'relative', top: '50%', transform: 'translateY(-50%)' }}>{newStyles.height}px</span></div>
        <div style={newStyles}>{children}</div>
      </div>
    );
  }
}

export defaultDevices from './devices';
