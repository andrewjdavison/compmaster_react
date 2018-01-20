import React from 'react';

class CompetitionDetailsPage extends React.Component {

  constructor(props) {
    super(props);

    const { competition } = props;

    this.state = {
      errors: {},
      competition: competition,
    };

  };

  componentDidMount() {

  }

  render()  {
    return (
      <h1>{this.state.competition.name}</h1>
    );
  }
};

export default CompetitionDetailsPage;
