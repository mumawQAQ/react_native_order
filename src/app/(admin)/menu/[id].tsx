import {ActivityIndicator, Pressable, StyleSheet, Text, View} from "react-native";
import {Link, Stack, useLocalSearchParams, useRouter} from "expo-router";
import React, {useState} from "react";
import {useCart} from "@/src/providers/CartProvider";
import {PizzaSize} from "@/src/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/src/constants/Colors";
import {useProduct} from "@/src/api/products";
import {defaultPizzaImg} from "@/src/components/ProductListItem";
import RemoteImage from "@/src/components/RemoteImage";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];
const ProductDetailScreen = () => {
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
            <RemoteImage path={product && product.image ? product.image : ''} fallback={defaultPizzaImg}
                         style={styles.image}
                         resizeMode='contain'/>
            <Text style={styles.title}>{product ? product.name : "Product not exist"}</Text>
            <Text style={styles.price}>${product ? product.price : 0}</Text>
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
