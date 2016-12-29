import React from 'react';
import addons from '@kadira/storybook-addons';

const carvedStyle = {
  margin: '0 auto',
  border: '1px solid #333',
}

export class Carved extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: undefined,
      height: undefined,
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
      this.setState({ width: device.width, height: device.height });
    } else {
      this.setState({ width: undefined, height: undefined });
    }
  }

  render() {
    const { children } = this.props;
    const { width, height } = this.state;

    const style = width ? { width, height, ...carvedStyle } : {};

    return (
      <div style={style}>{children}</div>
    );
  }
}
