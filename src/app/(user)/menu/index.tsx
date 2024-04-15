import {View} from '@/src/components/Themed';
import products from "@/assets/data/products";
import ProductListItem from "@/src/components/ProductListItem";
import {FlatList} from "react-native";

export default function TabOneScreen() {
    return (
        <View>
            <FlatList
                data={products}
                renderItem={({item}) => <ProductListItem product={item}/>}
                numColumns={2}
                contentContainerStyle={{gap: 10, padding: 10}}
                columnWrapperStyle={{gap: 10}}
            />
        </View>
    );
}


