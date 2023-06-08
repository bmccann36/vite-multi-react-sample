import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
// import Clock from './shared/Clock';
import { store } from '../../store.js';
import { Link } from 'react-router-dom';

store.subscribe(() => {
  console.log('Counter:', store.getState());
});

import ThemeContext from '../../ThemeContext';

class AboutSection extends Component {
  componentDidMount() {
    // The modern app is wrapped in StrictMode,
    // but the legacy bits can still use old APIs.
    // eslint-disable-next-line react/no-find-dom-node
    findDOMNode(this);
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {theme => (
          <div style={{ border: '1px dashed black', padding: 20 }}>
            <h3>src/legacy/Greeting.js</h3>
            <h4 style={{ color: theme }}>
              This component is rendered by the nested React ({React.version}).
            </h4>
            {/*<Clock />*/}
            <p>
              Counter: {this.props.counter}{' '}
              <button onClick={() => this.props.dispatch({ type: 'increment' })}>
                +
              </button>
            </p>
            <b>
              <Link to="/">Go to Home</Link>
            </b>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}


function mapStateToProps(state) {
  return { counter: state };
}

export default connect(mapStateToProps)(AboutSection);
