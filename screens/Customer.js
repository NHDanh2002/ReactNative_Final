import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { Divider, Text} from "react-native-paper"
import Routercustomers from "../routers/RouterCustomers"
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator} from "@react-navigation/drawer"
import { useMyContextController } from "../store"
import { useEffect, useState } from "react"
import RouterSetting from "../routers/RouterSetting"
import RouterMenuCustomer from "../routers/RouterMenuCustomer"
import Cart from "./Cart"
import OderList from "./OrderList"
import RouterOrders from "../routers/RouterOrders"
const CustomDrawer = props =>{
    const [controller, dispatch] = useMyContextController()
    const {userLogin} = controller 
    const [fullname, setFullname] = useState(userLogin?.fullname || '');
    const [role, setRole] = useState(userLogin?.role || '');
    useEffect(() => {
        if (userLogin) {
            setFullname(userLogin.fullname || '');
        }
    }, [userLogin]);
    return(
        <DrawerContentScrollView {...props}>
            <View style={{flexDirection:"row", margin: 10}}>
                <Image
                    source={require('../assets/man.png')}
                    style={{height:60, width: 60}}
                />
                <View style={{justifyContent:"center", paddingLeft: 20}}>
                    <Text style={{marginBottom:5, fontSize:23}}>
                        {fullname}
                    </Text>
                    <Text style={{fontSize:18, color:"gray"}}>
                        {role}
                    </Text>
                </View>
            </View>
            <Divider/>
            <DrawerItemList {...props}/>
            <Divider/>
            <Image
                source={require('../assets/logofoot.png')}
                style={{
                    alignSelf: 'center',
                }}
            />
        </DrawerContentScrollView>
    )
}

const Drawer = createDrawerNavigator()

const Customer = () =>{
    return(
        <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props}/>}>
            <Drawer.Screen name="RouterMenuCustomer" component={RouterMenuCustomer}
                options={{
                    drawerLabel: "Menu",
                    headerTitle: "Sản phẩm",
                    drawerIcon: ({ tintColor }) => (
                        <Image
                          source={require('../assets/menu.png')}
                          style={[styles.icon, { tintColor: tintColor }]}
                        />
                    ),
                }}
            />
            <Drawer.Screen name="Cart" component={Cart}
                options={{
                    drawerLabel: "Giỏ hàng",
                    headerTitle: "Giỏ hàng",
                    drawerIcon: ({ tintColor }) => (
                        <Image
                          source={require('../assets/oders.png')}
                          style={[styles.icon, { tintColor: tintColor }]}
                        />
                    ),
                }}
            />
            <Drawer.Screen name="RouterOrders" component={RouterOrders}
                options={{
                    drawerLabel: "Danh sách đơn hàng",
                    headerTitle: "Danh sách đơn hàng",
                    drawerIcon: ({ tintColor }) => (
                        <Image
                          source={require('../assets/list.png')}
                          style={[styles.icon, { tintColor: tintColor }]}
                        />
                    ),
                }}
            />
            <Drawer.Screen name="RouterSetting" component={RouterSetting}
                options={{
                    drawerLabel: "Setting",
                    headerTitle: "Thông tin cá nhân",
                    drawerIcon: ({ tintColor }) => (
                        <Image
                            source={require('../assets/setting.png')}
                            style={[styles.icon, { tintColor: tintColor }]}
                        />
                    ),
                }}
            />
        </Drawer.Navigator>
    )
}
export default Customer
const styles = StyleSheet.create({
    icon: {
      width: 24,
      height: 24,
    },
});