import React from 'react';
import ReactDOM from 'react-dom';
import 'idempotent-babel-polyfill';
import { Provider } from 'react-redux';
import store from 'store';
import Root from 'Root';


ReactDOM.render(
    <Provider store={ store }>
        <Root />
    </Provider>,
    document.getElementById('root'),
);
