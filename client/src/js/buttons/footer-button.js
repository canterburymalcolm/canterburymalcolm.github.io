import React from 'react';
import { connect } from 'react-redux';
import Button from './button';
import { logIn, nextPage, prevPage } from '../../redux/actions';
import { getPage } from '../../redux/selectors';
import { PAGES, formMap } from '../../constants';
import '../../styles/buttons.scss';

const FooterButton = (props) => {

    const renderButton = () => {
        let className;
        let desc;
        let submit;
        let form = formMap.get(props.page);
        //Assign the appropriate onClick depending on whether this is a primary
        //or secondary button

        if (props.first) {
            if (props.page === PAGES.LANDING) {
                //Return a clickable span instead of a button on the landing page
                return (
                    <p>Already a user?
                        <span onClick={() => props.logIn()}> Log in</span>
                    </p>
                );
            } else {
                className = "secondary";
                desc = "Back";
            }
        } else {
            className = "primary";
            submit = true;
            switch (props.page) {
                case PAGES.LANDING:
                    desc = "Sign Up";
                    break;
                case PAGES.ADD_MOM:
                case PAGES.ADD_DAD:
                case PAGES.DONOR_MOM:
                case PAGES.DONOR_DAD:
                    desc = "Add Parent";
                    break;
                case PAGES.CONFIRM_PARENTS:
                    desc = "Edit Parent";
                    break;
                default: desc = "Next";
            }
        }
        return <Button
            className={className}
            desc={desc}
            onClick={() => {props.prevPage()}}
            form={form}
            submit={submit}
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
    state => ({ page: getPage(state, 'footer') }),
    { logIn, nextPage, prevPage }
)(FooterButton);