import React, { Component } from 'react';
// import { connect } from 'react-redux';

import {
  // Redirect,
  Route
} from 'react-router-dom';

class CustomPropsRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    // if (this.props.level) {
    //   if (this.props.level === 1) { // user biasa
    //     return (
    //       <Route {...rest} render={props => (
    //         <Component {...props} initialData={initialData} />
    //       )} />
    //     );
    //   } else if (this.props.level === 2) { // super admin
    //     return (
    //       <Route {...rest} render={props => (
    //         this.props.user && this.props.user.level === 2 ?
    //           <Component {...props} initialData={initialData} /> :
    //           <Redirect to={{
    //             pathname: '/login',
    //             state: { from: this.props.location }
    //           }} />
    //       )} />
    //     );
    //   }
    // }
    return (
      <Route {...rest} render={props => {
        return <Component {...props} />
      }} />
    );
  }
}

// const mapStateToProps = state => ({
//   user: state.user
// })

// export default connect(
//   mapStateToProps
// )(CustomPropsRoute)

export default CustomPropsRoute;