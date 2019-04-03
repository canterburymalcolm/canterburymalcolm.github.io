import React from 'react';
import { connect } from 'react-redux';
import Button from './button';
import { logIn, nextPage, prevPage } from '../../redux/actions';
import { getPage } from '../../redux/selectors';
import { PAGES } from '../../constants';
import '../../styles/buttons.scss';


const FooterButton = (props) => {

    const renderButton = () => {
        let className;
        let desc;
        const onClick = props.first ? () => props.prevPage() : () => props.nextPage();

        if (props.first) {
            if (props.page === PAGES.LANDING) {
                return <p>Already a user?
                        <span onClick={() => props.logIn()}> Log in</span>
                </p>
            } else {
                className = "secondary"
                desc = "Back"
            }
        } else {
            className = "primary"
            if (props.page === PAGES.LANDING) {
                desc = "Sign Up"

            } else {
                desc = "Next"
            }
        }
        return <Button
            className={className}
            desc={desc}
            onClick={onClick}
        />
    }
    const position = props.first ? 'first' : 'second';
    return (
        <div className={"footer-button " + position}>
            {renderButton()}
        </div>
    )
}

export default connect(
    state => ({ page: getPage(state) }),
    { logIn, nextPage, prevPage}
)(FooterButton);