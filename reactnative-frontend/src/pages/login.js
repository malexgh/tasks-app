import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import Colors from '../constants/colors';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        //console.log(email, password);
        fetch('http://192.168.1.53:3000/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        }).then((response) => response.json().then((data) => {
            //console.log(data);
            if (response.status === 200) {
                const token = data.token;
                props.navigation.replace('Tasks', { token });
            }
        })).catch((error) => {
            console.log(error);
        });
    };

    return (
        <View style={styles.screen}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={(text) => setEmail(text)} />
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} value={password} onChangeText={(text) => setPassword(text)} />
            <View style={styles.buttonContainer}>
                <Button color={Colors.primary} title="Login" onPress={handleLogin} />
            </View>
        </View>
    );
};

Login.navigationOptions = ({ navigation }) => {
    return {
        title: 'Login',
        headerStyle: {
            backgroundColor: Colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontSize: 18
    },
    input: {
        width: '60%',
        marginVertical: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5
    },
    buttonContainer: {
        width:'60%',
        marginTop:10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius:5
    },
});

export default Login;
