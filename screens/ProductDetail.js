import { useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, View } from "react-native"
import { Button, Text, TextInput } from "react-native-paper"
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const ProductDetail = ({navigation, route}) =>{
    const { id, name: initialTitle, price: initialPrices, description: initialDetail, image: initialImage } = route.params;
    const [name, setName] = useState(initialTitle);
    const [price, setPrice] = useState(initialPrices);
    const [description, setDescription] = useState(initialDetail);
    const [image, setImage] = useState(initialImage);

    const handleUpdate = async () => {
        await firestore().collection('PRODUCTS').doc(id).update({
            name,
            price,
            description,
            image
        });
        Alert.alert("Cập nhật thành công!")
        navigation.navigate('Products');
    };

    const handleDelete = async () => {
      try {
          if (image) {
              const imageRef = storage().refFromURL(image);
              await imageRef.delete();
          }
          await firestore().collection('PRODUCTS').doc(id).delete();
          
          Alert.alert("Xóa sản phẩm thành công!");
          navigation.navigate('Products');
      } catch (error) {
          console.error("Error deleting product: ", error);
          Alert.alert("Lỗi", "Có lỗi xảy ra khi xóa sản phẩm.");
      }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.text}>Chi tiết sản phẩm</Text>
          <Image
              style={{width:180, height:180}}
              source={{
                  uri: image,
              }}
          />
          <TextInput
            label="Tên sản phẩm"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            label="Giá"
            style={styles.input}
            value={price}
            onChangeText={setPrice}
          />
          <TextInput
            label="Mô tả"
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <Button style={styles.button} onPress={handleUpdate}>
            <Text style={styles.textButton}>Cập nhật</Text>
          </Button>
          <Button style={styles.button} onPress={handleDelete}>
            <Text style={styles.textButton}>Xóa sản phẩm</Text>
          </Button>
          <Button style={styles.button} onPress={()=>navigation.navigate("Products")}>
            <Text style={styles.textButton}>Hủy</Text>
          </Button>
        </ScrollView>
      );
    };
    
    export default ProductDetail;
    
    const styles = StyleSheet.create({
      container: {
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'tomato',
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
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        marginTop: 5,
      },
      textButton: {
        fontSize: 20,
        color: 'white',
      },
    });