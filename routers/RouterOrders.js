import { createStackNavigator } from "@react-navigation/stack";
import OrderList from "../screens/OrderList";
import OrderDetail from "../screens/OrderDetail";

const Stack = createStackNavigator()

const RouterOrders = ()=>{
    return(
        <Stack.Navigator
            initialRouteName="OrderList"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="OrderList" component={OrderList}/>
            <Stack.Screen name="OrderDetail" component={OrderDetail}/>
            
        </Stack.Navigator>
    )
}
export default RouterOrders