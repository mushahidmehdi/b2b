import {createRoot} from 'react-dom/client';
import App from './App';
import '@shipsavvy/services';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
