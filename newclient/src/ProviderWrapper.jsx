import React, { Component } from 'react';
import App from './App';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { ConnectedRouter } from 'connected-react-router';

import configureStore, {  } from './reduxStore';
let { store, persistor,history } = configureStore();

class ProviderWrapper extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={<h1>Loading</h1>} persistor={persistor}>
                    <ConnectedRouter history={history}>
                        <div>
                            <App />
                        </div>
                    </ConnectedRouter>
                </PersistGate>
            </Provider>
        )
    }
}


export default ProviderWrapper;