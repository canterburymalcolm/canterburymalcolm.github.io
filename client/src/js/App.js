import React from 'react';
import { connect } from 'react-redux'
import Sidebar from './sidebar';
import Content from './content';
import '../styles/App.scss';
import { getPage } from '../redux/selectors';

const App = ({ page }) => {
    return (
      <div className="designer-baby-site">
        <Sidebar key={page}/>
        <Content />
      </div>
    )
}

export default connect(
  state => ({ page: getPage(state) })
)(App);
