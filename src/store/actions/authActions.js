export const signIn = (credentials) => {
    return ( dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email, 
            credentials.password
        ).then(()=>{
            dispatch({ type: 'LOGIN_SUCCESS' });
        }).catch((error) => {
            dispatch({ type: 'LOGIN_ERROR', error});
        })
    }
}


export const signOut = () => {
    return ( dispatch, getState, { getFirebase } ) => {
        const firebase = getFirebase();
        console.log("signout");
        
        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS'})
        }).catch((err) => {
            dispatch({ type: 'SIGNOUT_ERROR', err});
        });
    }
}



export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((response)=>{
            return firestore.collection('users').doc(response.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                recentBooks: [{}],
                favouriteBooks: [{}]
            });
        }).then(()=>{
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).catch(err => {
            dispatch({ type: 'SIGNUP_ERROR' , err })
        })

    }
}