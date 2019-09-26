import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Button } from 'react-native';
import Colors from '../constants/colors';

const Tasks = (props) => {
    const [tasks, setTasks] = useState([]);
    const token = props.navigation.getParam('token');

    useEffect(() => {
        fetch('http://192.168.1.53:3000/tasks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        }).then((response) => response.json().then((data) => {
            //console.log(response.status, data);
            if (response.status === 200) {
                setTasks(data);
            }
        })).catch((error) => {
            console.log(error);
        });
    }, [token]);

    useEffect(() => {
        props.navigation.setParams({ handleLogout: handleLogout });
    }, []);

    const Item = ({ title }) => {
        return (
            <View style={styles.item}>
                <Text style={styles.title}>{title}</Text>
            </View>
        );
    }

    const handleLogout = () => {
        //console.log('Logout');
        fetch('http://192.168.1.53:3000/users/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        }).then((response) => {
            //console.log(response.status);
            if (response.status === 200) {
                props.navigation.replace('Login');
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={tasks}
                renderItem={({ item }) => <Item title={item.description} />}
                keyExtractor={item => item._id}
            />
        </SafeAreaView>
    );
};

Tasks.navigationOptions = ({ navigation }) => {
    return {
        title: 'Tasks',
        headerStyle: {
            backgroundColor: Colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerRight: (
            <Button
                onPress={navigation.getParam('handleLogout')}
                title="Logout"
                color={Colors.primary}
            />
        ),
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        marginTop: 20,
    },
    item: {
        backgroundColor: Colors.accent,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 16,
    },
});

export default Tasks;
