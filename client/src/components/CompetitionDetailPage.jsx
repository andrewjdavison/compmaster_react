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
    backgroundSize:'contain',
    backgroundPosition:'top'
  },
  bannerimg: {
    width:'100%',
  },
  mapcontainer: {
    position: 'relative',
    paddingBottom: '56.25%',
    paddingTop: '35px',
    height: 0,
    overflow: 'hidden',
    iframe: {
      position: 'relative',
      top: 0,
      left:0,
      width: '100%',
      height: '100%',
    },

  },

});

class CompetitionDetailForm extends Component {
  componentWillMount(){
    // Set the page URI in case we get redirected to authenticate
    let uri = this.props.location.pathname;
    this.props.setPage(uri);

    // Load the competition data fresh in case anything has changed
    let compId = this.props.match.params.id;
    this.props.fetchCompetitionDetail(compId);


  };

  render() {
    let compData=this.props.competitionDetail.competition;

    let bannerImg="https://10.10.1.7:3443/Assets/CompBanners/"+compData.bannerImg;
    let imgStyle={
      width: '100%',
    };


    return (
      <div>
        <Grid container>
          <Grid item xs={12} sm={8} lg={8}>
            <Card raised className={this.props.classes.card}>
              <CardMedia className={this.props.classes.media}>
                <img src={bannerImg} style={imgStyle}/>
              </CardMedia>
              <CardContent>
                <Typography type="display1" color="inherit" className={this.props.classes.flex}>
                  {compData.name} Details
                </Typography>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={4} lg={4} xl={4}>
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
                  <Grid item xs={12} sm={8} lg={8} xl={8}>
                    <div className={this.props.classes.mapcontainer} dangerouslySetInnerHTML={{__html: this.props.competitionDetail.competition.mapRef}} />
                  </Grid>
                </Grid>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={12}>
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
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
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

