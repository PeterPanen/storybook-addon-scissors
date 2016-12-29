import React from 'react';
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

class Scissors extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {text: ''};
    this.onAddNotes = this.onAddNotes.bind(this);
  }

  onAddNotes(text) {
    this.setState({text});
  }

  componentDidMount() {
    const { channel, api } = this.props;
    // Listen to the notes and render it.
    channel.on('PeterPanen/storybook-addon-scissors/carve', this.onAddNotes);

    // Clear the current notes on every story change.
    this.stopListeningOnStory = api.onStory(() => {
      this.onAddNotes('');
    });
  }

  render() {
    const { text } = this.state;
    const textAfterFormatted = text? text.trim().replace(/\n/g, '<br />') : "";

    return (
      <div style={styles.notesPanel}>
        <div dangerouslySetInnerHTML={{__html: textAfterFormatted}} />
      </div>
    );
  }

  // This is some cleanup tasks when the Notes panel is unmounting.
  componentWillUnmount() {
    if(this.stopListeningOnStory) {
      this.stopListeningOnStory();
    }

    this.unmounted = true;
    const { channel, api } = this.props;
    channel.removeListener('PeterPanen/storybook-addon-scissors/carve', this.onAddNotes);
  }
}

// Register the addon with a unique name.
addons.register('PeterPanen/storybook-addon-scissors', (api) => {
  // Also need to set a unique name to the panel.
  addons.addPanel('PeterPanen/storybook-addon-scissors/panel', {
    title: 'Scissors',
    render: () => (
      <Notes channel={addons.getChannel()} api={api}/>
    ),
  })
})
