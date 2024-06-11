import { createStackNavigator } from "@react-navigation/stack";
import { useMyContextController } from "../store";
import { IconButton } from "react-native-paper";
import Products from "../screens/Products";
import AddNewProduct from "../screens/AddNewProduct";
import ProductDetail from "../screens/ProductDetail";

const Stack = createStackNavigator()
const RouterProduct = () =>{
    const [controller, dispatch] = useMyContextController()
    const {userLogin} = controller

    return(
        <Stack.Navigator
            initialRouteName="Products"
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
            <Stack.Screen name="Products" component={Products}/>
            <Stack.Screen name="AddNewProduct" component={AddNewProduct}/>
            <Stack.Screen name="ProductDetail" component={ProductDetail}/>
        </Stack.Navigator>
    )
}
export default RouterProduct