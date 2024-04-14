import {Image, StyleSheet, View} from "react-native";
import Colors from "@/src/constants/Colors";
import {Text} from "@/src/components/Themed";

const ProductListItem = ({product}) => {
    return (
        <View style={styles.container}>
            <Image source={{uri: product.image}} style={styles.image}/>
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