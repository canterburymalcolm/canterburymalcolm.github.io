import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../inputs/form';
import OptionBar from '../inputs/option-bar';
import DonorProfile from './donor-profile';
import { addDonor, getDonors } from '../client';
import { nextPage } from '../../redux/actions';
import { getGender } from '../../redux/selectors';
import '../../styles/parent-details.scss';

class AddDonor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: -1,
            donors: []
        }
    }

    componentDidMount() {
        console.log('Gender: ' + this.props.gender);
        getDonors(this.props.gender, donors => {
            this.setState({
                donors: donors
            }, () => { console.log('Donors mounted') }
            )
        })
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

    render() {
        const profiles = this.state.donors.map((donor, index) => (
            <DonorProfile
                key={index}
                id={donor.id}
                profile={donor}
                expanded={this.state.expanded === donor.id}
                onClick={(id) => { this.expand(id) }}
            />
        ))

        const isHidden = this.state.expanded === -1 ? '' : ' hidden';
        return (
            <Form
                className='add-donor'
                onSubmit={() => {
                    if (this.state.expanded !== -1) {
                        console.log('Adding donor')
                        addDonor(
                            this.props.orderId,
                            this.state.expanded,
                            this.props.gender,
                            () => {
                                console.log('Added donor')
                                this.props.nextPage()
                            })
                    }
                }}
            >
                <OptionBar
                    name='method'
                    desc='Method'
                />
                <div className='line'></div>
                <span className={'error' + isHidden}>
                    {this.state.invalid && '*You must select a donor to add'}
                </span>
                <div className='profile-list' >
                    {this.state.donors.length !== 0 && profiles}
                </div>
            </Form >
        );
    }
}

export default connect(
    state => ({
        orderId: state.userInfo.order,
        gender: getGender(state)
    }),
    { nextPage }
)(AddDonor);