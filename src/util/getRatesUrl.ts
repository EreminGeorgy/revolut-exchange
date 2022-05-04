import { EXCHANGE_SERVICE_URL } from "../constants/exchangeServiceUrl"
import { EXCHANGE_ACCESS_KEY } from "../config"

export const ratesUrl = `${EXCHANGE_SERVICE_URL}?app_id=${EXCHANGE_ACCESS_KEY}`