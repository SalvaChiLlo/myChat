import './App.css';
import Chat from './Chat/Chat';
import MessageInput from './MessageInput/MessageInput';
import Container from '@material-ui/core/Container';
// import { makeStyles } from "@material-ui/core/styles";
import { MessageO } from './Chat/Message/Message';
import { useState } from 'react';

// const useStyles = makeStyles((theme) => ({
//   messageInput: {
//     bottom: '1px'
//   }
// }));
function App() {
  // const classes = useStyles();
  const [messages, addMessage] = useState<MessageO[]>([new MessageO('Salva', 'This is a message')])
  // const messages: MessageO[] = [new MessageO('Salva', 'This is a message')]

  const sendMessage = (message: string): void => {
    console.log(message)
    if (message) {
      addMessage(oldMessages => [...oldMessages, new MessageO('Salva', message)])
    }
  }

  return (
    <Container maxWidth="xl">
      <Chat messages={messages} />
      <MessageInput sendMessage={sendMessage} />
    </Container>
  );
}

export default App;
