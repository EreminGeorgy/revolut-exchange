import { useEffect, useReducer, useRef } from 'react'

import { FetchState, reducer, initialState } from '../reducers/ratesReducer/reducer'
import { 
  LOADING,
  FETCHED,
  ERROR,
} from '../reducers/ratesReducer/actions'

function useCurrencyPolling(delay: number, url?: string, options?: RequestInit): FetchState {

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false)

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    // Do nothing if the url is not given
    if (!url) { return }

    cancelRequest.current = false

    const fetchData = async () => {
      dispatch({ type: LOADING })

      try {
        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error(response.statusText)
        }

        const data = await response.json()
        if (cancelRequest.current) { return }

        dispatch({ type: FETCHED, payload: data })
      } catch (error) {
        if (cancelRequest.current) { return }

        dispatch({ type: ERROR, payload: error as Error })
      }
    }

    const id = setInterval(fetchData, delay)

    // Use the cleanup function for avoiding a possibly state update after the component was unmounted
    return () => {
      cancelRequest.current = true
      clearInterval(id)
    }
  }, [url, options, delay])

  return state
}

export default useCurrencyPolling