import React, { Component } from 'react';
import { connect } from 'react-redux';
//import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Typography from "material-ui/Typography";
import Grid from 'material-ui/Grid';
import Card, { CardContent,CardMedia } from 'material-ui/Card';

import {
  resetStore,
  competitionDetailFetchData,
} from '../actions/competitionDetail.js';

import {setPage} from '../actions/core.js';


const styles = theme => ({
  flex: {
    flex: 1,
  },
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit*3,
  }),
  media: {
    height: 150,
    backgroundSize:'auto',
    backgroundPosition:'left'
  }
});

class CompetitionDetailForm extends Component {
  componentWillMount(){
    // Load the competition data fresh in case anything has changed
    let uri = this.props.location.pathname;
    console.log(uri);
    this.props.setPage(uri);
    let compId = this.props.match.params.id;
    console.log(compId);
    console.log(this.props);

    this.props.fetchCompetitionDetail(compId);

  };

  render() {
    return (
      <div>
          <Card className={this.props.classes.card}>
            <CardMedia
              className={this.props.classes.media}
              image={'https://10.10.1.7:3443/Assets/CompBanners/'+this.props.competitionDetail.competition.bannerImg}
            />
            <CardContent>
              <Typography type="headline" color="inherit" className={this.props.classes.flex}>
                Competition Details
              </Typography>
              <Grid container spacing={24}>
                <Grid item xs={3} sm={3}>
                    <Typography type="subheading" color="inherit" className={this.props.classes.flex}>
                      Address:
                    </Typography>
                    <Typography type="body1" color="inherit" className={this.props.classes.flex}>
                      {this.props.competitionDetail.competition.address1}<br/>
                      {this.props.competitionDetail.competition.address2}<br/>
                      {this.props.competitionDetail.competition.city}<br />
                      {this.props.competitionDetail.competition.state}<br/>
                      {this.props.competitionDetail.competition.postcode}<br/>
                      {this.props.competitionDetail.competition.country}<br/>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <div dangerouslySetInnerHTML={{__html: this.props.competitionDetail.competition.mapRef}} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  competitionDetail: state.competitionDetail,
  core: state.core,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCompetitionDetail: (id)=>dispatch(competitionDetailFetchData(id)),
    resetStore: ()=>dispatch(resetStore()),
    setPage: (uri)=>dispatch(setPage(uri)),
  };
};

const CompetitionDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompetitionDetailForm);

export default withStyles(styles)(CompetitionDetailContainer);

