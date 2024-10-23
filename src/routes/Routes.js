import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import DrawerStack from './DrawerStack';
import { useSelector } from 'react-redux';


const Stack = createStackNavigator();

function Routes() {

    const { token } = useSelector(state => state.persistedData)

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='authStack'>
                {token ?
                    <Stack.Screen name="DrawerStack" component={DrawerStack} />
                    :
                    <Stack.Screen name="authStack" component={AuthStack} />
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes
