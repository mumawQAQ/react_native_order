import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {Link, Stack, useLocalSearchParams, useRouter} from "expo-router";
import products from "@/assets/data/products";
import React, {useState} from "react";
import {useCart} from "@/src/providers/CartProvider";
import {PizzaSize} from "@/src/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/src/constants/Colors";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];
const ProductDetailScreen = () => {
    const {id} = useLocalSearchParams()
    const {addItem} = useCart();
    const router = useRouter()
    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
    const product = products.find(p => p.id.toString() === id);
    const addToCart = () => {
        if (!product) {
            return;
        }
        addItem(product, selectedSize);
        router.push('/cart')
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
            <Stack.Screen options={{
                title: "Menu", headerRight: () => (
                    <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                        <Pressable>
                            {({pressed}) => (
                                <FontAwesome
                                    name="pencil"
                                    size={25}
                                    color={Colors.light.tint}
                                    style={{marginRight: 15, opacity: pressed ? 0.5 : 1}}
                                />
                            )}
                        </Pressable>
                    </Link>)
            }}/>
            <Image source={{uri: product.image}} style={styles.image} resizeMode='contain'/>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
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
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});
export default ProductDetailScreen;
