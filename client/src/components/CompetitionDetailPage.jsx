import React, { Component } from 'react';
import { connect } from 'react-redux';
//import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Typography from "material-ui/Typography";
import Grid from 'material-ui/Grid';
import Card, { CardContent,CardMedia } from 'material-ui/Card';
import Moment from 'react-moment';
import "moment-timezone";
import "typeface-roboto";

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
    let compData=this.props.competitionDetail.competition;

    console.log(JSON.stringify(compData));

    return (
      <div>
          <Card className={this.props.classes.card}>
            <CardMedia
              className={this.props.classes.media}
              image={'https://10.10.1.7:3443/Assets/CompBanners/'+this.props.competitionDetail.competition.bannerImg}
            />
            <CardContent>
              <Typography type="display1" color="inherit" className={this.props.classes.flex}>
                {compData.name} Details
              </Typography>
              <Grid container spacing={24}>
                <Grid item xs={3} sm={3}>
                    <Typography type="title" color="inherit" className={this.props.classes.flex}>
                      Where:
                    </Typography>
                    <Typography type="body1" color="inherit" className={this.props.classes.flex}>
                      {compData.address1}<br/>
                      {compData.address2}<br/>
                      {compData.city}<br />
                      {compData.state}<br/>
                      {compData.postcode}<br/>
                      {compData.country}<br/>
                    </Typography>
                    <Typography type="title" color="inherit" className={this.props.classes.flex}>
                      When:
                    </Typography>
                    <Typography type="body1" color="inherit" className={this.props.classes.flex}>
                      {compData.endDate ?
                        (
                          <Typography type="body1" color="inherit" className={this.props.classes.flex}>
                            From <Moment  format="ddd DD/MM/YY">{compData.startDate}</Moment> to <Moment format="ddd DD/MM/YY">{compData.endDate}</Moment>
                          </Typography>
                        ) : (
                          <Typography type="body1" color="inherit" className={this.props.classes.flex}>
                            On <Moment format="ddd DD/MM/YY">{compData.startDate}</Moment>
                          </Typography>
                        )

                      }
                    </Typography>
                    <br/>
                    {compData.contactName !=='' &&
                      <div>
                        <Typography type="title" color="inherit" className={this.props.classes.flex}>
                          Who to contact for more information:
                        </Typography>
                        <Typography type="body1" color="inherit" className={this.props.classes.flex}>
                          {compData.contactName !="" &&
                            <div>{compData.contactName}<br/></div>
                          }
                          {compData.contactPhone !="" &&
                            <div>Phone: {compData.contactPhone}<br/></div>
                          }
                          {compData.contactEmail !="" &&
                              <div>Email: <a href="mailto:email{compData.contactEmail}">{compData.contactEmail}</a><br/></div>
                          }
                        </Typography>
                      </div>
                    }

                </Grid>
                <Grid item xs={12} sm={8}>
                  <div dangerouslySetInnerHTML={{__html: this.props.competitionDetail.competition.mapRef}} />
                </Grid>
              </Grid>
              {compData.blurbData.map((blurb, index)=>{
                return (
                  <div>
                    {blurb.title &&
                      <Typography type="title" color="inherit" className={this.props.classes.flex}>
                        {blurb.title}
                      </Typography>
                    }
                    <Typography type="body1" color="inherit" className={this.props.classes.flex}>
                      <div dangerouslySetInnerHTML={{__html:blurb.content}} />
                    </Typography>
                  </div>
                )
              })}

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

