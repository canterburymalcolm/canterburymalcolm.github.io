import React from 'react';
import eyeIcon from '../../assets/eye-icon.png';
import hairIcon from '../../assets/hair-icon.png';

const DonorTraits = () => {
    return (
        <div className='donor-traits'>
            <div>
                <img alt="" src={eyeIcon}></img>
                <span>Brown</span>
            </div>
            <div>
                <span>25</span>
                <span>years old</span>
            </div>
            <div>
                <img alt="" src={hairIcon}></img>
                <span>Blond</span>
            </div>
            <div>
                <span>160</span>
                <span>Pounds</span>
            </div>
        </div>
    );
}

export default DonorTraits;