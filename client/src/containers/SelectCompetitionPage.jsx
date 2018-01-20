import React from 'react';
import SelectCompetitionForm from '../components/SelectCompetitionForm.jsx';


class SelectCompetitionPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      competitions: [
        {
          name: 'Beerfest',
          id: 1,
        },
        {
          name: 'Vicbrew',
          id: 2,
        },
      ],
    };

    this.selectCompetition = this.selectCompetition.bind(this);

  };

  componentDidMount() {
    this.loadCompetitionsFromServer();
    setInterval(this.loadCompetitionsFromServer, 10000);
  }

  loadCompetitionsFromServer = () => {
    this.getCompetitions((serverComps) => {
      this.setState({competitions : serverComps.activecompetitions})
      }
    );
  }


  checkStatus(response){
    if(response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = new Error(`HTTP Error ${response.statusText}`);
      error.status = response.statusText;
      error.response = response;
      console.log(error);
      throw error;
    }
  }

  parseJSON(response) {
    return response.json();
  }



  getCompetitions(success){
    return fetch('/activecompetitions', {
      headers: {
        Accept: 'application/json',
      },
    }).then(this.checkStatus)
      .then(this.parseJSON)
      .then(success);
  }




  /***
   * Set the selected competition based on user input
   *
   * @param {object} event - the Javascript Event Object
   ***/

  selectCompetition(event){
    console.log('Selected Competition');
    console.log(event);
  }

  render() {
    return (
      <SelectCompetitionForm
        onSubmit={this.selectCompetition}
        onSelect={this.selectCompetition}
        errors={this.state.errors}
        competitions={this.state.competitions}
      />
    );
  }

};

export default SelectCompetitionPage;
