import React from 'react';
import { connect } from 'react-redux';
import '../styles/title.scss';

const Title = (props) => {
    return (
        <div className="title">
            <h1>{props.text}</h1>
        </div>
    )
}

export default connect(
)(Title);