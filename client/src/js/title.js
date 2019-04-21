import React from 'react';
import { connect } from 'react-redux';
import { titleMap } from '../constants';
import { getPage } from '../redux/selectors';
import '../styles/title.scss';

const Title = ({ page }) => {
    return (
        <div className="title">
            <h1>{titleMap.get(page)}</h1>
        </div>
    )
}

export default connect(
    state => ({ page: getPage(state, 'title') })
)(Title);