import {FlatList, Platform, StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useCart} from "@/src/providers/CartProvider";
import CardListItem from "@/src/components/CardListItem";
import Button from "@/src/components/Button";

const CartScreen = () => {
    const {items, total} = useCart()
    return (
        <View style={{}}>
            <FlatList
                data={items}
                renderItem={({item}) => <CardListItem cartItem={item}/>}
                contentContainerStyle={{padding: 10, gap: 10}}
            />

            <Text style={styles.total}>Total: ${total}</Text>
            <Button text="Checkout"/>

            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
        </View>
    )
};

export default CartScreen;


const styles = StyleSheet.create({
    total: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: '500'
    }
});
