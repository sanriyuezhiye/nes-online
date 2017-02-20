import React from 'react'
import { Link } from 'react-router'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'

import './main.scss'

import utils from './utils'
import api from '../../api/user/login'
import {userSet} from '../../actions/actions'
import ws from '../../utils/websocket.js'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mask: "login"
    }
  }

  login() {
    var account = document.getElementsByName('account')[0].value;
    var password = document.getElementsByName('password')[0].value;
    api.login(account, password, (data) => {
      var id = 'check';
      if (!data.state) {
        utils.msgERR(id, data.msg);
        return
      }
      utils.msgOK(id, data.msg);
      this.props.userSet(data.user);
      ws.createWS(data.user);
      this.setState({mask: ""});
    });
  }
  
  enter(e) {
    if(e.keyCode == 13)
      this.login();
  }

  render() {
    if (this.state.mask==""){
      return (<div />)
    }
    return (
      <div className='MaskLayer'>
        <div className='Form'>
          <h1>登录</h1>
          <input type='text' placeholder='用户名/邮箱' name='account' autoComplete="off" autoFocus/>
          <input type='password' placeholder='密码' name='password' autoComplete="off" onKeyUp={this.enter.bind(this)}/>
          <div className='link'>
            <Link to="/register" className='leftLink'>没有帐号？</Link>
            <Link to="/forgetPassword" className='rightLink'>忘记密码？</Link>
          </div>
          <button type='button' className='enableButton' onClick={this.login.bind(this)}>登录</button>
          <div id='check' className='msg'></div>
          <a href='https://github.com/login/oauth/authorize?client_id=2443d910b04cd68c5a66&scope='>
            <img src="/img/github.png"/>
          </a>
        </div>
      </div>
    )
  }
}

export default connect(null, {userSet})(Login);