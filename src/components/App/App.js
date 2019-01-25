import React, { Component } from 'react';
import { Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { CustomPropsRoute } from './../../components';
import { MainRoutes } from './../../routes/routes';

class App extends Component {
  render() {
    return (
      <div className="h-100">
        <main className="h-100">
          <Switch>
            {MainRoutes.map((route, key) => {
              return (
                <CustomPropsRoute {...route} key={key} />
              )
            })}
          </Switch>
        </main>

      </div>
    )
  }
}
const mapStateToProps = state => ({
  // user: state.login
});

const mapDispatchToProps = dispatch => ({
  // userAction: bindActionCreators(userAction, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));