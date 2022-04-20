import React from 'react';
import { createRoot } from 'react-dom/client';
import './scss/index.scss';

class App extends React.Component {
    render() {
        return(
            <div>
                Test
            </div>
        )
    }
}


const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);