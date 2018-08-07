import ReactDOM from 'react-dom';
import Root from './root';

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('root');
  const store = configureStore();
  ReactDOM.render(<Root />, root);
})
