import React from 'react';
import { mount } from 'enzyme';
import { Register, RegisterForm } from './Register';
import Card from 'react-bootstrap/Card';

describe('Testing Register using Full DOM rendering', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<Register/>);
    })

    it('should render properly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render RegisterForm', () => {
        expect(wrapper.find(RegisterForm).length).toEqual(1);
    })

    it('should render one Card inside RegisterForm', () => {
        expect(wrapper.find(RegisterForm).find(Card).length).toEqual(1);
    })

    afterEach(() => {
        wrapper.unmount();
    })
});