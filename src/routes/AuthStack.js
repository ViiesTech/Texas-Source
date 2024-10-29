import { createStackNavigator } from '@react-navigation/stack';
import GetStarted from '../screens/authScreens/GetStarted';
import Login from '../screens/authScreens/Login';
import SocialLogin from '../screens/authScreens/SocialLogin';
import Signup from '../screens/authScreens/Signup';
import EmailVerify from '../screens/authScreens/EmailVerify';
import Verified from '../screens/authScreens/Verified';
import SelectRole from '../screens/authScreens/SelectRole';
import ForgetPassword from '../screens/authScreens/ForgetPassword';
import ChangePassword from '../screens/authScreens/ChangePassword';

const Stack = createStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='getStarted'>
            <Stack.Screen name="getStarted" component={GetStarted} />
            <Stack.Screen name="socialLogin" component={SocialLogin} />
            {/* <Stack.Screen name="SelectRole" component={SelectRole} /> */}
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signup" component={Signup} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
            <Stack.Screen name="emailVerify" component={EmailVerify} />
            <Stack.Screen name="verified" component={Verified} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
        </Stack.Navigator>
    );
}

export default AuthStack