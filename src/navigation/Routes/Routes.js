import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';

// Screens
import OnboardingScreen from '../../screens/OnBoarding/onboardingScreen';
import HomeScreen from '../../screens/Home/HomeScreen';
import FavouriteScreen from '../../screens/Favourite/FavouriteScreen';
import CartScreen from '../../screens/Cart/CartScreen';
import ProfileScreen from '../../screens/Profile/ProfileScreen';
import DetailScreen from '../../screens/Detail/DetailScreen';
import {Provider} from 'react-redux';
import store from '../../redux/store';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function getTabBarIcon(route) {
  return ({focused}) => {
    let imageSource;
    switch (route.name) {
      case 'Home':
        imageSource = require('../../assets/Icons/home.png'); // Monochromatic Home Icon
        break;
      case 'Favourite':
        imageSource = require('../../assets/Icons/heart.png'); // Monochromatic Heart Icon
        break;
      case 'Cart':
        imageSource = require('../../assets/Icons/cart.png'); // Monochromatic Cart Icon
        break;
      case 'Profile':
        imageSource = require('../../assets/Icons/profile.png'); // Monochromatic Profile Icon
        break;
      default:
        imageSource = require('../../assets/Icons/default.png'); // Default Icon
    }
    return (
      <Image
        source={imageSource} // Use `require` for local assets
        style={[
          styles.tabBarIcon,
          {tintColor: focused ? '#00512C' : '#80A896'}, // Dynamically apply tintColor
        ]}
      />
    );
  };
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: getTabBarIcon(route),
        tabBarActiveTintColor: '#00512C',
        tabBarInactiveTintColor: '#80A896',
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          left: 20,
          right: 20,
          borderRadius: 30,
          height: 99,
          backgroundColor: '#FFF',
          shadowOffset: {height: 0, width: 0},
          shadowOpacity: 0.5,
          shadowRadius: 5,
        },
        tabBarShowLabel: false,
        unmountOnBlur: true,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favourite" component={FavouriteScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const Routes = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MainApp"
            component={MainTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default Routes;

const styles = StyleSheet.create({
  tabBarIcon: {
    marginTop: 30,
    width: 34,
    height: 34,
    resizeMode: 'contain',
  },
});
