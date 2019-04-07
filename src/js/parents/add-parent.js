import React from 'react';
import { connect } from 'react-redux';
import Form from '../inputs/form';
import OptionBar from '../inputs/option-bar';
import TextInput from '../inputs/text-input';
import Checkboxes from '../inputs/checkboxes';
import { PAGES } from '../../constants';
import { updateParent, addMom, addDad, nextPage } from '../../redux/actions';
import { getPage } from '../../redux/selectors';
import '../../styles/parent-details.scss';

const AddParent = (props) => {

    const submitAction = props.page === PAGES.ADD_MOM ? props.addMom : props.addDad;
    const onSubmit = (values) => {
        submitAction(values);
        props.nextPage();
    };
    return (
            <Form 
                className='add-parent'
                onChange={(values) => props.updateParent(values)}
                onSubmit={onSubmit}
            >
            <OptionBar 
                name='method'
                desc='Method'
            />
            <div className='line' style={{ gridArea: 'line' }}></div>
            <TextInput 
                name='first' 
                desc='First name' 
                placeholder='Your first name'
            />
            <TextInput 
                name='last'
                desc='Last name'
                placeholder='Your last name'
            />
            <TextInput 
                name='age'
                desc='Age'
                isNumber={true}
            />
            <OptionBar 
                name='eye'
                desc='Eye color'
            />
            <TextInput 
                name='weight'
                desc='Weight (cm)'
                isNumber={true}
            />
            <OptionBar 
                name='hair'
                desc='Hair color'
            />
            <TextInput 
                name='height'
                desc='Height (ft)'
                isNumber={true}
            />
            <OptionBar 
                name='emotion'
                desc='Emotional Stability'
            />
            <TextInput 
                name='foot'
                desc='Foot Size'
                isNumber={true}
            />
            <OptionBar 
                name='strength'
                desc='Strength'
            />
            <Checkboxes 
                name='disorders'
                desc='Genetic Disorders (choose all that apply)'
            />
            </Form>
    )
}

export default connect(
    state => ({ page: getPage(state) }),
    { updateParent, addMom, addDad, nextPage }
)(AddParent);