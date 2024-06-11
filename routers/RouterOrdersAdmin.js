import { createStackNavigator } from "@react-navigation/stack";
import OrdersAdmin from "../screens/OrdersAdmin";
import OrderDetailAdmin from "../screens/OrderDetailAdmin";

const Stack = createStackNavigator()

const RouterOrdersAdmin = ()=>{
    return(
        <Stack.Navigator
            initialRouteName="OrdersAdmin"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="OrdersAdmin" component={OrdersAdmin}/>
            <Stack.Screen name="OrderDetailAdmin" component={OrderDetailAdmin}/>
            
        </Stack.Navigator>
    )
}
export default RouterOrdersAdmin