import React from 'react';
import { shallow } from 'enzyme';
import { ProductDetails } from './ProductDetails';
import Card from 'react-bootstrap/Card';

describe('Test ProductDetails with shallow rendering', () => {
    let wrapper;

    const strProd = `{
        "id": "63796e43-f23b-542e-99a7-11db520c7bb6",
        "views": 6,
        "name": {
          "value": "Laptop",
          "visible": true
        },
        "description": {
          "value": "A simple Laptop",
          "visible": true
        },
        "manufacturer": {
          "value": "Lenovo",
          "visible": true
        },
        "price": {
          "value": 64999,
          "visible": true
        },
        "quantity": {
          "value": 1,
          "visible": true
        }
      }`

    const props = {
        product: JSON.parse(strProd),
        dispatch: () => {},
        history: () => {},
        match: {
            params: {
                id: "63796e43-f23b-542e-99a7-11db520c7bb6",
            }
        }
    }

    beforeEach(() => {
        wrapper = shallow(<ProductDetails {...props}/>);
    });

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render one div with class container', () => {
        expect(wrapper.find('div.container').length).toEqual(1);
    });

    it('should render one card', () => {
        expect(wrapper.find(Card).length).toEqual(1);
    });

    afterEach(() => {
        wrapper.unmount();
    })
});