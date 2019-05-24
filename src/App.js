import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      balance: "",
      inputId: "",
      inputDeposit: "",
      inputWithdraw: "",
      transferAmount: "",
      transferRecipient: "",
    }
  }

  render() {
    if (this.state.id === 0) {
      return (
        <div>
          <div class="jumbotron">
            <h1 class="display-4">Welcome to QA Bank!</h1>
            <p class="lead">To access your account, please enter your id below.</p>
            <hr class="my-4" />
            <div>
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Account ID" onChange={this.inputId}></input>
                <div class="input-group-append">
                  <button type="button" class="btn btn-outline-secondary" onClick={this.getAcc}>Login</button>
                </div>
              </div>
              <button class="btn btn-outline-secondary" onClick={this.createAcc}>New Account</button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <button onClick={this.deleteAcc}>Delete Account</button>
            <p>{this.state.id}</p>
            <p>{this.state.balance}</p>
            <input placeholder="Deposit" onChange={this.inputDeposit}></input>
            <button onClick={this.deposit}>Deposit</button>
            <br />
            <input placeholder="Withdraw" onChange={this.inputWithdraw}></input>
            <button onClick={this.withdraw}>Withdraw</button>
            <p>Transfer</p>
            <input placeholder="Amount" onChange={this.transferAmount}></input>
            <input placeholder="Recipient" onChange={this.transferRecipient}></input>
            <button onClick={this.transfer}>Transfer</button>
          </div>
        </div>
      );
    }
  }

  getAcc = () => {
    let URL = `/api/account/` + this.state.inputId;
    let request = new XMLHttpRequest();
    request.open('GET', URL);
    request.responseType = 'json';
    request.onload = () => {
      this.setState({
        id: request.response.id,
        balance: request.response.balance
      });
    }
    request.send();
  }

  createAcc = () => {
    let URL = `/api/account`;
    let request = new XMLHttpRequest();
    request.open('POST', URL);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Accept", "application/json");
    request.responseType = 'json';
    request.onload = () => {
      console.log(request.response)
      this.setState({
        id:request.response.id,
      })
    }
    let body = {
      balance: 0
    };
    body = JSON.stringify(body);
    request.send(body);
  }

  deleteAcc = () => {
    let URL = `/api/account/` + this.state.inputId;
    let request = new XMLHttpRequest();
    request.open('DELETE', URL);
    request.responseType = 'json';
    request.onload = () => {
      //render a homepage
    }
    request.send();
  }

  deposit = () => {
    let URL = `/api/account/alter/` + this.state.id;
    let request = new XMLHttpRequest();
    request.open('PUT', URL);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Accept", "application/json");
    request.responseType = 'json';
    request.onload = () => {
      this.getAcc();
    }
    let body = {
      id: this.state.id,
      balance: this.state.deposit
    };
    body = JSON.stringify(body);
    request.send(body);
  }

  withdraw = () => {
    let URL = `/api/account/alter/` + this.state.id;
    let request = new XMLHttpRequest();
    request.open('PUT', URL);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Accept", "application/json");
    request.responseType = 'json';
    request.onload = () => {
      this.getAcc();
    }
    let body = {
      id: this.state.id,
      balance: -(this.state.withdraw)
    };
    body = JSON.stringify(body);
    request.send(body);
  }

  check = () => {
    let URL = `/api/account/check` + this.state.transferRecipient;
    let request = new XMLHttpRequest();
    request.open('GET', URL);
    request.responseType = 'json';
    request.onload = () => {
      let exists = request.response;
      if (exists === 1) {
        this.transfer();
      } else {
        this.setState({
          errorMsg: "User id doesnt exist"
        })
      }
    }
    request.send();
  }

  transfer = () => {
    let URL = `/api/account/transfer/` + this.state.transferRecipient;
    let request = new XMLHttpRequest();
    request.open('PUT', URL);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Accept", "application/json");
    request.responseType = 'json';
    request.onload = () => {
      this.getAcc();
    }
    let body = {
      id: this.state.id,
      balance: this.state.transferAmount
    };
    body = JSON.stringify(body);
    request.send(body);
  }

  inputId = (d) => {
    this.setState({
      inputId: d.target.value
    });
  }

  inputDeposit = (d) => {
    this.setState({
      deposit: d.target.value
    });
  }

  inputWithdraw = (d) => {
    this.setState({
      withdraw: d.target.value
    });
  }

  transferAmount = (d) => {
    this.setState({
      transferAmount: d.target.value
    });
  }

  transferRecipient = (d) => {
    this.setState({
      transferRecipient: d.target.value
    });
  }
}