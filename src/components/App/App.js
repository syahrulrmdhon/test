import React, { Component } from 'react';
import { Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { CustomPropsRoute } from './../../components';
import { MainRoutes } from './../../routes/routes';

class App extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    const token = localStorage.getItem('token')
    const user_id = localStorage.getItem('user_id')

    if(token == null){
      this.props.history.push('/')
    } else if(user_id == null){
      const school_list = localStorage.getItem('school_list')
      if(school_list != null){
        this.props.history.push('/switch')
      } else {
        localStorage.clear()
        this.props.history.push('/')
      }
    }
  }

  render() {
    return (
      <div className="h-100">
        {/* <main className="h-100"> */}
          <Switch>
            {MainRoutes.map((route, key) => {
              return (
                <CustomPropsRoute {...route} key={key} />
              )
            })}
          </Switch>
        {/* </main> */}

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