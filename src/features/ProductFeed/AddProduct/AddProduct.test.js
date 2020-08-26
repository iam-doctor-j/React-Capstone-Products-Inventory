import React from 'react';
import { shallow } from 'enzyme';
import { AddProduct, AddProductForm } from './AddProduct';
import Card from 'react-bootstrap/Card';
import { Form } from 'formik';

describe('Test AddProduct with shallow rendering', () => {
    let wrapper;

    // const props = {
    //     touched: {},
    //     errors: {},
    //     isSubmitting: false,
    //     values: {},
    //     dispatch: () => {},
    //     history: {
    //         goBack: () => {}
    //     }
    // }
    
    beforeEach(() => {
        wrapper = shallow(<AddProduct />);
    });

    it('should render correctly', () => {
        expect(wrapper.dive()).toMatchSnapshot();
    });

    it('should render AddProductForm once', () => {
        expect(wrapper.dive().find(AddProductForm).length).toEqual(1);
    });

    it('should render one card', () => {
        expect(wrapper.dive().find(AddProductForm).dive().find(Card).length).toEqual(1);
    });

    it('should render one form', () => {
        expect(wrapper.dive().find(AddProductForm).dive().find(Form).length).toEqual(1);
    });

    afterEach(() => {
        wrapper.unmount();
    });
})