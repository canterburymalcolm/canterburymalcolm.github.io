import React, { Component } from 'react';
import { disorders } from '../../constants';

class Checkboxes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: []
        }

        this.updateForm();
    }

    updateForm() {
        this.props.onChange({
            target: {
                name: this.props.name,
                value: this.state.selected
            }
        });
    }

    selectDisorder(target) {
        const disorder = disorders[target.id];

        this.setState(state => {
            let selected = state.selected;
            if (target.checked) {
                selected = [...selected, disorder];
            } else {
                selected = selected.filter((id) => (disorder !== id));
            }
            return {
                selected: selected
            }
        }, () => { this.updateForm() });
    }

    render() {
        const boxes = disorders.map((desc, index) => {
            return (
                <div key={'box-' + index}>
                    <input
                        id={index}
                        type='checkbox'
                        onChange={(event) => this.selectDisorder(event.target)}
                    />
                    <label htmlFor={index}></label>
                    <span>{desc}</span>
                </div>
            );
        })

        return (
            <div className='checkbox-container'>
                <label>
                    {this.props.desc}
                </label>
                <div className='checkboxes'>
                    {boxes}
                </div>
            </div>
        );
    }
}

export default Checkboxes;