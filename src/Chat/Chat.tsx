import Timeline from "@material-ui/lab/Timeline";
import { useEffect, useRef, useState } from "react";
import Message, { MessageO } from "./Message/Message";
import MessageInput from './MessageInput/MessageInput';
import { Socket } from 'socket.io-client';

interface IChatProps {
  socket: Socket,
  userName: string
}

export default function Chat({ socket, userName }: IChatProps) {
  const [messages, setMessages] = useState<MessageO[]>([])

  useEffect(() => {
    socket.on('chat message', (msg: MessageO) => {
      setMessages([...messages, msg])
    })
    return () => {
      socket.off('chat message')
    }
  }, [messages, socket])

  const sendMessage = (msg: string): void => {
    if (msg) {
      const message = new MessageO(userName, msg)
      setMessages([...messages, message])
      socket.emit('chat message', message)
    }
  }

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  return (
    <div>
      <div style={{ height: '90vh', overflowY: 'scroll', padding: 0, margin: 0 }}>
        <Timeline align="left">
          {messages.map(message =>
            <Message
              key={message.hour}
              hour={message.hour}
              message={message.message}
              read={message.read}
              sent={message.sent}
              username={message.username}
              myUsername = {userName}
            />)}
        </Timeline>
        <div ref={messagesEndRef} />
      </div >
      <MessageInput sendMessage={sendMessage} socket={socket} username={userName}/>
    </div>
  )
}
