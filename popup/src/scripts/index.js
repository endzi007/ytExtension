import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';
import App from './components/app/App';

const proxyStore = new Store({
  portName: "YTEC"
});

proxyStore.ready().then(()=>{
  render(
      <Provider store={proxyStore}><App/></Provider>
      , document.getElementById('app'));
});

