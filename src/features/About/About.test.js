import React from 'react';
import { About } from './About';
import { shallow } from 'enzyme';

describe('Test About with shallow rendering', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<About/>);
    });

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should display heading as About', () => {
        expect(wrapper.find('span.heading-text').render().text()).toEqual('About');
    })

    afterEach(() => {
        wrapper.unmount();
    })
})