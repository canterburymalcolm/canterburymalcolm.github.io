import React, { Component } from 'react';
import bubble from '../assets/user-info-bubble.png';
import '../styles/sidebar.scss';

class Sidebar extends Component {
    render () {
        return (
            <div className="sidebar">
                <div className="bubbles">
                    <img alt="" src={bubble}></img>
                </div>
            </div>
        )
    }
}

export default Sidebar;