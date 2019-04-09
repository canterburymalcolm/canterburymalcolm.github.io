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
            invalid: false,
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

    submitDonor() {
        this.setState(state => ({
            invalid: state.expanded === -1
        }), () => {
            if (!this.state.invalid) {
                this.props.nextPage();
            }
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
        const isHidden = this.state.invalid ? '' : ' hidden';
        return (
            <Form
                className='add-donor'
                onSubmit={() => {this.submitDonor()}}
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