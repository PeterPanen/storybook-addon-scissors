import React from 'react';
import addons from '@kadira/storybook-addons';

export class Carved extends React.Component {
  render() {
    const { children, notes } = this.props;
    const channel = addons.getChannel();

    // send the notes to the channel.
    channel.emit('PeterPanen/storybook-addon-scissors/carve', notes);
    // return children elements.
    return children;
  }
}
