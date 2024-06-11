import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Button } from 'react-native-paper';

const OrderDetailAdmin = ({navigation, route }) => {
  const { orderId } = route.params;
  //const [state, setState] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderDoc = await firestore().collection('ORDERS').doc(orderId).get();
        if (orderDoc.exists) {
          setOrder(orderDoc.data());
        } else {
          console.log('No such document!');
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order details: ", error);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!order) {
    return <Text>Không tìm thấy thông tin đơn hàng!</Text>;
  }
  const handleUpdate = async () => {
    //setState("done")
    await firestore().collection('ORDERS').doc(orderId).update({
        state: 'done'
    });
    Alert.alert("Cập nhật thành công!")
    navigation.navigate('OrdersAdmin');
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Chi tiết đơn hàng</Text>
      <Text style={styles.detailText}>ID Đơn hàng: {orderId}</Text>
      <Text style={styles.detailText}>Tổng tiền: {order.total}</Text>
      <Text style={styles.detailText}>Ngày đặt hàng: {new Date(order.createdAt).toLocaleDateString()}</Text>
      <Text style={styles.detailText}>Tên khách hàng: {order.user}</Text>
      <Text style={styles.detailText}>Sản phẩm:</Text>
      {order.items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.itemText}>- {item.name} (x{item.quantity}) - {item.price} VND</Text>
        </View>
      ))}
      <View style={{justifyContent:"center", alignItems:"center"}}>
        <Button mode="contained" style={styles.button} onPress={handleUpdate}>
            Done
        </Button>
        <Button mode="contained" style={styles.button} onPress={()=>navigation.navigate("OrdersAdmin")}>
            Back
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  button: {
    width:"50%",
    margin:10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
  },
  itemContainer: {
    paddingVertical: 5,
  },
  itemText: {
    fontSize: 16,
  },
});

export default OrderDetailAdmin;
