import React, { Component } from 'react';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
        id: "",
        balance: "",
        inputId: "",
        inputDeposit: "",
        inputWithdraw: "",
        transferAmount: "",
        transferRecipient: "",
    }
  }

  render() {
    return (
      <div>
          <div>
          <input placeholder="Account ID" onChange={this.inputId}></input>
          <button onClick={this.getAcc}>Login</button>
          <br/>
          <button onClick={this.createAcc}>New Account</button>
        </div>
        <div>

          
        <button onClick={this.deleteAcc}>Delete Account</button>
          <p>{this.state.id}</p>
          <p>{this.state.balance}</p>
          <input placeholder="Deposit" onChange={this.inputDeposit}></input>
          <button onClick={this.deposit}>Deposit</button>
          <br/>
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

getAcc=()=>{
  let URL=`/api/account/` + this.state.inputId;
  let request = new XMLHttpRequest();
  request.open('GET', URL);
  request.responseType = 'json';
  request.onload=()=>{
      this.setState({
          id:request.response.id,
          balance:request.response.balance
      });
  }
  request.send();
}

createAcc=()=>{
  let URL=`/api/account`;
  let request = new XMLHttpRequest();
  request.open('POST', URL);
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("Accept", "application/json");
  request.responseType = 'json';
  request.onload=()=> {
    console.log(request.response)
      // this.getAcc();
  }
  let body = {
              balance:0 
              };
  body = JSON.stringify(body);
  request.send(body);
}

deleteAcc=()=>{
  let URL=`/api/account/` + this.state.inputId;
  let request = new XMLHttpRequest();
  request.open('DELETE', URL);
  request.responseType = 'json';
  request.onload=()=> {
    //render a homepage
  }
  request.send();
}

deposit=()=>{
  let URL=`/api/account/alter/`+ this.state.id;
  let request = new XMLHttpRequest();
  request.open('PUT', URL);
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("Accept", "application/json");
  request.responseType = 'json';
  request.onload=()=> {
      this.getAcc();
  }
  let body = {
              id: this.state.id,
              balance: this.state.deposit 
              };
  body = JSON.stringify(body);
  request.send(body);
}

withdraw=()=>{
  let URL=`/api/account/alter/`+ this.state.id;
  let request = new XMLHttpRequest();
  request.open('PUT', URL);
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("Accept", "application/json");
  request.responseType = 'json';
  request.onload=()=> {
      this.getAcc();
  }
  let body = {
              id: this.state.id,
              balance: -(this.state.withdraw) 
              };
  body = JSON.stringify(body);
  request.send(body);
}

check=()=>{
  let URL=`/api/account/check` + this.state.transferRecipient;
  let request = new XMLHttpRequest();
  request.open('GET', URL);
  request.responseType = 'json';
  request.onload=()=>{
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

transfer=()=>{
  let URL=`/api/account/transfer/`+ this.state.transferRecipient;
  let request = new XMLHttpRequest();
  request.open('PUT', URL);
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("Accept", "application/json");
  request.responseType = 'json';
  request.onload=()=> {
      this.getAcc();
  }
  let body = {
              id: this.state.id,
              balance: this.state.transferAmount
              };
  body = JSON.stringify(body);
  request.send(body);
}

inputId=(d)=>{
  this.setState({
      inputId:d.target.value
  });
}

inputDeposit=(d)=>{
  this.setState({
      deposit:d.target.value
  });
}

inputWithdraw=(d)=>{
  this.setState({
      withdraw:d.target.value
  });
}

transferAmount=(d)=>{
  this.setState({
      transferAmount:d.target.value
  });
}

transferRecipient=(d)=>{
  this.setState({
    transferRecipient:d.target.value
  });
}



}


