import React, { Component } from 'react';
import Sidebar from './sidebar';
import Content from './content';
import '../styles/App.scss';

class App extends Component {
  render() {
    return (
      <div className="designer-baby-site">
        <Sidebar />
        <Content />
      </div>
    );
  }
}

export default App;
