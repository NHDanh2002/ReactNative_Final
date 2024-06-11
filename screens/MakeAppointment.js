import { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native"
import { Button, Text, TextInput } from "react-native-paper"
import firestore from '@react-native-firebase/firestore';
import DatePicker from "react-native-date-picker";
import { useMyContextController } from "../store";

const MakeAppointment = ({navigation, route}) =>{
    const { id, title: initialTitle, prices: initialPrices, detail: initialDetail } = route.params;
    const [datetime, setDatetime] = useState(new Date());
    const [title, setTitle] = useState(initialTitle);
    const [prices, setPrices] = useState(initialPrices);
    const [detail, setDetail] = useState(initialDetail);
    const [open, setOpen] = useState(false)
    const [controller, dispatch] = useMyContextController()
    const {userLogin} = controller
    
    const APPOINTMENTS = firestore().collection("APPOINTMENTS")
    const handleSubmit = () => {
        APPOINTMENTS.add({
            email: userLogin.email,
            serviceID: id,
            serviceName: title,
            datetime,
            state: "new"
        })
        Alert.alert("Đặt lịch thành công")
        navigation.navigate("ServicesCustomer")
    }

    return (
        <View style={styles.container}>
          <Text style={styles.text}>Đặt lịch</Text>
          <TextInput
            label="Tên dịch vụ"
            style={styles.input}
            value={title}
            editable={false}
            onChangeText={setTitle}
          />
          <TextInput
            label="Giá"
            style={styles.input}
            value={prices}
            editable={false}
            onChangeText={setPrices}
          />
          <TextInput
            label="Mô tả"
            style={styles.input}
            value={detail}
            editable={false}
            onChangeText={setDetail}
          />
          <DatePicker
            modal
            open={open}
            date={datetime}
            onConfirm={(date) => {
                setOpen(false)
                setDatetime(date)
            }}
            onCancel={() => {
                setOpen(false)
            }}
          />
          <TouchableOpacity style={{
            margin: 10,
            padding: 10
          }} onPress={() => setOpen(true)}>
            <Text style={{fontSize:20}}>Chọn ngày:{datetime.toDateString()}</Text>
          </TouchableOpacity>
          <Button style={styles.button} onPress={handleSubmit}>
            <Text style={styles.textButton}>Đặt lịch</Text>
          </Button>
        </View>
      );
    };
    
    export default MakeAppointment;
    
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