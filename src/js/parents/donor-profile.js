import React, { Component } from 'react';
import DonorTraits from './donor-traits';
import Button from '../buttons/button';

class DonorProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        }
    }

    render() {
        return (
            <div className='donor-profile'>
                <div className='head'>
                    <span>John Doe</span>
                    <Button className='info'/>
                </div>
                <DonorTraits />
            </div>
        )
    }
}

export default DonorProfile;