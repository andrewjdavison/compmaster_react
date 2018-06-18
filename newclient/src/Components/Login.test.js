import React from 'react';
import Login from './Login.jsx';
import {shallow,mount} from 'enzyme';
import renderer from 'react-test-renderer';
import ProviderWrapper from '../ProviderWrapper'

it('renders without crashing', ()=> {
    shallow(<Login />);

});

describe('When providing email addresses', () => {
    var wrapper = undefined;
    beforeEach(()=>{
//        wrapper=mount(<ProviderWrapper />);
        wrapper=shallow(<Login />);
    })
    it('displays an error if a poorly formed email is provided', ()=> {

        wrapper.find({name:"email"}).simulate('change', {target: {value: 'tony@dudemail'}});   
        const rendered = rendered.create(
            <Login />
        );
        expect(renderer.toJson()).toMatchSnapshot();
        
    });
});