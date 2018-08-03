import React from 'react'
import { CrowdsaleRate } from '../../../src/components/Common/CrowdsaleRate'
import { Form } from 'react-final-form'
import Adapter from 'enzyme-adapter-react-15'
import { configure, mount, shallow } from 'enzyme'
import renderer from 'react-test-renderer'

configure({ adapter: new Adapter() })
const DECRIPTION_RATE = `Exchange rate Ethereum to Tokens. If it's 100, then for 1 Ether you can buy 100 tokens`
const LABEL_RATE = `Rate`
describe('CrowdsaleRate ', () => {
  it(`should render CrowdsaleRate component`, () => {
    let input = {
      name: 'CrowdsaleRate',
      disabled: false,
      value: '1234'
    }
    const wrapper = renderer.create(
      <Form
        onSubmit={jest.fn()}
        component={CrowdsaleRate}
        disabled={false}
        validate={{}}
        input={input}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
  it(`should be label ${LABEL_RATE}`, () => {
    const wrapper = mount(
      <Form
        onSubmit={jest.fn()} component={CrowdsaleRate} validate={{}}
      />
    )
    let lab = wrapper.find('label')
    expect(lab.text()).toBe(LABEL_RATE)
  })
  it(`should be decription ${DECRIPTION_RATE}`, () => {
    const wrapper = mount(
      <Form
        onSubmit={jest.fn()} component={CrowdsaleRate} validate={{}}
      />
    )
    let lab = wrapper.find('p[className="description"]')
    expect(lab.text()).toBe(DECRIPTION_RATE)
  })
  it(`should give error if empty`, () => {})
  it(`should give error if not positive`, () => {})
  it(`should give error if not integer`, () => {})
  it(`should give error if greater than 1e18`, () => {})
  it(`should give error if not numberic`, () => {})
})
