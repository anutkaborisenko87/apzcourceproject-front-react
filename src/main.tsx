import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import router from "./router.tsx";
import {ContextProvider} from "../contexts/ContextProvider.tsx";
import './index.css'
import store from "./store";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ContextProvider>
            <Provider store={store}>
                <RouterProvider router={router}/>
            </Provider>
        </ContextProvider>
    </React.StrictMode>,
)
