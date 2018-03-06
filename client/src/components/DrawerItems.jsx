import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/MoveToInbox';

export const mainCompItems = (
  <div>
    <div background="green">
      CompMaster
    </div>
    <ListItem button>
      <ListItemText primary="Competition Details" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Entry Rules" />
    </ListItem>
  </div>
);



