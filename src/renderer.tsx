import React from 'react'
import ReactDOM from 'react-dom/client'

import Application from '../components/Application'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Application />
    </React.StrictMode>,
)