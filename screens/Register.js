import { Alert, StyleSheet, View } from "react-native"
import { Button, HelperText, Text, TextInput } from "react-native-paper"
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useState } from "react";
import { CreateAccount } from "../store";

const Register = ({navigation}) =>{
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, SetPasswordConfirm] = useState("")
    const [hiddenPassword, setHiddenPassword] = useState(true)
    //const [hiddenPasswordConfirm, setHiddenPasswordConfirm] = useState(true)
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    const hasErrorFullname = () => fullname == ""
    const hasErrorEmail = () => !email.includes("@")
    const hasErrorPassword = () => password.length < 6
    const hasErrorPasswordConfirm = () => passwordConfirm != password
    const righticon = <TextInput.Icon icon="eye" onPress={() => setHiddenPassword(!hiddenPassword)}/>
    return(
        <View style={styles.container}>
            <Text style={styles.text}>
                Register New Account
            </Text>
            <TextInput 
                label={"Full Name"} 
                style={styles.input}
                value={fullname}
                onChangeText={setFullname}
            />
            <HelperText type="error" visible={hasErrorFullname()}>
                Full Name không được phép để trống
            </HelperText>
            <TextInput 
                label={"Email"} 
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />
            <HelperText type="error" visible={hasErrorEmail()}>
                Địa chỉ email không hợp lệ
            </HelperText>
            <TextInput
                label={"Password"}
                value={password}
                onChangeText={setPassword}
                style={styles.input} 
                secureTextEntry = {hiddenPassword}
                right={righticon}
            />
            <HelperText type="error" visible={hasErrorPassword()}>
                Password phải có ít nhất 6 kí tự
            </HelperText>
            <TextInput
                label={"Comfirm Password"}
                value={passwordConfirm}
                onChangeText={SetPasswordConfirm}
                style={styles.input} 
                secureTextEntry = {hiddenPassword}
                right={righticon}
            />
            <HelperText type="error" visible={hasErrorPasswordConfirm()}>
                Password không khớp
            </HelperText>
            <TextInput 
                label={"Address"} 
                style={styles.input}
                value={address}
                onChangeText={setAddress}
            />
            
            <TextInput 
                label={"Phone"} 
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
            />
            <Button style={styles.button} onPress={() => CreateAccount(fullname, email, password, phone, address)}>
                <Text style={styles.textbutton}>
                    Create Account
                </Text>
            </Button>
            <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                <Text>Bạn đã có tài khoản rồi</Text>
                <Button onPress={()=> navigation.navigate("Login")}>
                    Đăng nhập
                </Button>
            </View>
        </View>
    )
}
export default Register
const styles = StyleSheet.create({
    container: {
        flex:1, 
        justifyContent:'center',
        alignItems: 'center'
    },
    text: {
        textAlign: 'center',
        fontSize:20, 
        fontWeight:'bold', 
        color:"tomato",
    },
    input: {
        borderRadius: 10,
        width: '90%',
        margin: 5,
        borderWidth: 0.5,
    },
    button: {
        backgroundColor: "tomato",
        width: '90%',
        height: '7%',
        borderRadius: 10,
        justifyContent:'center',
        marginTop: 5,
    },
    textbutton: {
        fontSize: 20,
        color: "white",
    }
})