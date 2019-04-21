import React from 'react';
import eyeIcon from '../../assets/eye-icon.png';
import hairIcon from '../../assets/hair-icon.png';

export const TraitBlocks = ({traits}) => {
    return (
        <div className='trait-blocks'>
            <div>
                <img alt="" src={eyeIcon}></img>
                <span>{traits[0]}</span>
            </div>
            <div>
                <span>{traits[1]}</span>
                <span>years old</span>
            </div>
            <div>
                <img alt="" src={hairIcon}></img>
                <span>{traits[2]}</span>
            </div>
            <div>
                <span>{traits[3]}</span>
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