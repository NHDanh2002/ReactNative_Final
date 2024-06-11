import { createStackNavigator } from "@react-navigation/stack";
import { useMyContextController } from "../store";
import { IconButton } from "react-native-paper";
import CustomerProducts from "../screens/CustomerProducts";
import ProductDetailCustomer from "../screens/ProductDetailCustomer";
import Cart from "../screens/Cart";
import { CartProvider } from "../screens/CartContext";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator()
const RouterMenuCustomer = () =>{
    const [controller, dispatch] = useMyContextController()
    const {userLogin} = controller

    return(
        <CartProvider>
                <Stack.Navigator
                    initialRouteName="CustomerProducts"
                    screenOptions={{
                        title: (userLogin!=null)&& (userLogin.name),
                        headerTitleAlign: 'center',
                        headerShown:false,
                        headerStyle: {
                            backgroundColor: "tomato"
                        },
                        headerRight: (props) => <IconButton icon={"account"}/>
                    }}
                >
                    <Stack.Screen name="CustomerProducts" component={CustomerProducts}/>
                    <Stack.Screen name="ProductDetailCustomer" component={ProductDetailCustomer}/>
                    <Stack.Screen name="Cart" component={Cart}/>
                </Stack.Navigator>
        </CartProvider>
    )
}
export default RouterMenuCustomer