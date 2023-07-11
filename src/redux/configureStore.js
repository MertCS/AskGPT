import {createStore, applyMiddleware, compose} from 'redux';
import authReducer from './authReducer';
import SecureLS from 'secure-ls';
import thunk from 'redux-thunk';

const secureLS = new SecureLS();

const getStateFromStorage = () => {
    const askgptAuth = secureLS.get('askgpt-auth');
    
    let stateInLocalStorage = {
        isLoggedIn: false,
        email: undefined,
        name: undefined,
        surname: undefined,
        username: undefined,
        image: undefined,
        password: undefined
    }

    if(askgptAuth){
            return askgptAuth;  
    }
    return stateInLocalStorage;
}

const updateStateInStorage = newState => {
    secureLS.set('askgpt-auth', newState);
}

const configureStore = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(authReducer, getStateFromStorage(), composeEnhancers(applyMiddleware(thunk)));
    
    store.subscribe(() => {
        updateStateInStorage(store.getState());
    });

    return store;
};

export default configureStore;