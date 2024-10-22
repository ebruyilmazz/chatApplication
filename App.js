import Navigation from './Navigation';
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from "react-native-paper"
import {initializeApp} from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAGS7K7N3vrc-51R4fMZuQmpGqvJPqbEfI",
  authDomain: "chat-app-3e772.firebaseapp.com",
  projectId: "chat-app-3e772",
  storageBucket: "chat-app-3e772.appspot.com",
  messagingSenderId: "397211549443",
  appId: "1:397211549443:web:da2cf68353b19d24f5f336"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

export default function App() {
  return (
      <NavigationContainer>
        <Provider>
          <Navigation/>
        </Provider>
      </NavigationContainer>
  );
}

