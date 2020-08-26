import React from 'react';
import { shallow } from 'enzyme';
import { Navigation } from './Navigation';
import { BrowserRouter } from 'react-router-dom';

describe('Testing Navigation with Shallow Rendering', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Navigation/>);
    });

    it('Should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should contain one router', () => {
        expect(wrapper.find(BrowserRouter).length).toEqual(1);
    })

    it('should have a nav element', () => {
        expect(wrapper.find('nav').length).toEqual(1);
    })

    afterEach(() => {
        wrapper.unmount();
    });
})