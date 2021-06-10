declare global {
  interface Window {
    web3: any;
    ethereum: any;
  }
}
import { Component } from '@angular/core';
import Web3 from 'web3';
import * as myGlobals from './global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isConnected: boolean = false;
  balance: any;
  currentAccount: any;
  web3: any;
  degreeContract: any;
  degreeAbi: any = myGlobals.abiContract;
  degreeAddr: string = myGlobals.contractAddress;
  hash: string;
  constructor(){
    if (typeof window.web3 !== 'undefined') {
      this.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/f502d2b02a8442d09b3eca464acc41b9"));
      this.degreeContract = new this.web3.eth.Contract(this.degreeAbi, this.degreeAddr);
    } else {
      console.warn(
        'Please use a dapp browser like mist or MetaMask plugin for chrome'
      );
    }
  }

  ngOnInit(){
    
  }

  async connectWeb3(){
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts[0] != undefined){
        this.currentAccount = accounts[0];
        this.isConnected = true;
        console.log("Account connected : " + accounts[0]);

        this.web3.eth.getBalance(this.currentAccount, (err, balance) => {
          this.balance = balance / 1000000000000000000;
        });
      }
    } catch (error) {
      this.isConnected = false;
      console.log(error);
    }
  }

  addHash(){
    this.degreeContract.methods.addHash(this.hash).send({ from: this.currentAccount }).on('transactionHash', function (hash) {
    })
      .on('confirmation', function (confirmationNumber, receipt) {
        console.log(receipt);
      })
      .on('receipt', function (receipt) {
      })
      .on('error', console.error)
  }

  checkHash(){
    this.degreeContract.methods.checkHash(this.hash).send({ from: this.currentAccount }).on('transactionHash', function (hash) {
    })
      .on('confirmation', function (confirmationNumber, receipt) {
        console.log(receipt);
      })
      .on('receipt', function (receipt) {
      })
      .on('error', console.error)
  }
}
