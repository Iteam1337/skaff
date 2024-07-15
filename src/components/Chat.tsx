import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Caption } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuthContext } from '../context/authContext'
import { Message } from '../data/tenderRequests'
import useMessages from '../hooks/useMessages'

const Chat = ({ tenderRequestId }: { tenderRequestId: string }) => {
  const [inputText, setInputText] = useState('')
  const { user } = useAuthContext()
  console.log(user)
  const [messages, sendMessage, refresh] = useMessages(tenderRequestId)

  const handleSendMessage = () => {
    if (!inputText) return

    const newMessage: Message = {
      id: Math.random().toString(36).slice(-6),
      tenderRequestId: tenderRequestId,
      text: inputText,
      from: user ?? undefined,
      date: new Date(Date.now()),
    }

    sendMessage(newMessage)
    setInputText('')
  }

  React.useLayoutEffect(() => {
    refresh()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView>
        <ScrollView contentContainerStyle={styles.container}>
          {messages.map((message: Message, i: number) => (
            <View key={message.id}>
              <View
                style={[
                  styles.messageContainer,
                  message.from?.id === user?.id
                    ? styles.question
                    : styles.answer,
                ]}
              >
                <Text style={styles.messageText}>{message.text}</Text>
              </View>
              {i === messages.length - 1 && (
                <Caption
                  style={
                    message.from?.id === user?.id
                      ? styles.questionMetadata
                      : styles.answerMetadata
                  }
                >
                  {message.date.toLocaleString()}
                </Caption>
              )}
            </View>
          ))}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Skriv din fråga här..."
            />
            <TouchableOpacity
              onPress={handleSendMessage}
              disabled={inputText.length === 0}
              style={
                inputText.length > 0
                  ? styles.sendButton
                  : styles.sendButtonDisabled
              }
            >
              <Text style={styles.sendButtonText}>Skicka</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexGrow: 1, // Lägg till denna rad
    justifyContent: 'flex-end', // Lägg till denna rad
  },
  messageContainer: {
    width: '70%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  answer: {
    alignSelf: 'flex-start',
    backgroundColor: '#757575', // Grå färg från ditt tema
    marginBottom: 26,
  },
  question: {
    alignSelf: 'flex-end',
    backgroundColor: '#26CC77', // Morotsfärg
  },
  messageText: {
    fontSize: 16,
    color: '#FFF',
  },
  answerMetadata: {
    alignSelf: 'flex-start',
    marginTop: -10,
    color: '#999',
  },
  questionMetadata: {
    alignSelf: 'flex-end',
    marginTop: -10,
    color: '#999',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#26CC77', // Morotsfärg
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  sendButtonDisabled: {
    marginLeft: 10,
    backgroundColor: '#757575', // Morotsfärg
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
})

export default Chat
