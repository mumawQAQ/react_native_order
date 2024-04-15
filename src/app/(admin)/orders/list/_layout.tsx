import OrdersScreen from "./index";
import ArchiveScreen from "./archive";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SafeAreaView} from "react-native-safe-area-context";


const Tab = createMaterialTopTabNavigator();

export default function OrderListNavigator() {
    return (
        <SafeAreaView edges={['top']} style={{flex: 1, backgroundColor: 'white'}}>
            <Tab.Navigator>
                <Tab.Screen name='index' component={OrdersScreen}/>
                <Tab.Screen name='archive' component={ArchiveScreen}/>
            </Tab.Navigator>
        </SafeAreaView>
    );
}
