import React, { Component } from "react";
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import SelectCompetitionTile from './SelectCompetitionTile.jsx';
import  {
          competitionListLoadTestData,
          competitionListFetchData,
        } from '../actions/competitionList.js';



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

function onSelect(index){
  console.log('Selected '+index);
  window.location='compdetails/'+index;

};

const errors = {

};

class SelectCompetitionForm extends Component {
  componentWillMount(){
      console.log(this.props);
      this.props.fetchCompetitionList();
  }

  render(){
    return (
      <div>
        <Paper className={this.props.classes.root}  elevation={5}>
          <Typography type="title" color="inherit" className={this.props.classes.flex}>
            Select a competition
          </Typography>
          <ul>
            {this.props.competitionList.competitions.map(function(competition, index){
              return <SelectCompetitionTile
                onSelect = { onSelect }
                errors = { errors }
                competition = { competition }
                key={competition.id}
                />;
            })}
          </ul>
          <button onClick={this.props.addListItem}>Add Competition</button>
          <button onClick={this.props.fetchCompetitionList}>Refresh</button>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  competitionList: state.competitionList
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadTestData: () => dispatch(competitionListLoadTestData()),
    addListItem: () => dispatch(competitionListLoadTestData()),
    fetchCompetitionList: () => dispatch(competitionListFetchData()),

  };

};

const SelectCompetitionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectCompetitionForm);

export default withStyles(styles)(SelectCompetitionContainer);
