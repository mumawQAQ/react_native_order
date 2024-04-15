import {Image, StyleSheet, Text, TextInput, View} from "react-native";
import {Stack} from "expo-router";
import Button from '@/src/components/Button';
import {useState} from "react";
import {defaultPizzaImg} from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import * as ImagePicker from 'expo-image-picker';


const CreateProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    const resetFields = () => {
        setName('');
        setPrice('');
    }

    const validateInput = () => {
        if (!name || !price) {
            setErrors('Please fill all fields');
            return false;
        }
        if (!price) {
            setErrors('Please fill price');
            return false;
        }
        if (isNaN(parseFloat(price))) {
            setErrors('Price must be a number');
            return false;
        }
        return true;
    }

    const onCreate = () => {
        if (!validateInput()) {
            return;
        }

        resetFields()
    }
    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: 'Create Product'}}/>
            <Image source={{uri: image || defaultPizzaImg}} style={styles.image}/>
            <Text style={styles.textButton} onPress={pickImage}>Select Image</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName}/>

            <Text style={styles.label}>Price ($)</Text>
            <TextInput placeholder="9.99" style={styles.input} keyboardType="numeric" value={price}
                       onChangeText={setPrice}/>

            <Text style={styles.errors}>{errors}</Text>

            <Button text={"Create"} onPress={onCreate}/>
        </View>
    );
};
export default CreateProductScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
    label: {
        color: 'gray',
        fontSize: 16,
    },
    errors: {
        color: 'red',
        marginBottom: 10,
    }
});
