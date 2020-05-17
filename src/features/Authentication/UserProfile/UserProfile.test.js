import React from 'react';
import { shallow } from 'enzyme';
import { UserProfile } from './UserProfile';

describe('Test UserProfile with shallow rendering', () => {
    let wrapper;

    const props = {
        dispatch: () => {},
        user: {
            firstName: 'Jyotirmaya',
            lastName: 'Sahu',
            email: 'xyz@xyz.com',
            mobNumber: 1111111111,
            location: 'Bangalore',
        },
        history: {
            goBack: () => {},
        },
    }

    beforeEach(() => {
        wrapper = shallow(<UserProfile {...props}/>);
    });

    it('Should render properly', () => {
        expect(wrapper).toMatchSnapshot();
    })

    it('should render only one container div', () => {
        expect(wrapper.find('div.container').length).toEqual(1);
    })

    it('should display heading text properly', () => {
        expect(wrapper.find('span.heading-text').render().text()).toEqual('User Profile');
    })

    afterEach(() => {
        wrapper.unmount();
    });
})