import React from 'react';
import { TraitBlocks, TraitList } from './donor-traits';

const DonorProfile = (props) => {
    let fields = props.profile.fields;
    let traits = props.profile.traits;
    const blockTraits = [
        traits['Eye Color'],
        fields['age'],
        traits['Hair Color'],
        fields['weight']
    ]

    fields = Object.entries(fields)
    traits = Object.entries(traits)

    let name = 'John Doe'
    let cost = 1000
    fields = fields.filter((field) => {
        if (field[0] === 'name') {
            name = field[1]
        } else if (field[0] === 'cost') {
            cost = field[1] ? field[1] : 0
        } else {
            return true;
        }
        return false;
    })

    console.log(name + ' at id: ' + props.id);

    const traitView = props.expanded ?
        <div className='expanded-traits'>
            <TraitList traits={fields} />
            <TraitList traits={traits} />
        </div>
        :
        <TraitBlocks traits={blockTraits}/>

    const isExpanded = props.expanded ? ' expanded' : '';
    return (
        <div
            className={'donor-profile' + isExpanded}
            onClick={() => props.onClick(props.id)}
        >
            <div className='head'>
                <span>{name}</span>
            </div>
            {traitView}
            {props.expanded && <span className='cost'>{'Cost $' + cost}</span>}
        </div>
    )
}

export default DonorProfile;