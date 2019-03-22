import React, { Component } from 'react';
import { Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { CustomPropsRoute } from './../../components';
import { MainRoutes } from './../../routes/routes';
import { disable } from './../../views/global/modal'

class App extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    const token = localStorage.getItem('token')
    const regist_token = localStorage.getItem('regist_token')
    const user_id = localStorage.getItem('user_id')
    const path_url = this.props.location.pathname


    if(regist_token == null){
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
      } else {
        if(path_url == '/'){
          this.props.history.push('/home')
        }
      }
    }
    
    this.disableScreen();
  }

  disableScreen () {
    const width = window.screen.width

    if (width <= 700){
      disable({
        message: `Resolusi layar tidak mendukung.`,
      })
    }
}

// Initial execution if needed

  render() {
    const width = window.screen.width
    return (
      <div className="h-100">
        {/* <main className="h-100"> */}
          { width > 700 &&
            <Switch>
              {MainRoutes.map((route, key) => {
                return (
                  <CustomPropsRoute {...route} key={key} />
                )
              })}
            </Switch>
          }
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