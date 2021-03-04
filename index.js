/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

//Recebendo notificacoes em background (app fechado)

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('messaging in background >>> ', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
