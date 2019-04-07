import React from 'react';
import Form from '../inputs/form';
import OptionBar from '../inputs/option-bar';
import DonorProfile from './donor-profile';
import '../../styles/parent-details.scss';

const AddDonor = () => {
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
                <DonorProfile />
                <DonorProfile />
            </div>
        </Form>
    )
}

export default AddDonor;