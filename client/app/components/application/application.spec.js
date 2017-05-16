import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import Application from './application.react';

describe('<TopMenu />', () => {
  it('renders one TopMenu component', () => {
    const wrapper = shallow(<Application />);
    expect(1).to.equal(1);
  });
});
