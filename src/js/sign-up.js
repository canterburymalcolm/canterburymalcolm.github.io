import React from 'react';
import TextInput from './inputs/text-input';
import SelectInput from './inputs/select-input';
import { STATES } from '../constants';

const SignUp = () => {
    return (
        <div className="sign-up">
            <TextInput 
                name="email"
                desc="Email address"
                isEmail={true}
            />
            <TextInput 
                name="street"
                desc="Street address"
                placeholder="Your street address"
            />
            <TextInput 
                name="city"
                desc="City"
                placeholder="City"
            />
            <SelectInput
                name='state'
                desc='State'
                placeholder='FL'
                options={STATES}
            />
            <TextInput 
                name="zip"
                desc="Zip"
                placeholder="02115"
            />

        </div>
    )
}

export default SignUp;