import React from 'react';
import eyeIcon from '../../assets/eye-icon.png';
import hairIcon from '../../assets/hair-icon.png';

export const TraitBlocks = () => {
    return (
        <div className='trait-blocks'>
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

export const TraitList = (props) => {
    const traits = props.traits.map((trait) => {
        return (
            <div className='trait' key={trait[0]}>
                <span className='key'>{trait[0]}</span>
                <div className='value'>{trait[1]}</div>
            </div>
        )
    })
    return (
        <div className='trait-list'>
            {traits}
        </div>
    );
}