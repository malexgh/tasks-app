import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Button, Switch } from 'react-native';
import Colors from '../constants/colors';

const Tasks = (props) => {
    const [tasks, setTasks] = useState([]);
    const token = props.navigation.getParam('token');

    useEffect(() => {
        fetch('http://localhost:3333/tasks', {
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

    const Item = ({ title, checked }) => {
        return (
            <View style={styles.item}>
                <Text style={styles.title}>{title}</Text>
                <Switch
                    value={checked}
                    onValueChange={() => { }}
                    thumbColor={checked ? Colors.primary : 'lightgray'}
                    trackColor={{true:'white', false:'white'}}
                />
            </View>
        );
    }

    const handleLogout = () => {
        //console.log('Logout');
        fetch('http://localhost:3333/users/logout', {
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
                renderItem={({ item }) => <Item title={item.description} checked={item.completed} />}
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
        //flex: 1,
        marginTop: 8,
    },
    item: {
        flexDirection:'row',
        justifyContent:"space-between",
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
