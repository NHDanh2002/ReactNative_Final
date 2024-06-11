import React, { useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from '../store';


const MyAppointment = ({ email, state, serviceName, datetime }) => (
  <View style={{borderRadius: 10, borderWidth:0.5, padding: 15, margin:10 }}>
    <Text style={{ fontSize: 20 }}>Người đặt: {email}</Text>    
    <Text style={{ fontSize: 20, }}>Dịch vụ: {serviceName}</Text>
    <Text style={{ fontSize: 20, }}>Ngày bắt đầu: {new Date(datetime).toDateString()}</Text>
    <Text style={{ fontSize: 20, }}>Tình trạng: {state}</Text>
  </View>
);

const Appointment = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]);
  const APPOINTMENTS = firestore().collection('APPOINTMENTS');
  const [controller, dispatch] = useMyContextController()
  const {userLogin} = controller
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = APPOINTMENTS.where('email', '==', userLogin.email).onSnapshot((querySnapshot) => {
      const appointmentList = [];
      querySnapshot.forEach((doc) => {
        const { datetime, email, serviceName, state } = doc.data();
        if (email === userLogin.email) {
          appointmentList.push({
            id: doc.id,
            date: datetime.toDate(),
            email,
            serviceName,
            state
          });
        }
      });
      setAppointments(appointmentList);
      console.log(appointmentList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  return (
    <View style={{ flex: 1 }}>
        <Text
            style={{
            alignSelf:"center",
            fontSize: 30,
            fontWeight: 'bold',
            marginLeft: 6,
            }}
        >
            Danh sách lịch đã đặt
        </Text>
        <FlatList
            data={appointments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MyAppointment email={item.email} state={item.state} serviceName={item.serviceName} datetime={item.date}/>}
        />
    </View>
  );
};

export default Appointment

