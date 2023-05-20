import * as React from 'react'
import { useState, useEffect, useReducer, Reducer } from 'react'
import axios from 'axios'

type dataType = unknown

interface stateType {
  data: dataType
  isLoading: boolean
  isError: boolean
}

interface actionType {
  type: 'FETCH_INIT' | 'FETCH_SUCCESS' | 'FETCH_FAILURE'
  payload?: dataType
}

const dataFetchReducer: Reducer<stateType, actionType> = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      }
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    default:
      throw new Error()
  }
}

const useApi = function (initUrl: string, initData: any) {
  const [url, setUrl] = useState(initUrl)
  const [state, dispatch] = useReducer<Reducer<stateType, actionType>>(
    dataFetchReducer,
    {
      data: initData,
      isLoading: false,
      isError: false
    }
  )
  useEffect(() => {
    let didCancel = false
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' })
      try {
        const result = await axios(url)
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE' })
      }
    }
    fetchData()
    return () => {
      didCancel = true
    }
  }, [url])
  return [state, setUrl]
}
export default useApi
