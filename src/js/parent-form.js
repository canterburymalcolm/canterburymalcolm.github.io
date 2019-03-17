import React, { Component } from 'react';
import '../styles/parent-form.scss';

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
                <ParentSelect
                    class={'eyes'}
                />
                <ParentSelect
                    class={'hair'}
                />
                <ParentSelect
                    class={'traits'}
                />
            </form>
        );
    }
}

function ParentButton(props) {
    const desc = props.class === 'cancel' ? 'Cancel Creation' : 'Add Parent';
    return (
        <div className="input-button" style={{gridArea: props.class}}>
            <input type="button" value={desc} />
        </div>
    );
}

function ParentSubmit() {
    return (
        <div className="input-button" style={{gridArea: 'submit'}}>
            <input type="submit" value="Add Parent" />
        </div>
    );
}

function ParentText(props) {
    const desc = props.class.toUpperCase();
    return (
        <div className="input-text" style={{gridArea: props.class}}>
            <input type="text" value='' placeholder={desc} />
        </div>
    );
}

function ParentSelect(props) {
    let desc;
    if (props.class === 'traits') {
        desc = 'GENETIC TRAITS (choose all that apply)';
    } else {
        desc = props.class.toUpperCase();
    }
    return (
        <div className="input-select" style={{gridArea: props.class}}>
            <select value={desc}>
                <option value={desc}>{desc}</option>
            </select>
        </div>
    );
}

export default ParentForm;