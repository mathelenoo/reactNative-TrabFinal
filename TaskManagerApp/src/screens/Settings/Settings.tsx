import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import styles from './SettingsStyle';

const SettingsScreen = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

export default SettingsScreen;
