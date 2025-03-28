import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const OnboardingScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>OnboardingScreen</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('MainApp')}
        style={styles.btn}>
        <Text>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
});
