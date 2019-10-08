import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        //console.log(email, password);
        fetch('http://localhost:3333/users/login', {
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
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Email"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                autoFocus={true}
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleLogin} >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
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
        height: 50,
        width: '60%',
        marginVertical: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5
    },
    buttonContainer: {
        height: 50,
        width: '60%',
        marginTop: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5
    },
    button: {
        height: '100%',
        width: '100%',
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Login;
