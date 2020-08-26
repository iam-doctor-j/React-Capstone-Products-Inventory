import React from 'react';
import { shallow } from 'enzyme';
import { TopChart } from './TopChart';

describe('Test TopChart with shallow rendering', () => {
    let wrapper;

    const prods = `{
        "products": [
        {
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
          },
          {
            "id": "d8548a39-7a6a-5258-bf6c-92fde0dc21fa",
            "views": 3,
            "name": {
              "value": "Mobile Phone",
              "visible": true
            },
            "description": {
              "value": "Smartphone",
              "visible": true
            },
            "manufacturer": {
              "value": "Realme",
              "visible": true
            },
            "price": {
              "value": 15000,
              "visible": true
            },
            "quantity": {
              "value": 1,
              "visible": true
            }
          },
          {
            "id": "cc61beb5-3315-5a82-9b34-da193d64a55c",
            "views": 4,
            "name": {
              "value": "Computer",
              "visible": true
            },
            "description": {
              "value": "A desktop PC fully assembled with all components. Mouse and Keyboard included.",
              "visible": true
            },
            "manufacturer": {
              "value": "HP",
              "visible": true
            },
            "price": {
              "value": 35000,
              "visible": true
            },
            "quantity": {
              "value": 1,
              "visible": false
            }
          },
          {
            "id": "32d9fd8f-91dd-5668-b003-83020ea5439f",
            "views": 4,
            "name": {
              "value": "Radio",
              "visible": true
            },
            "description": {
              "value": "A old radio",
              "visible": true
            },
            "manufacturer": {
              "value": "Saregama",
              "visible": true
            },
            "price": {
              "value": 1200,
              "visible": true
            },
            "quantity": {
              "value": 10,
              "visible": true
            }
        }
        ]
    }`;

    const props = JSON.parse(prods);

    beforeEach(() => {
        wrapper = shallow(<TopChart {...props} />);
    });

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })

    afterEach(() => {
        wrapper.unmount();
    })
})