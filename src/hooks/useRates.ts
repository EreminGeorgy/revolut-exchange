import { useState, useEffect } from "react"

import { RETRY_LOAD_INTERVAL, REFRESH_RATE_IN_MILLISECONDS } from "../config"
import { ratesUrl } from "../util/getRatesUrl"

import usePolling from "./usePolling"

function useRates() {
  const [interval, setInterval] = useState(RETRY_LOAD_INTERVAL)

  const { data, error, isFetching } = usePolling(interval, ratesUrl)

  useEffect(
    () => {
      if (data) {
        setInterval(REFRESH_RATE_IN_MILLISECONDS)
      }
    },
    [data]
  )

  return { data, error, isFetching }
}

export default useRates

