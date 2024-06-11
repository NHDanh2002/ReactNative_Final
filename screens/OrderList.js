import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from '../store';

const OrderList = ({navigation}) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [controller, dispatch] = useMyContextController()
  const {userLogin} = controller
  const ORDERS = firestore().collection("ORDERS");

  useEffect(() => {
    const unsubscribe = ORDERS.where('user', '==', userLogin.email).onSnapshot((querySnapshot) => {
        const orderlist = [];
        querySnapshot.forEach(documentSnapshot => {
            orderlist.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
        setOrders(orderlist);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={({ item }) => (
            <TouchableOpacity 
                style={styles.orderItem}
                onPress={() => navigation.navigate('OrderDetail',{orderId: item.key})}
            >
            <Text style={styles.orderText}>ID: {item.key}</Text>
            <Text style={styles.orderText}>Tổng tiền: {item.total}</Text>
            <Text style={styles.orderText}>Ngày đặt hàng: {new Date(item.createdAt).toLocaleDateString()}</Text>
            <Text style={styles.orderText}>State: {item.state}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.key}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  orderItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  orderText: {
    fontSize: 16,
  },
});

export default OrderList;
