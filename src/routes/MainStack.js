import { createStackNavigator } from '@react-navigation/stack';
import Explore1 from '../screens/mainScreens/Explore1';
import Explore2 from '../screens/mainScreens/Explore2';

const Stack = createStackNavigator();

function MainStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='explore1'>
            <Stack.Screen name="explore1" component={Explore1} />
            <Stack.Screen name="explore2" component={Explore2} />
        </Stack.Navigator>
    );
}

export default MainStack