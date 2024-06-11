import { useEffect, useState } from "react";
import { logout, useMyContextController } from "../store";
import { Alert, Image, StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';

const UpdateProfileAdmin = ({navigation}) => {
    const [controller, dispatch] = useMyContextController()
    const {userLogin} = controller
    const [fullname, setFullname] = useState(userLogin?.fullname || '');
    const [email, setEmail] = useState(userLogin?.email || '');
    const [phone, setPhone] = useState(userLogin?.phone || '');
    const [address, setAddress] = useState(userLogin?.address || '');
    const handleUpdate = async () => {
        await firestore().collection('USERS').doc(email).update({
            fullname,
            email,
            phone,
            address,
        });
        Alert.alert("Cập nhật thành công!")
        navigation.navigate('Setting');
    };
    return(
        <View style={{flex:1, alignItems: "center"}}>
            <TextInput 
                label={"Họ và tên"} 
                style={styles.input}
                value={fullname}
                onChangeText={setFullname}
            />
            <TextInput 
                label={"Email"} 
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput 
                label={"Số điện thoại"} 
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
            />
            <TextInput 
                label={"Địa chỉ"} 
                style={styles.input}
                value={address}
                onChangeText={setAddress}
            />
            <Button
                mode="contained"
                style={styles.button}
                onPress={handleUpdate}
            >
                Cập nhật
            </Button>
        </View>
    )
}
export default UpdateProfileAdmin
const styles = StyleSheet.create({
    icon: {
      width: 100,
      height: 100,
      margin:10
    },
    input: {
        borderRadius: 10,
        width: '90%',
        margin: 5,
        borderWidth: 0.5,
    },
    button: {
        width: "90%",
        borderRadius: 10,
        margin: 5,
        backgroundColor: "tomato"
    }
});