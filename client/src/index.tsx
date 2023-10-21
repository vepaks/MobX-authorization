import React, {createContext, StrictMode} from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

import Store from "./store/store";
interface State {
    store: Store,
}

export const store = new Store();

export const Context = createContext<State>({
    store,
})

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
    <StrictMode>
    <Context.Provider value={{
            store
        }}>
        <App />
    </Context.Provider>
    </StrictMode>,
);