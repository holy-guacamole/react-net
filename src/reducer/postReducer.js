const initialState = {
    loading: true,
    post_loading: true,
    data: [],
    post: [],
}

export function postReducer(state=initialState, action) {
    switch (action.type) {
    case 'POST_LIST': return {...state, loading: false, data: action.payload}
    case 'SHOW_POST': return {...state, post: action.payload, post_loading: false}
    case 'SAVE_POST': return {...state, post: action.payload, isReduct: false}
    case 'ADD_POST': return {...state, data: action.payload}
    case 'CLEAR_POST': return {...state, post: action.payload}
    default: return state
    }
}