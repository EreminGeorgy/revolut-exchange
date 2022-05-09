import { render } from '@testing-library/react'
import React from 'react'
import userEvent from '@testing-library/user-event'

import CurrencyInput from './CurrencyInput'

const onChangeSpy = jest.fn()

const Wrapper = () => {
  const [state, setState] = React.useState('')
  return (
    <CurrencyInput 
      testId='currency-input-main'
      handleInputChange={(val) => {
        onChangeSpy(val)
        setState(val)
      }}
      value={state}
    />
  )
}

test('Input validation works', () => {
  const { getByTestId } = render(<Wrapper/>)
  const input = getByTestId("currency-input-main").children[0]

  // fireEvent.change(input, { target: { value: '1.234567' } })
  userEvent.type(input, '1.234567')
  // expect(onChangeSpy.mock.calls).toHaveLength(8)
  expect(input).toHaveValue(1.23)
})