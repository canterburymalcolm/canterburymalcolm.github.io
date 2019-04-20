import React from 'react';
import { connect } from 'react-redux';
import Form from '../inputs/form';
import OptionBar from '../inputs/option-bar';
import TextInput from '../inputs/text-input';
import Checkboxes from '../inputs/checkboxes';
import { addParent } from '../client';
import { updateMom, updateDad, nextPage } from '../../redux/actions';
import { getPage } from '../../redux/selectors';
import { PAGES } from '../../constants';
import '../../styles/parent-details.scss';

const AddParent = (props) => {

    let onChangeAction = props.updateDad;
    let gender = 2;
    if (props.page === PAGES.ADD_MOM) {
        onChangeAction =  props.updateMom;
        gender = 1;
    }
    const onChange = (values) => {
        onChangeAction(values);
    };
    return (
            <Form 
                className='add-parent'
                onChange={(values) => onChange(values)}
                onSubmit={(parent) => { 
                    addParent(props.orderId, { gender: gender, ...parent }, () => {
                    });
                    props.nextPage();
                }}
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
                desc='Weight (lbs)'
                isNumber={true}
            />
            <OptionBar 
                name='hair'
                desc='Hair color'
            />
            <TextInput 
                name='height'
                desc='Height (cm)'
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
    state => ({ 
        page: getPage(state),
        orderId: state.userInfo.order 
    }),
    { updateMom, updateDad, nextPage }
)(AddParent);