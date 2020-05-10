import React from 'react';

import {configure , shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter : new Adapter()});

describe('<NavigationItems />' , () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    //this test is for not authenticated users

    it('should render two <NavigationItem> elements if not isAuth ' , () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    //this test is for authenticated users

    it('should render three <NavigationItem> elements if isAuth ' , () => {
        wrapper.setProps({isAuth : true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    //this test is for logout

    it('should render one <NavigationItem> elements if isAuth ' , () => {
        wrapper.setProps({isAuth : true});
        expect(wrapper.contains(<NavigationItem link = "/logout">Logout</NavigationItem>)).toEqual(true);
    });
});

//eact test runs independent of eac other

//enzyme help to test standalone component instead of testing whole application like if u want to test
// only navigation Component so use enzyme

// adapter is used to connect enzyme with react

//shallow help to test main thing in component it doesnt test deeply like it doesnt care props inside component

//describe and it are mbuiltin methods thats are used to test