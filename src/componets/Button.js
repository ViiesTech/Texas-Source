import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export const Button = ({ navigation, color, title,navigateTo }) => {
  const handlePress = () => {
    if (navigation) {
      navigation.navigate(navigateTo);
    } else {
      console.warn('Navigation prop is not provided');
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 60,
        backgroundColor: color,
        borderRadius: 10,
      }}>
      <Text style={{ color: 'white', fontSize: 16 }}>{title}</Text>
    </TouchableOpacity>
  );
};
