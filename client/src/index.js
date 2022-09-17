import React from 'react';
import {render} from "react-dom";
import App from "./App";
import 'regenerator-runtime/runtime'
import {BrowserRouter} from 'react-router-dom'

render(<BrowserRouter><App /></BrowserRouter>, document.querySelector('#app'));
