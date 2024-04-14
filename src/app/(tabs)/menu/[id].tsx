import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {Stack, useLocalSearchParams} from "expo-router";
import products from "@/assets/data/products";
import {useState} from "react";
import Button from "@/src/components/Button";


const ProductDetailScreen = () => {
    const sizes = ["S", "M", "L", "XL"];
    const {id} = useLocalSearchParams()
    const [selectedSize, setSelectedSize] = useState(sizes[0]);
    const product = products.find(p => p.id.toString() === id);
    const addToCart = () => {
        console.warn("Add to cart", product, selectedSize);
    }

    if (!product) {
        return (
            <View>
                <Text>Product not found</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: "Details: " + id}}/>
            <Image source={{uri: product.image}} style={styles.image} resizeMode='contain'/>
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
            <Text style={styles.price}>${product.price}</Text>
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