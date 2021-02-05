import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px"
  },
  message: {
    color: 'green'
  },
  timelineOppositeContent: {
    flex: 0,
    display: 'none'
  },
  mine: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  }
}));

export interface MessageO {
  username: string;
  hour: number;
  message: string;
  sent: boolean;
  read: boolean;
  myUsername: string;
}

export class MessageO {
  username: string = "";
  hour: number = new Date().getTime();
  message: string = "";
  sent: boolean = false;
  read: boolean = false;

  constructor(username: string, message: string) {
    this.username = username;
    this.message = message;
  }
}

export default function Message({ username, hour, message, sent, read, myUsername }: MessageO) {
  const classes = useStyles();
  return (
    <TimelineItem>
      <TimelineOppositeContent className={classes.timelineOppositeContent}>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot>
          <Avatar>{username.slice(0, 2).toUpperCase()}</Avatar>
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent >
        <Paper elevation={3} className={`${classes.paper} ${username !== myUsername ? classes.mine : ''}`}>
          <Typography variant="subtitle1" component="p">
            {username}
          </Typography>
          <Typography variant="body2">
            {`${new Date(hour).toLocaleDateString('es-ES')} - ${new Date(hour).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`}
          </Typography>
          <Divider />
          <Typography>{message}</Typography>
        </Paper>
      </TimelineContent>
    </TimelineItem>
  )
}
