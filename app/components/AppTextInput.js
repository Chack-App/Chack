import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import colors from '../config/colors'

function AppTextInput({ icon, ...otherProps }) {
    return (
        <View style={styles.container}>
            {icon && <MaterialCommunityIcons name={icon} size={20} color={colors.secondary} style={styles.icon}/>}
            <TextInput style={styles.input} {...otherProps}/>
        </View>
    );
}

export default AppTextInput;

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.primary,
        flexDirection: 'row',
        width: '100%',
        padding: 15,
        //marginVertical: 10
    },
    input:{
        color: colors.secondary,
        borderColor: colors.secondary,
        borderBottomWidth: 1,
        // height: 40,
         width: 300,
        // margin: 12,
        fontSize: 25,
    },
    icon:{
        marginRight: 10
    }
})