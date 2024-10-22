import React, { useState, useEffect } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getFirestore, doc, onSnapshot, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Chat = () =>{
    const route = useRoute();
    const db = getFirestore(); 
    const auth = getAuth();

    const [messages, setMessages] = useState([]);
    const [uid, setUid] = useState("")
    const [name, setName] = useState("")
    const chatId = route.params?.chatId;

    useEffect (() =>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid);
                setName(user.displayName);
            } else {
                setUid("");
                setName("");
            }
        })
        return () => unsubscribe();
    }, [auth])
    
    
      
      useEffect(() => {
        console.log("Route params", route.params)
        const chatId = route.params?.chatId;
        if(!chatId){
            console.error("chat id undefined")
            return
        }
        
        const chatRef = doc(db, 'chats', chatId);

        const unsubscribe = onSnapshot(chatRef, (snapshot) => {
          setMessages(snapshot.data()?.messages ?? []);
        });
        return () => unsubscribe(); 
      }, [ db, chatId]);


    const onSend =  (m = []) => {

        const chatRef = doc(db, 'chats', chatId);
        setDoc(
            chatRef,
            {
                messages: GiftedChat.append(messages, m),
            },
            { merge: true }
        );
    };

    const renderBubble = (props) => {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: '#8e24aa',
            },
            left: {
              backgroundColor: '#e1e1e1', 
            },
          }}
        />
      );
    };


    return(
        <View style={{ flex: 1, backgroundColor: "white", marginBottom:40 }}>
        <GiftedChat
          messages={messages.map( x => ({
            ...x, 
            createdAt: x.createdAt?.toDate(),
        }))}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: uid,
            name: name
          }}
          renderBubble={renderBubble}
        />
      </View>
    )
}
export default Chat