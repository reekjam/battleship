import React from 'react';
import { connect } from 'react-redux';
import App from '../components/App';
import { Route } from 'react-router';
import BoardContainer from '../containers/BoardContainer';
import GameContainer from '../containers/GameContainer';
import WelcomeContainer from '../containers/WelcomeContainer';

class AppContainer extends React.Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={WelcomeContainer} />
        <Route exact path='/player-one' component={GameContainer} />
        <Route exact path='/player-two' component={GameContainer} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    activeGame: state.activeGame,
  };
}

export default connect(mapStateToProps)(AppContainer);
