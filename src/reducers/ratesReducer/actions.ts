export const LOADING = 'LOADING'
export const FETCHED = 'FETCHED'
export const ERROR = 'ERROR'

export type FetchAction = {
    type: 'LOADING'
} | {
    type: 'FETCHED',
    payload: any,
} | {
    type: 'ERROR',
    payload: Error,
}