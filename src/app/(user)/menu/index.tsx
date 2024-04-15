import {Text, View} from '@/src/components/Themed';
import ProductListItem from "@/src/components/ProductListItem";
import {ActivityIndicator, FlatList} from "react-native";
import {useProductList} from "@/src/api/products";

export default function TabOneScreen() {

    const {data: product, error, isLoading} = useProductList();
    
    if (isLoading) {
        return <ActivityIndicator/>
    }

    if (error) {
        return <Text>{error.message}</Text>
    }

    return (
        <View>
            <FlatList
                data={product}
                renderItem={({item}) => <ProductListItem product={item}/>}
                numColumns={2}
                contentContainerStyle={{gap: 10, padding: 10}}
                columnWrapperStyle={{gap: 10}}
            />
        </View>
    );
}


