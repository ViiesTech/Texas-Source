import { PERMISSIONS, request } from "react-native-permissions";
import icons from "../assets/icons";
import { Images } from "../assets/Images/Index";
import { Dimensions, Platform } from 'react-native';


export const data = [
    {
        id: 1,
        pic: Images.image1,
        title: 'Company Name',
        text: 'It is a long established fact that a reader will be distracted.',
    },
    {
        id: 2,
        pic: Images.image1,
        title: 'Company Name',
        text: 'It is a long established fact that a reader will be distracted.',
    },
    {
        id: 3,
        pic: Images.image2,
        title: 'Company Name',
        text: 'It is a long established fact that a reader will be distracted.',
    },
    {
        id: 4,
        pic: Images.image3,
        title: 'Company Name',
        text: 'It is a long established fact that a reader will be distracted.',
    },
];

export const drawerItems = [
    {
        id: 1,
        icon: 'home',
        label: 'Home',
        navTo: 'explore1'
    },
    {
        id: 2,
        icon: 'cash',
        label: 'Wallet',
        navTo: 'Wallet',
    },
    {
        id: 3,
        icon: 'shopping',
        label: 'Orders',
        navTo: 'MyOrder'
    },
    {
        id: 4,
        icon: 'view-dashboard',
        label: 'Vendor Dashboard',
        navTo: '',
    },
    {
        id: 5,
        icon: 'package-variant-closed',
        label: 'Products',
        navTo: 'MyProduct',
    }
]

export const exploreCard = [
    {
        id: 1,
        pic: Images.image4,
        title: 'Product',
        price: '€4250',
    },
    {
        id: 2,
        pic: Images.image4,
        title: 'Product',
        price: '€4250',
    },
    {
        id: 3,
        pic: Images.image4,
        title: 'Product',
        price: '€4250',
    },
    {
        id: 4,
        pic: Images.image4,
        title: 'Product',
        price: '€4250',
    },
    {
        id: 5,
        pic: Images.image4,
        title: 'Product',
        price: '€4250',
    },
    {
        id: 6,
        pic: Images.image4,
        title: 'Product',
        price: '€4250',
    },
];

export const initialCategoriesData = [
    {
        id: 1,
        title: 'Category 1',
        selected: true,
    },
    {
        id: 2,
        title: 'Category 2',
        selected: false,
    },
    {
        id: 3,
        title: 'Category 3',
        selected: false,
    },
    {
        id: 4,
        title: 'Category 4',
        selected: false,
    },
    {
        id: 5,
        title: 'Category 5',
        selected: false,
    },
    {
        id: 6,
        title: 'Category 6',
        selected: false,
    },
];

export const statusOrders = [
    {
        id: 1,
        title: 'neworder',
        selected: true,
    },
    {
        id: 2,
        title: 'cancel',
        selected: false,
    },
    {
        id: 3,
        title: 'delivered',
        selected: false,
    },
    {
        id: 4,
        title: 'cancel',
        selected: false,
    },
    {
        id: 5,
        title: 'pending',
        selected: false,
    },
];


export const cartItems = [
    {
        id: 1,
        image: Images.image4,
        name: 'Product',
        desc: `Lorem Ipsum has been the industry's standard dummy text`,
        price: '250'
    },
    {
        id: 2,
        image: Images.image4,
        name: 'Product',
        desc: `Lorem Ipsum has been the industry's standard dummy text`,
        price: '250'
    },
    {
        id: 3,
        image: Images.image4,
        name: 'Product',
        desc: `Lorem Ipsum has been the industry's standard dummy text`,
        price: '250'
    }
]

export const orders = [
    {
        id: 1,
        title: 'Product',
        price: '250',
        date: '9/2/2024',
        status: 'pending'
    },
    {
        id: 2,
        title: 'Product',
        price: '250',
        date: '9/2/2024',
        status: 'accepted'
    },
    {
        id: 1,
        title: 'Product',
        price: '250',
        date: '9/2/2024',
        status: 'cancel'
    },
    {
        id: 1,
        title: 'Product',
        price: '250',
        date: '9/2/2024',
        status: 'accepted'
    },
    {
        id: 1,
        title: 'Product',
        price: '250',
        date: '9/2/2024',
        status: 'shipping'
    },
    {
        id: 1,
        title: 'Product',
        price: '250',
        date: '9/2/2024',
        status: 'pending'
    },
    {
        id: 1,
        title: 'Product',
        price: '250',
        date: '9/2/2024',
        status: 'shipping'
    }
]

export const profileOptions = [
    {
        id: 1,
        text: 'My Order',
        icon: icons.shoppingBag,
        nav: 'MyOrder'
    },
    {
        id: 2,
        text: 'Products',
        icon: icons.product,
        nav: 'MyProduct'
    },
    {
        id: 3,
        text: 'Change Password',
        icon: icons.key,
        nav: 'ChangePassword'
    },
    {
        id: 4,
        text: 'Vendor Dashboard',
        icon: icons.dashboard,
        nav: 'Dashboard'
    },
    {
        id: 5,
        text: 'Delete Account',
        icon: icons.key,
        // nav: 'Dashboard'
    },
    {
        id: 6,
        text: 'Logout',
        icon: icons.logout
    }
]

const percentageCalculation = (max, val) => max * (val / 100);

const fontCalculation = (height, width, val) => {
    const widthDimension = height > width ? width : height;
    const aspectRatioBasedHeight = (16 / 9) * widthDimension;
    return percentageCalculation(
        Math.sqrt(
            Math.pow(aspectRatioBasedHeight, 2) + Math.pow(widthDimension, 2),
        ),
        val,
    );
};
export const responsiveFontSize = f => {
    const { height, width } = Dimensions.get('window');
    return fontCalculation(height, width, f);
};
export const responsiveHeight = h => {
    const { height } = Dimensions.get('window');
    return height * (h / 100);
};
export const responsiveWidth = w => {
    const { width } = Dimensions.get('window');
    return width * (w / 100);
};

export const calculateAverageRating = (avg, total) => {
    const averageRating = (avg / total).toFixed(1)
    return averageRating;
}

export const convertToDropdownData = (dataArray) => {
    return dataArray?.map(item => ({
        label: item,
        value: item.toLowerCase().replace(/\s+/g, '_')
    }));
}

export const statusData = [
    {
        id: 1,
        label: 'shipping',
        value: 'shipping'
    },
    {
        id: 2,
        label: 'pending',
        value: 'pending'
    },
    {
        id: 3,
        label: 'cancel',
        value: 'cancel'
    },
    {
        id: 4,
        label: 'delivered',
        value: 'delivered'
    }
]


export const requestPermission = async permissionType => {
    let permissionSet;
    const apiLevel = Platform.constants.Release;
    console.log('hello world', apiLevel);
    if (Platform.OS === 'ios') {
      switch (permissionType) {
        case 'media':
          permissionSet = Platform.select({
            ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
          });
          break;
       
        default:
          console.log('unknown permission type');
      }
    } else if (Platform.OS === 'android') {
      switch (permissionType) {
        case 'media':
          if (apiLevel < 10) {
            permissionSet = Platform.select({
              android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            });
          } else {
            return 'granted'; 
          }
          break;
       
        default:
          console.log('unknown permission type');
      }
    }
    if (permissionSet) {
      const status = await request(permissionSet);
      return status;
    }
  };