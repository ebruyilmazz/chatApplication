import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Avatar, Divider, FAB, Portal, Dialog, Button, TextInput } from 'react-native-paper';
import { db, auth } from '../App';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const ChatList = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setEmail(user?.email ?? '');
    });
    return () => unsubscribe();
  }, []);

  const addChat = async () => {
    if (!email || !userEmail) return;
    setIsLoading(true);
    const response = await addDoc(collection(db, 'chats'), {
      users: [email, userEmail],
      messages: [],
    });
    setIsLoading(false);
    setIsDialogVisible(false);
    navigation.navigate('Chat', { chatId: response.id });
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'chats'), (querySnapshot) => {
      const filteredChats = querySnapshot.docs
        .filter((doc) => doc.data().users.includes(email))
        .map((doc) => ({
          id: doc.id,
          users: doc.data().users,
          messages: doc.data().messages || [],
        }));
      setChats(filteredChats);
    });
    return () => unsubscribe();
  }, [email]);

  return (
    <View style={styles.container}>
      {chats.map((chat) => (
        <React.Fragment key={chat.id}>
          <List.Item
            title={chat.users.find((x) => x !== email)}
            description={chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].text : ""}
            left={() => (
              <Avatar.Text
                label={chat.users.find((x) => x !== email).charAt(0).toUpperCase()}
                size={50}
                style={styles.avatar}
              />
            )}
            onPress={() => navigation.navigate('Chat', { chatId: chat.id })}
            style={styles.listItem}
          />
          <Divider />
        </React.Fragment>
      ))}
      <Portal>
        <Dialog visible={isDialogVisible} onDismiss={() => setIsDialogVisible(false)}>
          <Dialog.Title style={styles.dialogTitle}>Yeni Sohbet</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Email"
              value={userEmail}
              onChangeText={(text) => setUserEmail(text)}
              style={styles.textInput}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => addChat()}
              loading={isLoading}
              mode="contained"
              style={styles.dialogButton}
            >
              Başlat
            </Button>
            <Button onPress={() => setIsDialogVisible(false)} style={styles.dialogButton}>
              Çıkış
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setIsDialogVisible(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 4,
    marginHorizontal: 16,
    elevation: 2,
  },

  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInput: {
    marginVertical: 8,
    backgroundColor: '#fff',
  },
  dialogButton: {
    marginHorizontal: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor:"lightgrey",
    borderRadius: 28,
    elevation: 8,
  },
});

export default ChatList;
