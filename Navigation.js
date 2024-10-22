import React, {useEffect} from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatList from './screens/ChatList';
import Chat from './screens/Chat';
import Settings from './screens/Settings';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import {Ionicons} from '@expo/vector-icons'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const TabsNavigator = () => {
    const navigation = useNavigation()
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
              navigation.navigate('SignUp');
            }
        })

        return () => unsubscribe();
    }, [auth, navigation])
    return(
        <Tabs.Navigator screenOptions = {({route}) => ({
            tabBarIcon:({focused, color, size}) => {
                return <Ionicons name = {route.name === "Chat List"? "chatbubbles" : "settings"} color = {color} size = {size}/>
            },
            tabBarActiveTintColor: '#8e24aa',
        })}>
            <Tabs.Screen name="Chat List" component={ChatList} />
            <Tabs.Screen name="Ayarlar" component={Settings}  />
        </Tabs.Navigator>
    )
};
const Navigation = () => {
    return (
            <Stack.Navigator>
                <Stack.Screen name="Main" component={TabsNavigator} 
                options={{headerShown: false}}/>
                <Stack.Screen name="Chat" component={Chat} options={{presentation:'Modal', headerShown:"false"}}/>
                <Stack.Screen name="SignUp" component={SignUp} options={{presentation:'fullScreenModal', headerShown:"false"}}/>
                <Stack.Screen name="SignIn" component={SignIn} options={{presentation:'fullScreenModal', headerShown:"false"}}/>
            </Stack.Navigator>

    );
}

export default Navigation;
