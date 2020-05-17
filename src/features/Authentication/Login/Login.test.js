import React from 'react';
import { Shallow, shallow, mount } from 'enzyme';
import {Login, LoginForm} from './Login';
import Card from 'react-bootstrap/Card';
import toJson from 'enzyme-to-json';

describe('Test Login using Full DOM rendering', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<Login/>);
    });

    it('should check snapshot renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })

    it('Should render one Card element', () => {
        expect(wrapper.find(Card).length).toEqual(1);
    });

    it('should render inputs correctly', () => {
        // console.log(toJson(wrapper.find(LoginForm).find('input[name="email"]')))
        wrapper.find(LoginForm).find('input[name="email"]').simulate('change', {
            persist: () => {},
            target: {
                name: 'email',
                value: 'jyotirmaya@sahu.com'
            }
        });
        // console.log(toJson(wrapper.find(LoginForm).find('input[name="email"]')))
        const emailValue = wrapper.find(LoginForm).find('input[name="email"]').props().value;
        expect(emailValue).toEqual('jyotirmaya@sahu.com');
    });

    afterEach(() => {
        wrapper.unmount();
    })
});

describe('Test Login using shallow rendering', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Login/>);
    });

    it('should render snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    })

    it('should find the LoginForm', () => {
        expect(wrapper.dive().find(LoginForm).length).toEqual(1);
    });
});