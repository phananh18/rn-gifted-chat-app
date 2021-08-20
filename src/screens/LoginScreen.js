import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { Input } from 'react-native-elements'
import { auth } from '../../firebase'
const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => {
                var errorMessage = error.message;
                alert(errorMessage)
            });
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigation.replace('Chat');
            } else {
                // User is signed out
                // ...
                navigation.canGoBack()&& navigation.popToTop();
            }
        });
        return unsubscribe
    }, [])

    return (
        <View style={styles.container}>
            <Input
                label='Email'
                placeholder='Enter your email'
                leftIcon={{ type: 'material', name: 'mail' }}
                value={email}
                onChangeText={text => setEmail(text)}
            />

            <Input
                label='Password'
                placeholder='Enter your password'
                leftIcon={{ type: 'material', name: 'lock' }}
                secureTextEntry
            />

            <Button title='Signin' onPress={signIn} />
            <Button title='Register' onPress={() => navigation.navigate('Register')} />

        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    button: {
        width: 200,
        marginTop: 10,
    },
    container: {
        flex: 1,
        padding: 10,
    }
})