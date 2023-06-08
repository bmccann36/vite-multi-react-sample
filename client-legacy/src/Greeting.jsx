import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ThemeContext from '../../ThemeContext.jsx';
// import Clock from './shared/Clock';
import { store } from '../../store.js';
import PropTypes from 'prop-types';

store.subscribe(() => {
  console.log('Counter:', store.getState());
});

class AboutSection extends Component {
  componentDidMount() {
    // The modern app is wrapped in StrictMode,
    // but the legacy bits can still use old APIs.
    // eslint-disable-next-line react/no-find-dom-node
    findDOMNode(this);
  }

  render() {
    return (
      <>
        <h3>THIS IS A LEGACY COMPONENT</h3>
      </>
    );
  }
}


function mapStateToProps(state) {
  return { counter: state };
}

export default connect(mapStateToProps)(AboutSection);
