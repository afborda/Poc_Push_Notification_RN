import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import messaging from '@react-native-firebase/messaging';

// import { Container } from './styles';

const App = () => {
  const [orderStatus, setOrderStatus] = useState('feito');

  const handleNotifOpen = (remoteMessage) => {
    if (remoteMessage) {
      console.log('Abriu o app', remoteMessage);
      if (remoteMessage.data.newStatus) {
        setOrderStatus(remoteMessage.data.newStatus);
      }
    }
  };

  useEffect(() => {
    //permissão para notifica
    const requestNotifPermission = async () => {
      const authStatus = await messaging().requestPermission();
      console.log('Permissão', authStatus);
    };

    requestNotifPermission();

    //Recebendo notificação foreground (app Aberto )
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('>>', remoteMessage);
      if (remoteMessage.data.newStatus) {
        setOrderStatus(remoteMessage.data.newStatus);
      }
    });

    //evento para click  para notificacao(em background)

    messaging().onNotificationOpenedApp(handleNotifOpen);

    //Evento para click na notificacao (com app totalmente fechado)
    messaging().getInitialNotification().then(handleNotifOpen);

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.orderTitle}>Pedido #1234</Text>
      <Text style={styles.orderStylesText}>Status:</Text>
      <Text>{orderStatus === 'feito' && 'Seu Pedido esta pronto'}</Text>
      <Text>{orderStatus === 'fazendo' && 'Seu Pedido esta sendo feito'}</Text>
      <Text>{orderStatus === 'aceito' && 'Seu Pedido esta na filaaaaaa'}</Text>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  orderStylesText: {
    fontSize: 20,
    marginBottom: 20,
  },
});
