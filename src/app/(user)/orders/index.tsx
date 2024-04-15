import OrderListItem from '../../../components/OrderListItem';
import {Stack} from 'expo-router';
import {ActivityIndicator, FlatList, Text} from "react-native";
import {useMyOrdersList} from "@/src/api/orders";

export default function OrdersScreen() {
    const {data: orders, error, isLoading} = useMyOrdersList();
    if (isLoading) return <ActivityIndicator/>;
    if (error) return <Text>Error: {error.message}</Text>;

    return (
        <>
            <Stack.Screen options={{title: 'Orders'}}/>
            <FlatList
                data={orders}
                contentContainerStyle={{gap: 10, padding: 10}}
                renderItem={({item}) => <OrderListItem order={item}/>}
            />
        </>
    );
}
