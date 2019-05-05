const initState = {};


const bookReducer = (state = initState, action) => {

    switch (action.type) {
        case 'CREATE_BOOK':
            console.log("book added : ", action.book);
            return state;
        
        default:
            return state;
            
    }

}


export default bookReducer;