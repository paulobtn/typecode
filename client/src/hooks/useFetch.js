import {  useReducer , useCallback} from 'react';

const useFetch = ({defaultUrl, defaultOptions = null, defaultOnSuccess = null}) => {

    const initialState = {
        status: 'idle',
        error: null,
        data: [],
    };

    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'FETCHING':
                return { ...initialState, status: 'fetching', data: [], error: null };
            case 'FETCHED':
                return { ...initialState, status: 'fetched', data: action.payload, error: null };
            case 'FETCH_ERROR':
                return { ...initialState, status: 'error', error: action.payload };
            default:
                return state;
        }
    }, initialState);


    const fetchData = useCallback(async ( {
                                           url = defaultUrl,
                                           options = defaultOptions,
                                           onSuccess = defaultOnSuccess
                                          } = {}) => {
        
        dispatch({type: 'FETCHING'});

        try{
          const response = await fetch(url, options);
          const data = await response.json();
          dispatch({type: 'FETCHED', payload: data});

        } catch(error){
          dispatch({type: 'FETCH_ERROR', payload: error.message});
        }
      
    },[defaultUrl, defaultOptions, defaultOnSuccess]);

    return {fetchData, fetchState: state};
};

export default useFetch;
