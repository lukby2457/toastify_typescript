import { FC } from 'react';
import Toast from './Toast';
import { showToast } from './showToast';

const App: FC = () => {
  return (
    <div className="App">
      <h1>React Event Bus Toast Example</h1>
      <button onClick={() => showToast.info('This is a toast message!')}>
        Show Toast
      </button>
      <button onClick={() => showToast.success('OK')}>
        agree
      </button>
      <button onClick={() => showToast.warning('NO')}>
        disagree
      </button>
      <Toast />
    </div>
  );
}

export default App;