import React, { useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const Product = ({ name, price, image, onPress }) => (
  <TouchableOpacity style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center", borderRadius: 10, borderWidth:0.5, padding: 15, margin:10 }} onPress={onPress}>
    <Image
        style={{width:80, height:80}}
        source={{
            uri: image,
        }}
    />
    <Text style={{ fontSize: 20 }}>{name}</Text>
    <Text style={{ fontSize: 20, }}>{price} VNĐ</Text>
  </TouchableOpacity>
);

const Products = ({ navigation, route }) => {
  const [products, setProducts] = useState([]);
  const PRODUCTS = firestore().collection('PRODUCTS');

  useEffect(() => {
    const unsubscribe = PRODUCTS.onSnapshot((querySnapshot) => {
      const productlist = [];
      querySnapshot.forEach((doc) => {
        const { name, price, description, image } = doc.data();
        productlist.push({
          id: doc.id,
          name,
          price,
          description,
          image
        });
      });
      setProducts(productlist);
    });

    return () => unsubscribe(); 
  }, []);

  useEffect(() => {
    if (route.params?.newProduct) {
      setProducts((prevProducts) => [...prevProducts, route.params.newProduct]);
    }
  }, [route.params?.newProduct]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontSize: 35,
            fontWeight: 'bold',
            marginLeft: 6,
          }}
        >
          Thêm sản phẩm mới
        </Text>
        <IconButton
          icon="plus-circle"
          iconColor="green"
          size={40}
          onPress={() => navigation.navigate('AddNewProduct')}
        />
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Product name={item.name} price={item.price} image={item.image} onPress={() => navigation.navigate('ProductDetail', item)}/>}
      />
    </View>
  );
};

export default Products;
