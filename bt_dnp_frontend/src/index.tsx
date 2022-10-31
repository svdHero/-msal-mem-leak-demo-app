import React, { Suspense } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"

import reportWebVitals from "./reportWebVitals"
import App from "./App"
import { i18n } from "./i18n"
import AuthProvider from "./bt-auth/components/AuthProvider"

i18n.init()

function LoadingComponent() {
    return (
        <div/>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <AuthProvider>
                <Suspense fallback={<LoadingComponent/>}>
                    <App />
                </Suspense>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
