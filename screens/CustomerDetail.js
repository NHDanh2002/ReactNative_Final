import { useState } from "react";
import { StyleSheet, View } from "react-native"
import { Button, Text, TextInput } from "react-native-paper"

const CustomerDetail = ({navigation, route}) =>{
    const {fullname, email, phone, address} = route.params;

    return (
        <View style={styles.container}>
          <Text style={styles.text}>Chi tiết khách hàng</Text>
          <TextInput
            label="Họ tên"
            style={styles.input}
            value={fullname}
            editable={false}
          />
          <TextInput
            label="Email"
            style={styles.input}
            value={email}
            editable={false}
          />
          <TextInput
            label="Số điện thoại"
            style={styles.input}
            value={phone}
            editable={false}
          />
          <TextInput
            label="Địa chỉ"
            style={styles.input}
            value={address}
            editable={false}
          />
          <Button style={styles.button} onPress={() => navigation.navigate("Customers")}>
            <Text style={styles.textButton}>Trở về</Text>
          </Button>
        </View>
      );
    };
    
    export default CustomerDetail;
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        color: 'tomato',
        marginBottom: 30,
      },
      input: {
        borderRadius: 10,
        width: '90%',
        margin: 10,
        borderWidth: 0.5,
      },
      button: {
        backgroundColor: 'tomato',
        width: '90%',
        height: '7%',
        borderRadius: 10,
        justifyContent: 'center',
        marginTop: 20,
      },
      textButton: {
        fontSize: 20,
        color: 'white',
      },
    });