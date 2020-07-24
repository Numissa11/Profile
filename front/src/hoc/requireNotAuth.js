import  React, { Component } from  'react';
import { connect } from  'react-redux';

export  default  function (ComposedComponent) {
  class  Authentication  extends  Component {
    componentWillMount() {
      console.log("notauth", this.props.authenticated);
      if (this.props.authenticated)
        this.props.history.push('/profile');
      }
    componentWillUpdate() {
      console.log("notauth", this.props.authenticated)
      if (this.props.authenticated)
        this.props.history.push('/profile');
      }
    render() {
      return  <ComposedComponent  {...this.props}  />
    }
  }

  function  mapStateToProps(state) {
      return { authenticated:  state.auth.token?true:false };
  }

  return  connect(mapStateToProps)(Authentication);
}