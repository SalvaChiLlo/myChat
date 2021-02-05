import './App.css';
import Chat from './Chat/Chat';
import Container from '@material-ui/core/Container';
import { io, Socket } from 'socket.io-client';
import SignIn from './SignIn/SignIn';
import { useState } from 'react';
import { useEffect } from 'react';
import { SupervisedUserCircle } from '@material-ui/icons'
import ConnectedUsers from './ConnectedUsers/ConnectedUsers';


const socket: Socket = io(process.env.REACT_APP_SERVER_URL + '');

function App() {
  console.log(process.env.REACT_APP_SERVER_URL)
  const [userName, setUserName] = useState('')
  const [showUsers, setShowUsers] = useState(false)
  const [users, setUsers] = useState<string[]>([])

  useEffect(() => {
    socket.on('connected users', (users: string[]) => {
      console.log(users)
      setUsers(users)
    })
    return () => {
      socket.off('connected users')
    }
  }, [users])

  const onShowUsers = () => {
    setShowUsers(true)
  }

  const onHideUsers = () => {
    setShowUsers(false)
  }

  return (
    <Container maxWidth="xl" >
      <div style={{ width: 'fit-content', position: 'absolute', zIndex: 1, right: '5px' }} onMouseEnter={onShowUsers} onMouseLeave={onHideUsers}>
        <SupervisedUserCircle style={{ width: '100px', height: '100px' }} />
      </div>
      {
        showUsers
          ?
          <ConnectedUsers onShowUsers={onShowUsers} onHideUsers={onHideUsers} socket={socket} users={users} />
          :
          ''
      }
      {
        !userName.length
          ?
          <SignIn socket={socket} setUserName={setUserName}></SignIn>
          :
          <Chat socket={socket} userName={userName} />
      }
    </Container>
  );

}

export default App;
