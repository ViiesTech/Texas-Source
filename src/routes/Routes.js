import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='authStack'>
                <Stack.Screen name="authStack" component={AuthStack} />
                <Stack.Screen name="mainStack" component={MainStack} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes
