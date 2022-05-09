import { render } from '@testing-library/react'

import ExchangeWidget from './ExchangeWidget'

test('matches its snapshot', () => {
  const component = render(<ExchangeWidget/>)
  expect(component).toMatchSnapshot()
})