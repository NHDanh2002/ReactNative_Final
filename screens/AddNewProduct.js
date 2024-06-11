import React, { useState } from "react";
import { View, Image, StyleSheet, ActivityIndicator, Alert, Platform } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';

const AddNewProduct = () => {
    const [imageUri, setImageUri] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [description, setDescription] = useState('');

    const selectImage = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
        };
        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.assets) {
                setImageUri(response.assets[0].uri);
            }
        });
    };

    const uploadImageAndAddProduct = async () => {
        if (!imageUri) {
            Alert.alert('Vui lòng chọn một ảnh trước khi tải lên!');
            return;
        }
        
        if (!productName || !productPrice) {
            Alert.alert('Vui lòng nhập tên và giá sản phẩm!');
            return;
        }

        const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;
        setUploading(true);
        setTransferred(0);

        const task = storage().ref(filename).putFile(uploadUri);

        task.on('state_changed', snapshot => {
            setTransferred(Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100));
        });

        try {
            await task;
            const downloadURL = await storage().ref(filename).getDownloadURL();

            await firestore().collection('PRODUCTS').add({
                name: productName,
                price: productPrice,
                image: downloadURL,
                description
            });

            Alert.alert('Thành công!', 'Sản phẩm đã được thêm.');
            setImageUri(null);
            setProductName('');
            setProductPrice('');
            setDescription('');
        } catch (e) {
            console.error(e);
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi tải lên hoặc thêm sản phẩm.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{fontSize:30,color:"tomato",fontWeight:"bold"}}>Thêm sản phẩm</Text>
            <TextInput 
                label={"Tên sản phẩm"} 
                style={styles.input}
                value={productName}
                onChangeText={setProductName}
            />
            <TextInput 
                label={"Mô tả"} 
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <TextInput 
                label={"Giá sản phẩm"} 
                style={styles.input}
                value={productPrice}
                onChangeText={setProductPrice}
            />
            <Button mode="contained" onPress={selectImage} style={styles.button}>
                Chọn ảnh
            </Button>
            {imageUri && (
                <Image
                    source={{ uri: imageUri }}
                    style={styles.image}
                />
            )}
            <Button 
                mode="contained" 
                onPress={uploadImageAndAddProduct} 
                disabled={uploading} 
                style={styles.button}
            >
                Thêm sản phẩm
            </Button>
            {uploading && (
                <View style={styles.uploading}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>{transferred} % Tải lên</Text>
                </View>
            )}
        </View>
    );
};

export default AddNewProduct;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    button: {
        width:"50%",
        margin: 10,
        backgroundColor: "tomato"
    },
    image: {
        width: 200,
        height: 200,
        margin: 10,
    },
    input: {
        borderRadius: 10,
        width: '90%',
        margin: 5,
        borderWidth: 0.5,
    },
    uploading: {
        alignItems: 'center',
        margin: 10,
    },
});


