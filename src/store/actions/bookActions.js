export const createBook = (book) => {
    return (dispatch, getState, { getFirebase, getFirestore}) => {
        console.log(" in actions : ");

        console.log(book);
        
        const firestore = getFirestore();
        firestore.collection('books').add({
            ...book
        }).then(()=> {
            dispatch({ type: 'CREATE_BOOK', book });
        }).catch((error) => {
            dispatch({ type: 'CREATE_BOOK_ERROR', error });
        })

    }
}
