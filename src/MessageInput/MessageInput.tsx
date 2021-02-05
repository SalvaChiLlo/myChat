import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField'
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import Send from '@material-ui/icons/Send'

interface IMessageInputProps {
  sendMessage(message: string): void
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

export default function MessageInput({ sendMessage }: IMessageInputProps) {
  const classes = useStyles();

  const [textField, handleChange] = useState('')

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    handleChange(event.target.value)
  }

  return (
    <div style={{ padding: '10px 20px', display: 'flex', alignItems: 'center' }}>
      <TextField
        className={classes.textField}
        id="outlined-multiline-flexible"
        label="Multiline"
        multiline
        rowsMax={4}
        value={textField}
        onChange={onChange}
        variant="outlined"
      />
      <IconButton className={classes.iconButton} onClick={() => {sendMessage(textField); handleChange('')}}><Send /></IconButton>
    </div>
  )
}
