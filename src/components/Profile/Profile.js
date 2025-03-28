import React, {useMemo, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  Dimensions,
} from 'react-native';

const {height} = Dimensions.get('window');
const TAB_BAR_HEIGHT = 60; // Adjust this based on your actual tab bar height

const MENU_ITEMS = [
  {id: '1', icon: '⚙️', title: 'Settings', screen: 'Settings'},
  {id: '2', icon: '🛒', title: 'Orders', screen: 'Orders'},
  {id: '3', icon: '❤️', title: 'Favorites', screen: 'Favorites'},
  {id: '4', icon: '📍', title: 'Addresses', screen: 'Addresses'},
  {id: '5', icon: '💳', title: 'Payment Methods', screen: 'PaymentMethods'},
  {id: '6', icon: 'ℹ️', title: 'Help Center', screen: 'Help'},
];

const DEFAULT_AVATAR =
  'https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8';

const Profile = ({navigation}) => {
  // Mock user data
  const user = useMemo(
    () => ({
      displayName: 'Alex',
      email: 'User09@gmail.com',
      photoURL: DEFAULT_AVATAR,
    }),
    [],
  );

  const handleLogout = useCallback(() => {
    // Add your logout logic here
  }, []);

  const renderMenuItem = useCallback(
    ({item}) => (
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate(item.screen)}>
        <Text style={styles.menuIcon}>{item.icon}</Text>
        <Text style={styles.menuText}>{item.title}</Text>
        <Text style={styles.menuArrow}>›</Text>
      </TouchableOpacity>
    ),
    [navigation],
  );

  const keyExtractor = useCallback(item => item.id, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {paddingBottom: TAB_BAR_HEIGHT + 30},
        ]}
        showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={{uri: user.photoURL || DEFAULT_AVATAR}}
            style={styles.avatar}
            resizeMode="cover"
          />
          <Text style={styles.userName} numberOfLines={1}>
            {user.displayName || 'Guest User'}
          </Text>
          <Text style={styles.userEmail} numberOfLines={1}>
            {user.email || 'guest@email.com'}
          </Text>
        </View>

        {/* Menu Items */}
        <FlatList
          data={MENU_ITEMS}
          renderItem={renderMenuItem}
          keyExtractor={keyExtractor}
          scrollEnabled={false}
          contentContainerStyle={styles.menuContainer}
        />

        {/* Logout Button with proper spacing */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.7}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    paddingBottom: 30, // This will be overridden by the inline style
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#00512C',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
    maxWidth: '90%',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    maxWidth: '90%',
  },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f5f5f5',
  },
  menuIcon: {
    fontSize: 22,
    marginRight: 15,
    width: 30,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  menuArrow: {
    fontSize: 24,
    color: '#999',
  },
  footer: {
    paddingHorizontal: 25,
    marginTop: 20,
    marginBottom: TAB_BAR_HEIGHT, // Add space for tab bar
  },
  logoutButton: {
    padding: 15,
    backgroundColor: '#00512C',
    borderRadius: 20,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default React.memo(Profile);
