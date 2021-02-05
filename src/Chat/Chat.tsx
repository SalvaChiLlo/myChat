import Timeline from "@material-ui/lab/Timeline";
import { useEffect, useRef } from "react";
import Message, { MessageO } from "./Message/Message";

interface IChatProps {
  messages: MessageO[]
}

export default function Chat({ messages }: IChatProps) {

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  return (
    <div style={{ height: '90vh', overflowY: 'scroll', padding: 0, margin: 0 }}>
      <Timeline align="left">
        {messages.map(message =>
          <Message
            key={Math.random()}
            hour={message.hour}
            message={message.message}
            read={message.read}
            sent={message.sent}
            username={message.username}
          />)}
      </Timeline>
      <div ref={messagesEndRef} />
    </div >
  )
}
