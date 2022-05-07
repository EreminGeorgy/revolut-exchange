import { Button, Modal } from 'semantic-ui-react'
import { useContext, FC, useState, useCallback, useMemo } from 'react'

import { CurrencyDataContext } from '../../contexts/CurrencyDataContext'
import { DICTIONARY } from '../../constants/dictionary'
import { StringMap, InputState } from '../types'
import { getCurrencySign } from '../../util/getCurrencySign'

type Props = {
  onClick: () => void
  currencyValues: InputState
  disabled: boolean
}

const SubmitButton: FC<Props> = ({ onClick, currencyValues, disabled }) => {

  const { state } = useContext(CurrencyDataContext)

  const [isModalOpen, setModalOpen] = useState(false)

  const handleButtonClick = useCallback(
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
    () => `
      ${DICTIONARY.transactionInfo}
      ${getCurrencySign(state.isBuyMode ? state.dependentCurrency : state.mainCurrency)}
      ${state.isBuyMode ? currencyValues.dependent : currencyValues.main} 
      ${DICTIONARY.for} 
      ${getCurrencySign(state.isBuyMode ? state.mainCurrency : state.dependentCurrency)}
      ${state.isBuyMode ? currencyValues.main : currencyValues.dependent} 
    `,
    [currencyValues, state]
  )

  return (
    <>
      <Button onClick={handleButtonClick} fluid disabled={disabled}>
        {`
          ${state.isBuyMode ? DICTIONARY.buy : DICTIONARY.sell} 
          ${(DICTIONARY as StringMap)[state.mainCurrency]}
          ${DICTIONARY.for} 
          ${(DICTIONARY as StringMap)[state.dependentCurrency]}
        `}
      </Button>
      <Modal
        onClose={() => setModalOpen(false)}
        onOpen={() => setModalOpen(true)}
        open={isModalOpen}
        size='mini'
      >
        <Modal.Header>{DICTIONARY.success}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {message}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Ok"
            labelPosition='right'
            icon='checkmark'
            onClick={() => setModalOpen(false)}
            positive
          />
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default SubmitButton
