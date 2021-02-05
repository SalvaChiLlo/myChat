import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Socket } from 'socket.io-client';
import { Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';

const useStyles = makeStyles({
  root: {
    width: 'fit-content'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  textField: {
    width: '100%',
  },
  button: {
    marginTop: '10px'
  }
});

interface ISignInProps {
  socket: Socket,
  setUserName(usr: string): void
}

export default function SignIn({ socket, setUserName }: ISignInProps) {
  const classes = useStyles();
  const [userName, setUserName2] = useState('')
  const [userNameError, setError] = useState(false)
  useEffect(() => {
    socket.on('signin', (usr: string) => {
      if (usr === '') {
        setError(true)
      }
      console.log(usr)
      setUserName(usr)
    })
    return () => {
      socket.off('signin')
    }
  }, [socket, userName, setUserName])

  const submitUsername = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (userName) {
      socket.emit('signin', userName)
    }
  }

  return (
    <Card className={classes.root} style={{ position: 'absolute', top: '40vh', left: '42vw' }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Welcome to myChat
        </Typography>
        {
          userNameError
            ?
            <Typography className={classes.pos} style={{ color: 'red' }}>
              This username isn't available
            </Typography>
            :
            <Typography className={classes.pos} color="textSecondary">
              Just enter a username
            </Typography>

        }
        <Grid container direction="row" justify="flex-end" alignItems="center">
          <form onSubmit={submitUsername}>
            <TextField
              className={classes.textField}
              id="outlined-multiline-flexible"
              value={userName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName2(e.target.value)}
              variant="outlined"
              placeholder="Your username"
              type="text"
            />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              type="submit"
            >SignIn</Button>
          </form>
        </Grid>
      </CardContent>
    </Card>
  );
}
