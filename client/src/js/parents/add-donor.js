import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../inputs/form';
import OptionBar from '../inputs/option-bar';
import DonorProfile from './donor-profile';
import { nextPage } from '../../redux/actions';
import '../../styles/parent-details.scss';

class AddDonor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: -1
        }
    }

    //Select or deselect the donor at the given id
    expand(id) {
        this.setState(state => {
            const selected = state.expanded === id ? -1 : id;
            return ({
                expanded: selected
            });
        });
    }

    //Use the donor at the given id as the selected parent for this user
    submitDonor() {
        if (this.state.expanded !== -1) {
            this.props.nextPage();
        }
    }

    render() {
        let profiles = [];
        for (let i = 0; i < 20; i++) {
            profiles[i] =
                <DonorProfile
                    key={i}
                    id={i}
                    expanded={this.state.expanded === i}
                    onClick={(id) => { this.expand(id) }}
                />;
        }
        const isHidden = this.state.expanded === -1 ? '' : ' hidden';
        return (
            <Form
                className='add-donor'
                onSubmit={() => { this.submitDonor() }}
            >
                <OptionBar
                    name='method'
                    desc='Method'
                    defaultOption={1}
                />
                <div className='line'></div>
                <span className={'error' + isHidden}>
                    {this.state.invalid && '*You must select a donor to add'}
                </span>
                <div className='profile-list' >
                    {profiles}
                </div>
            </Form>
        );
    }
}

export default connect(
    null,
    { nextPage }
)(AddDonor);