import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import FastfoodIcon from "@material-ui/icons/Fastfood";
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
  }
}));

export interface MessageO {
  username: string;
  hour: Date;
  message: string;
  sent: boolean;
  read: boolean;
}

export class MessageO {
  username: string = "";
  hour: Date = new Date()
  message: string = "";
  sent: boolean = false;
  read: boolean = false;

  constructor(username: string, message: string) {
    this.username = username;
    this.message = message;
  }
}

export default function Message({ username, hour, message, sent, read }: MessageO) {
  const classes = useStyles();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
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
      <TimelineContent>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="subtitle1" component="p">
            {username}
          </Typography>
          <Typography variant="body2">
            {`${hour.toLocaleDateString('es-ES')} - ${hour.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`}
          </Typography>
          <Divider />
          <Typography>{message}</Typography>
        </Paper>
      </TimelineContent>
    </TimelineItem>
  )
}
