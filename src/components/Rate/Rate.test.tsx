import { render } from '@testing-library/react'

import Rate from './Rate'

test('matches its snapshot', () => {
  const component = render(<Rate/>)
  expect(component).toMatchSnapshot()
})