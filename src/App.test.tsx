import { render, fireEvent } from '@testing-library/react'

import { CURRENCIES } from './constants/currencies'
import App from './App';


test('switch buy mode toggle works', () => {
  const { getByTestId } = render(<App />)
  const switchButton = getByTestId("switch-button")
  const header = getByTestId("header")
  const submit = getByTestId("submit")

  expect(header).toHaveTextContent('Sell GBP')
  expect(submit).toHaveTextContent('Sell GBP for USD')

  fireEvent.click(switchButton)

  expect(header).toHaveTextContent('Buy GBP')
  expect(submit).toHaveTextContent('Buy GBP for USD')

})

test('selectors work', () => {
  const { getByTestId } = render(<App />)
  const mainSelector = getByTestId("currency-selector-main").children[0]
  const secondarySelector = getByTestId("currency-selector-secondary").children[0]

  const header = getByTestId("header")
  const submit = getByTestId("submit")

  expect(header).toHaveTextContent('Sell GBP')
  expect(submit).toHaveTextContent('Sell GBP for USD')

  fireEvent.change(mainSelector, { target: { value: CURRENCIES.EUR } })
  fireEvent.change(secondarySelector, { target: { value: CURRENCIES.USD } })

  expect(header).toHaveTextContent('Sell EUR')
  expect(submit).toHaveTextContent('Sell EUR for USD')
})

test('transaction and modal works', () => {
  const { getByTestId } = render(<App />)
  const mainInput = getByTestId("currency-input-main").children[0]
  const submit = getByTestId("submit")
  const mainWallet = getByTestId("main-wallet")

  fireEvent.change(mainInput, { target: { value: '1' } })
  fireEvent.click(submit)

  const modalDescription = getByTestId("modal-description")
  expect(modalDescription).toHaveTextContent('You exchanged £ 1')

  const okButton = getByTestId("ok-button")
  fireEvent.click(okButton)

  expect(mainWallet).toHaveTextContent('Balance: £ 999.00')
})

test('shows error and disable transaction when limit is exeeded', () => {
  const { getByTestId } = render(<App />)
  const mainInput = getByTestId("currency-input-main").children[0]
  const submit = getByTestId("submit")

  fireEvent.change(mainInput, { target: { value: '1001' } })

  const errorLabel = getByTestId("error-label-main")
  expect(errorLabel).toBeDefined()

  fireEvent.click(submit)

  expect(submit).toHaveAttribute('disabled')
})

test('matches its snapshot', () => {
  const component = render(<App />);
  expect(component).toMatchSnapshot();
});