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
        <Provider store={store}>
            <ContextProvider>
                <RouterProvider router={router}/>
            </ContextProvider>
        </Provider>
    </React.StrictMode>,
)
