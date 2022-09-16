import React, { Fragment } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from "@material-ui/core/Typography";


const Messages = ({messages}) =>{
  const current = localStorage.getItem('user')
  return (
    <List>
      {messages.flatMap((message, index) => [(
        <ListItem alignItems="flex-start" key={index}>
          <ListItemAvatar>
            <Avatar alt="Avatar alt text" src={message.avatar} />
          </ListItemAvatar>
          <ListItemText
            primary={message.sender}
            secondary={
              <Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  <span className={(message.sender==current)&&"current"||''}>{message?.body?.text??''}</span>
                </Typography>
              </Fragment>
            }
          />
        </ListItem>
        ),<Divider variant="inset" component="li" key={"divider-"+index} />])}
    </List>
  )
};

export default Messages;