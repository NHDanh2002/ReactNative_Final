import { useEffect, useState } from "react";
import { logout, useMyContextController } from "../store";
import { Image, StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const Setting = ({navigation}) => {
    const [controller, dispatch] = useMyContextController()
    const {userLogin} = controller
    const [fullname, setFullname] = useState(userLogin?.fullname || '');
    const [email, setEmail] = useState(userLogin?.email || '');
    const [phone, setPhone] = useState(userLogin?.phone || '');
    const [address, setAddress] = useState(userLogin?.address || '');
    const handleLogout = () => {
        logout(dispatch);
        navigation.navigate("Login");
    }
    useEffect(() => {
        if (!userLogin) {
            navigation.navigate("Login");
        }
        else{
            setFullname(userLogin.fullname || '');
            setEmail(userLogin.email || '');
            setPhone(userLogin.phone || '');
            setAddress(userLogin.address || '');
        }
    }, [userLogin]);
    return(
        <View style={{flex:1,justifyContent:"center", alignItems: "center"}}>
            <Image
                source={require('../assets/man.png')}
                style={styles.icon}
            />
            <TextInput 
                label={"Họ và tên"} 
                style={styles.input}
                value={fullname}
                editable={false}
            />
            <TextInput 
                label={"Email"} 
                style={styles.input}
                value={email}
                editable={false}
            />
            <TextInput 
                label={"Số điện thoại"} 
                style={styles.input}
                value={phone}
                editable={false}
            />
            <TextInput 
                label={"Địa chỉ"} 
                style={styles.input}
                value={address}
                editable={false}
            />
            <Button
                mode="contained"
                style={styles.button}
                onPress={()=> navigation.navigate("UpdateProfile")}
            >
                Cập nhật thông tin
            </Button>
            <Button
                mode="contained"
                style={styles.button}
                onPress={handleLogout}
            >
                Đăng xuất
            </Button>
        </View>
    )
}
export default Setting
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