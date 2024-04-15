import {ActivityIndicator, Pressable, StyleSheet, Text, View} from "react-native";
import {Stack, useLocalSearchParams, useRouter} from "expo-router";
import React, {useState} from "react";
import Button from "@/src/components/Button";
import {useCart} from "@/src/providers/CartProvider";
import {PizzaSize} from "@/src/types";
import {useProduct} from "@/src/api/products";
import {defaultPizzaImg} from "@/src/components/ProductListItem";
import RemoteImage from "@/src/components/RemoteImage";


const ProductDetailScreen = () => {
    const sizes: PizzaSize[] = ["S", "M", "L", "XL"];
    const {id: idString} = useLocalSearchParams()
    const id = parseInt(typeof idString === 'string' ? idString : idString[0]);
    const {data: product, error, isLoading} = useProduct(id);


    const {addItem} = useCart();
    const router = useRouter()
    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
    const addToCart = () => {
        if (!product) {
            return;
        }
        addItem(product, selectedSize);
        router.push('/cart')
    }

    if (isLoading) {
        return <ActivityIndicator/>
    }

    if (error) {
        return <Text>{error.message}</Text>
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: "Details: " + id}}/>
            <RemoteImage path={product && product.image ? product.image : ''} fallback={defaultPizzaImg}
                         style={styles.image}
                         resizeMode='contain'/>
            <Text>Select Size</Text>
            <View style={styles.sizes}>
                {sizes.map(size => (
                    <Pressable
                        onPress={() => setSelectedSize(size)}
                        style={[styles.size, {backgroundColor: selectedSize == size ? 'gainsboro' : 'white'}]}
                        key={size}
                    >
                        <Text style={[styles.sizeText, {color: selectedSize == size ? 'black' : 'gray'}]}>{size}</Text>
                    </Pressable>
                ))}
            </View>
            <Text style={styles.price}>${product ? product.price : 0}</Text>
            <Button text="Add to Cart" onPress={addToCart}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: "auto"
    },
    sizes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    size: {
        backgroundColor: 'gainsboro',
        width: 50,
        aspectRatio: 1,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sizeText: {
        fontSize: 20,
        fontWeight: '500',
    },
});
export default ProductDetailScreen;
