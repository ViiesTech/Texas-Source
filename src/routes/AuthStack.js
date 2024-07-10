import { createStackNavigator } from '@react-navigation/stack';
import GetStarted from '../screens/authScreens/GetStarted';
import Login from '../screens/authScreens/Login';
import SocialLogin from '../screens/authScreens/SocialLogin';
import Signup from '../screens/authScreens/Signup';
import EmailVerify from '../screens/authScreens/EmailVerify';
import Verified from '../screens/authScreens/Verified';

const Stack = createStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='getStarted'>
            <Stack.Screen name="getStarted" component={GetStarted} />
            <Stack.Screen name="socialLogin" component={SocialLogin} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signup" component={Signup} />
            <Stack.Screen name="emailVerify" component={EmailVerify} />
            <Stack.Screen name="verified" component={Verified} />
        </Stack.Navigator>
    );
}

export default AuthStack