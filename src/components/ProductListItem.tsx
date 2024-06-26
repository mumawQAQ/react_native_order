import {Pressable, StyleSheet} from "react-native";
import Colors from "@/src/constants/Colors";
import {Text} from "@/src/components/Themed";
import {Link, useSegments} from "expo-router";
import {Product} from "@/src/types";
import RemoteImage from "@/src/components/RemoteImage";

type ProductListItemProps = {
    product: Product;
}

export const defaultPizzaImg = "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";
const ProductListItem = ({product}: ProductListItemProps) => {
    const segments = useSegments();
    return (
        // @ts-ignore
        <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
            <Pressable style={styles.container}>
                <RemoteImage
                    path={product.image || ''}
                    fallback={defaultPizzaImg}
                    style={styles.image}
                    resizeMode='contain'
                />
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.price}>${product.price}</Text>
            </Pressable>
        </Link>
    )
}

export default ProductListItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        flex: 1,
        maxWidth: '50%',
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
