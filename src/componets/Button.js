import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

export const Button = ({ color, title, onPress, loading, buttonStyle,textStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        zIndex:10,
        height: 60,
        backgroundColor: color,
        borderRadius: 10,
      }, buttonStyle]}>
      {loading ? (
        <ActivityIndicator size={'large'} color={'white'} />
      ) : (
        <Text style={[{ color: 'white', fontSize: 16 },textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
