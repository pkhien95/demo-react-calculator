import {mount, shallow} from "enzyme";
import Calculator from "../../../routes/calculator/Calculator";
import * as React from "react";
import {BUTTONS_LAYOUT} from "../../../routes/calculator/constants";

describe('Should render Calculator correctly', () => {
  it('Should render a table', () => {
    const calculator = mount(<Calculator/>)
    expect(calculator.find('table')).toHaveLength(1)
  })

  it('Should render enough row', () => {
    const calculator = mount(<Calculator/>)
    expect(calculator.find('tr')).toHaveLength(BUTTONS_LAYOUT.length + 1)
  })

  it('Should render 0 as initial value on screen', () => {
    const calculator = mount(<Calculator/>)
    // calculator.find('#1').simulate('click')
    expect(calculator.find('#display-span').text()).toEqual('0')
  })

  it('Should handle numeric buttons correctly', () => {
    const calculator = mount(<Calculator/>)
    // Double click button 1
    calculator.find({'test-id': 'button-1'}).simulate('click')
    calculator.find({'test-id': 'button-1'}).simulate('click')
    // Screen should display "11"
    expect(calculator.find('#display-span').text()).toEqual('11')
  })

  it('Should calculate an equation correctly', () => {
    const calculator = mount(<Calculator/>)
    // Type 1 + 1
    calculator.find({'test-id': 'button-1'}).simulate('click')
    calculator.find({'test-id': 'button-+'}).simulate('click')
    calculator.find({'test-id': 'button-1'}).simulate('click')
    calculator.find({'test-id': 'button-='}).simulate('click')

    // Screen should display "2"
    expect(calculator.find('#display-span').text()).toEqual('2')
  })
})