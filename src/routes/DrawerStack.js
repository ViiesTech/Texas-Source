import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Explore1 from '../screens/mainScreens/Explore1';
import Explore2 from '../screens/mainScreens/Explore2';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../assets/Utils/Colors';
import { drawerItems, responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils';
import { Images } from '../assets/Images/Index';
import DrawerIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import LogoutIcon from 'react-native-vector-icons/AntDesign'
import Cart from '../screens/mainScreens/Cart';
import Payment from '../screens/mainScreens/Payment';
import MyOrder from '../screens/mainScreens/MyOrder';
import Dashboard from '../screens/mainScreens/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../redux/Slice';
import { ShowToast } from '../GlobalFunctions/ShowToast';
import AddProduct from '../screens/mainScreens/AddProduct';
import MyProduct from '../screens/mainScreens/MyProduct';
import Profile from '../screens/mainScreens/Profile';
import ProductDetail from '../screens/mainScreens/ProductDetail';
import ChangePassword from '../screens/authScreens/ChangePassword';
import EditProfile from '../screens/mainScreens/EditProfile';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='explore1'>
            <Stack.Screen name="explore1" component={Explore1} />
            <Stack.Screen name="explore2" component={Explore2} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="MyOrder" component={MyOrder} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="AddProduct" component={AddProduct} />
            <Stack.Screen name="MyProduct" component={MyProduct} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
        </Stack.Navigator>
    );
}

const DrawerStack = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerStyle: { width: responsiveWidth(75) }
            }}
            drawerContent={props => {
                return <CustomDrawerContent {...props} />
            }}
        >
            <Drawer.Screen name="MainStack" component={MainStack} />
        </Drawer.Navigator>
    );
}

const CustomDrawerContent = () => {

    const { user, baseUrl } = useSelector(state => state.persistedData)

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const onLogoutPress = async () => {
        await dispatch(Logout())
        return ShowToast('Logout successfully')
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.drawerContainer}>
                <TouchableOpacity style={styles.profileView} onPress={() => navigation.navigate('Profile')}>
                    <Image
                        source={user?.UserProfile ? { uri: `https://appsdemo.pro/Texas_Server/${user?.UserProfile}` } : Images.user}
                        style={styles.imageStyle}
                    />
                    <Text style={styles.username}>{user?.name}</Text>
                    <Text style={styles.email}>{user?.email}</Text>
                </TouchableOpacity>
                {drawerItems.map((item) => {
                    return (
                        <DrawerItem
                            style={{ paddingHorizontal: responsiveHeight(1) }}
                            key={item.id}
                            label={item.label}
                            onPress={() => navigation.navigate(item?.navTo)}
                            labelStyle={styles.labelStyle}
                            icon={() => <DrawerIcon
                                name={item.icon}
                                color={Colors.secondary}
                                style={styles.iconStyle}
                                size={25}
                            />}
                        />
                    )
                })}
                <TouchableOpacity style={styles.logoutWrapper} onPress={() => onLogoutPress()}>
                    <LogoutIcon
                        name={'logout'}
                        color={Colors.secondary}
                        size={22}
                    />
                    <Text style={[styles.labelStyle, { marginLeft: 0 }]}>Log out</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.verticalBackground} />
        </View>
    );
}

export default DrawerStack

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        flex: 1
    },
    drawerContainer: {
        backgroundColor: Colors.background,
        flex: 1
    },
    verticalBackground: {
        backgroundColor: Colors.white,
        flex: 0.1
    },
    profileView: {
        alignItems: 'center',
        paddingVertical: responsiveHeight(7)
    },
    username: {
        color: Colors.white,
        marginTop: responsiveHeight(1.5),
        marginBottom: responsiveHeight(0.6),
        fontWeight: 'bold',
        fontSize: responsiveFontSize(1.9)
    },
    email: {
        color: Colors.white,
        fontSize: responsiveFontSize(1.6)
    },
    imageStyle: {
        height: 120,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: Colors.secondary,
        width: 120
    },
    labelStyle: {
        color: Colors.white,
        marginLeft: -responsiveHeight(2),
        fontSize: responsiveFontSize(2)
    },
    logoutWrapper: {
        flex: 1,
        gap: 14,
        marginBottom: responsiveHeight(4),
        paddingHorizontal: responsiveHeight(3.7),
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
})