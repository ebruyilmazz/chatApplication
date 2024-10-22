import React, { useState } from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { TextInput, Button, Subheading, Title } from 'react-native-paper';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigation = useNavigation();

  const auth = getAuth();

  const signIn = async () => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.popToTop();
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
    }
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://example.com/background-image.jpg' }} 
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3f3f3',
        padding: 16,
      }}
    >
      <View style={{
        width: '100%',
        maxWidth: 400,
        padding: 24,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 10,
      }}>

        <Title style={{
          textAlign: 'center',
          marginBottom: 24,
          fontSize: 28,
          fontWeight: '700',
          color: '#333',
        }}>
          Giriş Yap
        </Title>

        {/* Hata Mesajı */}
        {!!error && (
          <Subheading style={{
            color: 'red',
            textAlign: 'center',
            marginBottom: 16,
            backgroundColor: '#ffe5e5',
            padding: 8,
            borderRadius: 8,
          }}>
            {error}
          </Subheading>
        )}

        {/* Email Giriş */}
        <TextInput
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType='email-address'
          style={{
            backgroundColor: 'white',
            borderRadius: 8,
            marginBottom: 16,
            elevation: 5,
          }}
          mode="outlined"
          theme={{ colors: { primary: '#6200ee' } }}
        />

        {/* Şifre Giriş */}
        <TextInput
          label="Şifre"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
          style={{
            backgroundColor: 'white',
            borderRadius: 8,
            marginBottom: 16,
            elevation: 5,
          }}
          mode="outlined"
          theme={{ colors: { primary: '#6200ee' } }}
        />

        {/* Butonlar */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 16,
        }}>
          <Button compact onPress={() => navigation.navigate('SignUp')} color="#6200ee">
            Kayıt Ol
          </Button>

          <Button
            mode="contained"
            onPress={() => signIn()}
            loading={isLoading}
            style={{
              borderRadius: 24,
              paddingVertical: 10,
              paddingHorizontal: 20,
              shadowColor: '#6200ee',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 10,
            }}
            labelStyle={{
              fontSize: 16,
              fontWeight: '600',
            }}
          >
            Giriş Yap
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignIn;
