import React from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-paper";
import { useCart } from "./CartContext";
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from "../store";

const Cart = ({ navigation }) => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [controller, dispatch] = useMyContextController()
  const {userLogin} = controller 

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      Alert.alert("Giỏ hàng trống");
      return;
    }
    try {
      const order = {
        items: cartItems,
        total: cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0),
        createdAt: new Date().toISOString(),
        state: "new",
        user: userLogin.email
      };
      await firestore().collection('ORDERS').add(order);
      clearCart();
      Alert.alert("Thanh toán thành công!");
      navigation.navigate("CustomerProducts");
    } catch (error) {
      console.error("Error during checkout: ", error);
      Alert.alert("Đã xảy ra lỗi trong quá trình thanh toán.");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.price}</Text>
      <Button onPress={() => removeFromCart(item.id)}>Xóa</Button>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text>Giỏ hàng trống</Text>}
      />
      <Button onPress={()=> navigation.navigate("CustomerProducts")}>Thêm</Button>
      <Button onPress={clearCart}>Xóa toàn bộ giỏ hàng</Button>
      <Button onPress={handleCheckout}>Đặt hàng</Button>
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
    fontWeight: "bold",
    marginBottom: 20,
  },
  list: {
    flexGrow: 1,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    flex: 1,
  },
  itemPrice: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Cart;
