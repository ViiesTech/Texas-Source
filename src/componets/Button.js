import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';

export const Button = ({color, title, onPress, loading}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 60,
        backgroundColor: color,
        borderRadius: 10,
      }}>
      {loading ? (
        <ActivityIndicator size={'large'} color={'white'} />
      ) : (
        <Text style={{color: 'white', fontSize: 16}}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
