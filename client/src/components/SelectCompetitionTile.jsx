import React from "react";
import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom';
//import Card, { CardText } from 'material-ui/Card';
//import Typography from 'material-ui/Typography';
//import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';


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


function SelectCompetitionTile(props) {
  const { onSelect, competition } = props;
  return (
    <a  onClick= { (e)=>{console.log('Hi');onSelect(competition.id)} } >
      <div>{competition.name} </div>
    </a>
  );
}

SelectCompetitionTile.propTypes = {
  onSelect: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  competition: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectCompetitionTile);
