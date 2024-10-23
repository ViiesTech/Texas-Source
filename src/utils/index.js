import { Images } from "../assets/Images/Index";
import { Dimensions } from 'react-native';


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
        navTo: '',
    },
    {
        id: 3,
        icon: 'shopping',
        label: 'My Order',
        navTo: 'MyOrder'
    },
    {
        id: 4,
        icon: 'view-dashboard',
        label: 'Vendor Dashboard',
        navTo: 'Dashboard',
    },
    {
        id: 5,
        icon: 'package-variant-closed',
        label: 'Products',
        navTo: '',
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
        title: 'pending',
        selected: true,
    },
    {
        id: 2,
        title: 'cancel',
        selected: false,
    },
    {
        id: 3,
        title: 'shipping',
        selected: false,
    },
    {
        id: 4,
        title: 'accepted',
        selected: false,
    },
    {
        id: 5,
        title: 'cancel',
        selected: false,
    },
    {
        id: 6,
        title: 'shipping',
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

