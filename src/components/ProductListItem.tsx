import {Image, StyleSheet, View} from "react-native";
import Colors from "@/src/constants/Colors";
import {Text} from "@/src/components/Themed";
import {Product} from "@/src/types";

type ProductListItemProps = {
    product: Product;
}

const defaultImg = "'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";
const ProductListItem = ({product}: ProductListItemProps) => {
    return (
        <View style={styles.container}>
            <Image source={{uri: product.image || defaultImg}} style={styles.image}/>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
        </View>
    )
}

export default ProductListItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.background,
        padding: 10,
        borderRadius: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 10,
    },
    price: {
        color: Colors.light.tint,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    }
});