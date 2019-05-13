const initState = {};


const bookReducer = (state = initState, action) => {

    switch (action.type) {
        case 'CREATE_BOOK':
            console.log("book added : ", action.book);
            return state;
        
        case 'CREATE_BOOK_ERROR':
            return {
                ...state,
                bookError: action.err.message
            }            
            
        default:
            return state;
            
    }

}


export default bookReducer;