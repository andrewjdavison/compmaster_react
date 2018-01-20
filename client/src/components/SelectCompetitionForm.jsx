import React from "react";
import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom';
//import Card, { CardText } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import SelectCompetitionTile from './SelectCompetitionTile.jsx';


const styles = theme => ({
  flex: {
    flex: 1,
  },
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit*3,
  }),
});


function SelectCompetitionForm (props) {
  const { onSubmit, onSelect, errors, classes, competitions } = props;
  return (
    <div>
      <Paper className={classes.root} elevation={5}>
        <Typography type="title" color="inherit" className={classes.flex}>
          Select a competition
        </Typography>
        <ul>
          {competitions.map(function(competition, index){
            return <SelectCompetitionTile
              onSelect = { onSelect }
              errors = { errors }
              classes = { classes }
              competition = { competition }
              key={competition.id}
              />;
          })}
        </ul>
      </Paper>
    </div>
  );
}

SelectCompetitionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  competitions: PropTypes.array.isRequired,
};

export default withStyles(styles)(SelectCompetitionForm);
