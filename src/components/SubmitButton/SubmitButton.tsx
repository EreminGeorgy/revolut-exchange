import { Button, Modal } from 'semantic-ui-react'
import { useContext, FC, useState, useCallback, useMemo } from 'react'

import { CurrencyDataContext } from '../../contexts/CurrencyDataContext'
import { DICTIONARY } from '../../constants/dictionary'
import { StringMap, InputState } from '../types'
import { formatCurrencyString } from '../../util/formatCurrencyString'

type Props = {
  onClick: () => void
  currencyValues: InputState
  disabled: boolean
  setCurrencyValues: (value: InputState) => void
  errorText: string | null
}

const SubmitButton: FC<Props> = ({ onClick, currencyValues, disabled, setCurrencyValues, errorText }) => {

  const { state } = useContext(CurrencyDataContext)

  const [isModalOpen, setModalOpen] = useState(false)

  const handleClick = useCallback(
    () => {
      if (!currencyValues.dependent || !currencyValues.main) {
        return
      }
      onClick()
      setModalOpen(true)
    },
    [onClick, currencyValues]
  )

  const message = useMemo(
    () => `${DICTIONARY.transactionInfo} ${formatCurrencyString(
      state.isBuyMode ? currencyValues.dependent : currencyValues.main,
      state.isBuyMode ? state.dependentCurrency : state.mainCurrency
    )} ${DICTIONARY.for} ${formatCurrencyString(
      state.isBuyMode ? currencyValues.main : currencyValues.dependent,
      state.isBuyMode ? state.mainCurrency : state.dependentCurrency
    )}`,
    [currencyValues, state]
  )

  const onModalClose = useCallback(
    () => {
      setCurrencyValues({
        main: '',
        dependent: '',
      })
      setModalOpen(false)
    },
    [setCurrencyValues]
  )

  const buttonText = useMemo(
    () => {
      if (disabled) {
        return errorText
      } else {
        return `
        ${state.isBuyMode ? DICTIONARY.buy : DICTIONARY.sell} 
        ${(DICTIONARY as StringMap)[state.mainCurrency]}
        ${DICTIONARY.for} 
        ${(DICTIONARY as StringMap)[state.dependentCurrency]}
      `}
    },
    [errorText, state, disabled]
  )

  return (
    <>
      <Button onClick={handleClick} fluid disabled={disabled} data-testid="submit">
        {buttonText}
      </Button>
      <Modal
        onClose={onModalClose}
        onOpen={() => setModalOpen(true)}
        open={isModalOpen}
        size='mini'
      >
        <Modal.Header>{DICTIONARY.success}</Modal.Header>
        <Modal.Content>
          <Modal.Description data-testid="modal-description">
            {message}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Ok"
            labelPosition='right'
            icon='checkmark'
            onClick={onModalClose}
            positive
          />
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default SubmitButton
