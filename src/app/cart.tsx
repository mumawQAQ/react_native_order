import {FlatList, Platform, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useCart} from "@/src/providers/CartProvider";
import CardListItem from "@/src/components/CardListItem";

const CartScreen = () => {
    const {items} = useCart()
    return (
        <View>
            <FlatList
                data={items}
                renderItem={({item}) => <CardListItem cartItem={item}/>}
                contentContainerStyle={{padding: 10, gap: 10}}
            />
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
        </View>
    )
};

export default CartScreen;