import React from 'react';
import { View, Text } from 'react-native';
import styles from './ProfileStyle';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
    </View>
  );
};

export default ProfileScreen;
