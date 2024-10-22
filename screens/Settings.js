import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Avatar, Title, Subheading, Button } from 'react-native-paper';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
    const navigation = useNavigation();
    const auth = getAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setName(user?.displayName ?? '');
            setEmail(user?.email ?? '');
        });
    }, []);

    const SignOut = () => {
        auth.signOut()
            .then(() => {
                navigation.navigate('SignUp');
            })
            .catch((error) => {
                console.error("Sign out error: ", error);
                alert(error.message);
            });
    };

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            backgroundColor: '#f5f5f5',
        }}>
            <Avatar.Text 
                label={name.split(' ').reduce((prev, current) => prev + current[0], '')}
                size={80}
                style={{
                    marginBottom: 20,
                }} 
            />
            
            <Title style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#333',
                marginBottom: 10,
            }}>
                {name}
            </Title>
            
            <Subheading style={{
                fontSize: 16,
                color: '#666',
                marginBottom: 20,
            }}>
                {email}
            </Subheading>
            
            <Button 
                mode="contained"
                onPress={SignOut}
                style={{
                    borderRadius: 24,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                }}
                labelStyle={{
                    fontSize: 16,
                    fontWeight: 'bold',
                }}
            >
                Çıkış Yap
            </Button>
        </View>
    );
}

export default Settings;
