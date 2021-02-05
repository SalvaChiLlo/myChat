import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField'
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import Send from '@material-ui/icons/Send'
import Typography from "@material-ui/core/Typography";
import { Socket } from 'socket.io-client';

interface IMessageInputProps {
  sendMessage(message: string): void,
  socket: Socket,
  username: string
}

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '100%',
  },
  iconButton: {
    border: '6px solid rgba(0,0,0,0.5)',
    width: '50px',
    height: '50px',
    marginLeft: '10px'
  }
}));

export default function MessageInput({ sendMessage, socket, username }: IMessageInputProps) {
  const classes = useStyles();

  const [textField, handleChange] = useState('')
  const [writting, handleWritting] = useState(false)
  const [writter, handleWritter] = useState('')
  useEffect(() => {
    socket.on('writting', (usr: string) => {
      handleWritting(true)
      handleWritter(usr)
    })
    return () => {
      socket.off('writting')
      setTimeout(() => {
        handleWritting(false)
      }, 1000);
    }
  }, [writting, socket])

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    handleChange(event.target.value)
    setTimeout(() => {
      socket.emit('writting', username)
    }, 500);
  }

  return (
    <div style={{ padding: '10px 20px' }}>
      {writting
        ?
        <Typography variant="subtitle2" component="p">
          {writter} is writting...
        </Typography>
        :
        <Typography style={{ color: 'white' }} variant="subtitle2" component="p">
          .
        </Typography>

      }
      <form
        style={{ display: 'flex', alignItems: 'center' }}
        onSubmit={(e) => {
          e.preventDefault()
          sendMessage(textField);
          handleChange('')
        }}>
        <TextField
          className={classes.textField}
          id="outlined-multiline-flexible"
          rowsMax={2}
          value={textField}
          onChange={onChange}
          variant="outlined"
          type="text"
        />
        <IconButton
          className={classes.iconButton}
          type="submit"
        >
          <Send />
        </IconButton>
      </form>
    </div>
  )
}
