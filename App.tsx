import Router from "./routers/Router"
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useEffect } from "react";
import { MyContextControllerProvider } from "./store";
import { NavigationContainer } from "@react-navigation/native";

const App = () =>{
  const USERS = firestore().collection("USERS")
  const admin = {
    fullname: "Admin",
    email: "admin1@gmail.com",
    password: "1234567",
    phone: "0913214555",
    address: "Bình Dương",
    role: "admin"
  }
  useEffect(() => {
    USERS.doc(admin.email)
    .onSnapshot(
      u => {
        if(!u.exists)
        {
          auth().createUserWithEmailAndPassword(admin.email, admin.password)
          .then(() => 
            {
              USERS.doc(admin.email).set(admin)
              console.log("Add new account admin")
            }
          )
        }
      }
    )
  })
  return(
    <MyContextControllerProvider>
      <NavigationContainer>
        <Router/>
      </NavigationContainer>
    </MyContextControllerProvider>
  )
}
export default App;