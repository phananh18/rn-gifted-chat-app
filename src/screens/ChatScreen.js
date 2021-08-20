import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { TouchableOpacity, View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat';
import { auth, db } from '../../firebase';
import { AntDesign } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';

const ChatScreen = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const signOut = () => {
        auth.signOut().then(() => {
            // Sign-out successful.
            navigation.replace('Login')
        }).catch((error) => {
            // An error happened.
        });
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <Avatar
                        rounded
                        source={{ uri: auth?.currentUser?.photoURL }} />
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity
                    style={{ marginRight: 30 }}
                    onPress={signOut}
                >
                    <AntDesign name="logout" size={24} color="black" />
                </TouchableOpacity>
            )
        })
    }, [])
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const {
            _id,
            createdAt,
            text,
            user
        }=messages[0]
        db.collection('chats').add({
            _id,
            createdAt,
            text,
            user
        })
    }, [])

    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                name:auth?.currentUser?.displayName,
                avatar:auth?.currentUser?.photoURL
            }}
        />
    )
}

export default ChatScreen
