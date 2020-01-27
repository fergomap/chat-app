import React, {Component, ReactElement} from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {mainReducer} from './store/main.reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import MainComponent from './components/main/main.component';
import OfflineComponent from './components/offline/offline.component';

export default class App extends Component<{}, {}> {
  render(): ReactElement {
    return <Provider store={createStore(mainReducer, composeWithDevTools())}>
      <OfflineComponent/>
      <MainComponent />
    </Provider>;
  }
}
