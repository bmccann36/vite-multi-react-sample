

import React from 'react_v16';
import { Component } from 'react_v16';
import { findDOMNode } from 'react-dom_v16';
import { connect } from 'react-redux_v4';
import { store } from '../../store.js';

import ThemeContext from '../../ThemeContext';
import { Link } from 'react-router-dom';
// import Clock from './shared/Clock';

store.subscribe(() => {
  console.log('Counter:', store.getState());
});

class AboutSection extends Component {
  componentDidMount() {
    // The modern app is wrapped in StrictMode,
    // but the legacy bits can still use old APIs.
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
