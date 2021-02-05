import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core'
import { Socket } from 'socket.io-client';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

interface IConnectedUsers {
  onShowUsers(): void;
  onHideUsers(): void;
  socket: Socket;
  users: string[]
}

export default function ConnectedUsers({ onShowUsers, onHideUsers, socket, users }: IConnectedUsers) {
  const classes = useStyles();

  return (
    <div
      style={{ position: 'absolute', right: '5px', top: '95px', zIndex: 1, backgroundColor: 'white' }}
      onMouseEnter={onShowUsers}
      onMouseLeave={onHideUsers}
    >

      <Card style={{ backgroundColor: 'white', width: 'fit-content' }} className={classes.root} elevation={10}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Connected Users
        </Typography>
          {
            users.map((user, index) =>
              <div key={index}>
                <Typography style={{ textAlign: 'center' }} variant="body2" component="p">
                  {user}
                </Typography>
                <Divider />
              </div>
            )
          }
        </CardContent>
      </Card>
    </div>
  )
}
