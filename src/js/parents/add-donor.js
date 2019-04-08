import React, { Component } from 'react';
import Form from '../inputs/form';
import OptionBar from '../inputs/option-bar';
import DonorProfile from './donor-profile';
import '../../styles/parent-details.scss';

class AddDonor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: -1
        }
    }

    expand(id) {
        this.setState(state => {
            const selected = state.expanded === id ? -1 : id; 
            return ({
                expanded: selected
            });
        });
    }

    render() {
        let profiles = [];
        for (let i = 0; i < 20; i++) {
            profiles[i] =
                <DonorProfile
                    key={i}
                    id={i}
                    expanded={this.state.expanded === i}
                    onClick={(id) => {this.expand(id)}}
                />;
        }

        return (
            <Form
                className='add-donor'
            >
                <OptionBar
                    name='method'
                    desc='Method'
                />
                <div className='line'></div>
                <div className='profile-list' >
                    {profiles}
                </div>
            </Form>
        );
    }
}

export default AddDonor;