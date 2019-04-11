import React, { Component } from 'react';
import FooterButton from './buttons/footer-button';
import '../styles/footer.scss'

class Footer extends Component {

    render() {
        return (
            <div className="footer">
                <FooterButton first={true}/>
                <FooterButton/>
            </div>
        )
    }
}

export default Footer;