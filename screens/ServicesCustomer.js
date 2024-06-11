import React, { useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const Service = ({ title, prices, onPress }) => (
  <TouchableOpacity style={{flexDirection:"row",justifyContent:"space-between", borderRadius: 10, borderWidth:0.5, padding: 15, margin:10 }} onPress={onPress}>
    <Text style={{ fontSize: 20 }}>{title}</Text>
    <Text style={{ fontSize: 20, }}>{prices}_VNĐ</Text>
  </TouchableOpacity>
);

const ServicesCustomer = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const SERVICES = firestore().collection('SERVICES');

  useEffect(() => {
    const unsubscribe = SERVICES.onSnapshot((querySnapshot) => {
      const serviceList = [];
      querySnapshot.forEach((doc) => {
        const { title, prices, detail } = doc.data();
        serviceList.push({
          id: doc.id,
          title,
          prices,
          detail,
        });
      });
      setServices(serviceList);
    });

    return () => unsubscribe(); 
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require('../assets/logo.png')}
        style={{
          alignSelf: 'center',
          marginVertical: 50,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontSize: 40,
            fontWeight: 'bold',
            marginLeft: 6,
          }}
        >
          Danh sách dịch vụ
        </Text>
      </View>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Service title={item.title} prices={item.prices} onPress={() => navigation.navigate("MakeAppointment", item)}/>}
      />
    </View>
  );
};

export default ServicesCustomer
