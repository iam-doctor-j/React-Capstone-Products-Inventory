import React from 'react';
import { shallow } from 'enzyme';
import FloatingDeleteButton from './FloatingDeleteButton';

describe('Test FloatingDeleteButton using shallow rendering', () => {
    let wrapper;

    const props = {
        loggedIn: true,
        deleteList: [],
        history: {
            push: () => {}
        }
    }

    beforeEach(() => {
        wrapper = shallow(<FloatingDeleteButton {...props}/>);
    });

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render one button', () => {
        expect(wrapper.find('button').length).toEqual(1);
    });

    afterEach(() => {
        wrapper.unmount();
    });
})