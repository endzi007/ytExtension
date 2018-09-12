import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';
import './style.css';
import App from './components/app/App';

const anchor = document.createElement('div');
anchor.id = 'rcr-anchor';

document.body.insertBefore(anchor, document.body.childNodes[0]);

const proxyStore =  new Store({
  portName: 'YTEC'
});

proxyStore.subscribe(()=>{
  console.log(proxyStore.getState());
})

render(
  <Provider store={proxyStore}>
    <App/>
  </Provider>
  , document.getElementById('rcr-anchor'));
