import { useState } from 'react';
import './App.css';
import './assets/style.css'
import QRCode from './components/QRCode';
import QRCodeTwo from './components/QRCodeTwo';

function App() {

  const [value, setValue] = useState('android')

  const toggle = (val) => {
    setValue(val)
  }

  return (
    <div className="App">

      <div className='toggle'>
        <button onClick={(e) => toggle('android')} className={value === 'android' ? 'btn disable' : 'btn'} >Android</button>
        <button onClick={(e) => toggle('ios')} className={value === 'ios' ? 'btn disable' : 'btn'}>IOS</button>
      </div>

      {
        value === 'android' ? <QRCode /> : <QRCodeTwo />
      }

    </div>
  );
}

export default App;
