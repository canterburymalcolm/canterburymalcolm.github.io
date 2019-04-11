import React from 'react';
import { TraitBlocks, TraitList } from './donor-traits';

const DonorProfile = (props) => {
    const numTraits = [
        ['Age', 25],
        ['Height', 180],
        ['Weight', 160],
        ['Foot Size', 9]
    ];
    const stringTraits = [
        ['Eye Color', 'Brown'],
        ['Hair Color', 'Blond'],
        ['Strength', 'Very Strong'],
        ['Emotional Stability', 'Very Stable']
    ];
    const traits = props.expanded ?
        <div className='expanded-traits'>
            <TraitList traits={numTraits} />
            <TraitList traits={stringTraits} />
        </div>
        :
        <TraitBlocks />

    const isExpanded = props.expanded ? ' expanded' : '';
    return (
        <div
            className={'donor-profile' + isExpanded}
            onClick={() => props.onClick(props.id)}
        >
            <div className='head'>
                <span>John Doe</span>
            </div>
            {traits}
            {props.expanded && <span className='cost'>Cost $1000</span>}
        </div>
    )
}

export default DonorProfile;