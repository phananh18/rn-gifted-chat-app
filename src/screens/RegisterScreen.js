import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Input,Button } from 'react-native-elements'
import { auth } from '../../firebase'

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const register = ({navigation}) => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                user.updateProfile({
                    displayName: name,
                    photoURL: imageUrl ? imageUrl : 
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgJMFsyQlqFwvHOYF0fEijnJjaNRsNDBfi1Q&usqp=CAU"
                }).then(() => {
                    // Update successful
                    // ...
                }).catch((error) => {
                    // An error occurred
                    // ...
                });
                navigation.popToTop();
            })
            .catch((error) => {
                var errorMessage = error.message;
                alert(errorMessage)
            });
    }
    return (
        <View style={styles.container}>
            <Input
                label='Name'
                placeholder='Enter your name'
                leftIcon={{ type: 'material', name: 'badge' }}
                value={name}
                onChangeText={text => setName(text)}
            />

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

            <Input
                label='Profile Picture'
                placeholder='Enter your image url'
                leftIcon={{ type: 'material', name: 'face' }}
                value={imageUrl}
                onChangeText={text => setImageUrl(text)}
            />

            <Button title='Register' onPress={register} />

        </View>
    )
}

export default RegisterScreen

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