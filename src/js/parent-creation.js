import React, { Component } from 'react';
import '../styles/select-method.scss';

class ParentMethodSelect extends Component {
    render() {
        return (
            <div className="select-method">
                <div className="use-donor">
                    <ParentMethodButton desc={'Choose From Donors'} />
                </div>
                <div className="create-parent">
                    <ParentMethodButton desc={'Create a New Parent'} />
                </div>
            </div>
        );
    }
}

function ParentMethodButton(props) {
    return (
        <button className="button">{props.desc}</button>
    );
}

class ParentForm extends Component {
    render() {
        return (
            <form className="parent-form">
                <ParentButton
                    class={'cancel'}
                />
                <ParentSubmit
                />
                <ParentText
                    class={'first'}
                />
                <ParentText
                    class={'last'}
                />
                <ParentText
                    class={'dob'}
                />
                <ParentText
                    class={'age'}
                />
                <ParentText
                    class={'height'}
                />
                <ParentText
                    class={'weight'}
                />
                {/* <ParentSelect
                    class={'eyes'}
                />
                <ParentSelect
                    class={'hair'}
                />
                <ParentSelect
                    class={'traits'}
                /> */}
            </form>
        );
    }
}

function ParentButton(props) {
    const desc = props.class === 'cancel' ? 'Cancel Creation' : 'Add Parent';
    return (
        <div className={props.class}>
            <input type="button" value={desc} />
        </div>
    );
}

function ParentSubmit() {
    return (
        <div className="submit-parent">
            <input type="submit" value="Add Parent" />
        </div>
    );
}

function ParentText(props) {
    const desc = props.class.toUpperCase();
    return (
        <div className={props.class}>
            <input type="text" value='' placeholder={desc} />
        </div>
    );
}

class ParentCreation extends Component {
    render() {
        return (
            <ParentMethodSelect />
            //<ParentForm />
        );
    }
}

export default ParentCreation;