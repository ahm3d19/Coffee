import React, {useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';

const PROFILE_IMAGE_URL =
  'https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8';
const LOCATION_TEXT = 'Jakarta, Indonesia';

const TopHeader = () => {
  // Handlers
  const handleProfilePress = useCallback(() => {
    console.log('Profile pressed');
  }, []);

  const handleLocationPress = useCallback(() => {
    console.log('Location pressed');
  }, []);

  const handleNotificationPress = useCallback(() => {
    console.log('Notification pressed');
  }, []);

  const handleFilterPress = useCallback(() => {
    console.log('Filter pressed');
  }, []);

  return (
    <View>
      {/* Profile, Location, and Notification */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleProfilePress}
          accessible
          accessibilityLabel="Profile">
          <Image
            source={{uri: PROFILE_IMAGE_URL}}
            style={styles.profileStyle}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLocationPress}
          accessible
          accessibilityLabel="Location">
          <View style={styles.locationContainer}>
            <Image
              source={require('../../assets/Icons/mapMarker.png')}
              style={styles.mapMarkerStyle}
            />
            <Text>{LOCATION_TEXT}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNotificationPress}
          accessible
          accessibilityLabel="Notifications">
          <Image
            source={require('../../assets/Icons/notificationIcon.png')}
            style={styles.notificationIconStyle}
          />
        </TouchableOpacity>
      </View>

      {/* Greeting */}
      <Text style={styles.greetingText}>Good Morning, Alex</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchSubContainer}>
          <Image
            source={require('../../assets/Icons/search.png')}
            style={styles.searchBtnStyle}
          />
          <TextInput
            style={styles.searchPlaceholder}
            selectionColor={'#80A896'}
            placeholder="Search Coffee ..."
            placeholderTextColor="#80A896"
          />
        </View>

        {/* Filter */}
        <TouchableOpacity
          onPress={handleFilterPress}
          accessible
          accessibilityLabel="Filter">
          <Image
            source={require('../../assets/Icons/filter.png')}
            style={styles.filterBtnStyle}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(TopHeader); // Memoize the component to prevent unnecessary re-renders

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  profileStyle: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderColor: 'green',
    borderWidth: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapMarkerStyle: {
    width: 17,
    height: 17,
    marginRight: 5,
  },
  notificationIconStyle: {
    width: 30,
    height: 30,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: '700',
    margin: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    width: '90%',
    backgroundColor: '#F4F4F4',
    borderRadius: 100,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 20,
  },
  searchSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchPlaceholder: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#00582F',
  },
  filterBtnStyle: {
    width: 20,
    height: 20,
  },
  searchBtnStyle: {
    width: 20,
    height: 20,
  },
});
