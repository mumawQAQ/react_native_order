import {Alert, Image, StyleSheet, Text, TextInput, View} from "react-native";
import {Stack, useLocalSearchParams, useRouter} from "expo-router";
import Button from '@/src/components/Button';
import {useEffect, useState} from "react";
import {defaultPizzaImg} from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import * as ImagePicker from 'expo-image-picker';
import {useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct} from "@/src/api/products";


const CreateProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const {id: idString} = useLocalSearchParams()
    const id = parseFloat(typeof idString === 'string' ? idString : idString[0])
    const isUpdating = !!id;

    const {mutate: insertProduct} = useInsertProduct();
    const {mutate: updateProduct} = useUpdateProduct();
    const {mutate: deleteProduct} = useDeleteProduct();
    const {data: updatingProduct} = useProduct(id);

    const router = useRouter()

    useEffect(() => {
        if (updatingProduct) {
            setName(updatingProduct.name);
            setPrice(updatingProduct.price.toString());
            setImage(updatingProduct.image);
        }
    }, [updatingProduct]);


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

    const onDelete = () => {
        deleteProduct(id, {
            onSuccess: () => {
                resetFields()
                router.replace('/(admin)')
            }
        })
    }
    const confirmDelete = () => {
        Alert.alert('Confirm', 'Are you sure you want to delete this product?', [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: onDelete
            }
        ])
    }

    const onSubmit = () => {
        if (isUpdating) {
            onUpdate();
        } else {
            onCreate();
        }
    }

    const onUpdate = () => {
        if (!validateInput()) {
            return;
        }
        updateProduct({
            id,
            name,
            price: parseFloat(price),
            image,
        }, {
            onSuccess: () => {
                resetFields()
                router.back()
            }
        })
    }

    const onCreate = () => {
        if (!validateInput()) {
            return;
        }

        insertProduct({
            name,
            price: parseFloat(price),
            image
        }, {
            onSuccess: () => {
                resetFields()
                router.back()
            }
        })
    }
    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: isUpdating ? 'Update Product' : 'Create Product'}}/>
            <Image source={{uri: image || defaultPizzaImg}} style={styles.image}/>
            <Text style={styles.textButton} onPress={pickImage}>Select Image</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName}/>

            <Text style={styles.label}>Price ($)</Text>
            <TextInput placeholder="9.99" style={styles.input} keyboardType="numeric" value={price}
                       onChangeText={setPrice}/>

            <Text style={styles.errors}>{errors}</Text>

            <Button text={isUpdating ? "Update" : "Create"} onPress={onSubmit}/>
            {isUpdating && <Text onPress={confirmDelete} style={styles.textButton}>Delete</Text>}
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
