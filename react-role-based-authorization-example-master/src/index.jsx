import React from 'react';
import { Fragment } from "react";
// import { render } from 'react-dom';
import {createRoot} from 'react-dom/client'

import { App } from './App';

// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

const container = document.getElementById('app')
const root = createRoot(container)
root.render(
    <Fragment>
        <App />
    </Fragment>
)
