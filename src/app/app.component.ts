declare global {
  interface Window {
    web3: any;
    ethereum: any;
  }
}
import { Component } from '@angular/core';
import Web3 from 'web3';
import * as myGlobals from './global';
import sha256 from 'sha256';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   * Frontend variables
   */
  balance: any = "Loading your balance";
  isConnected: boolean = false;
  imagePath: any = "assets/logo.png";
  
  /**
   * Web3 variables
   */
  currentAccount: any;
  web3: any;

  /**
   * Contract variables
   */
  degreeContract: any;
  degreeAbi: any = myGlobals.abiContract;
  degreeAddr: string = myGlobals.contractAddress;

  /**
   * Inputs variables
   */
  name: string = "";
  lastName: string = "";
  year: string = "";
  diplomaName: string = "";
  
  constructor(){
    if (typeof window.web3 !== 'undefined') {
      this.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/f502d2b02a8442d09b3eca464acc41b9"));
      this.degreeContract = new this.web3.eth.Contract(this.degreeAbi, this.degreeAddr);

      this.connectWeb3();
    } else {
      console.warn('Please use a dapp browser like mist or MetaMask plugin for chrome');
    }
  }

  ngOnInit(){}

  async connectWeb3(){
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts[0] != undefined){
        this.currentAccount = accounts[0];
        this.isConnected = true;

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
    let hash = this.getHash();
    Swal.fire({
      title: 'Succès',
      text: 'Le diplôme a bien été ajouté dans la blockchain',
      icon: 'success',
      confirmButtonText: 'Cool&nbsp;&nbsp;&nbsp;<i class="fas fa-thumbs-up"></i>'
    });

    this.degreeContract.methods.addHash(hash).send({ from: this.currentAccount }).on('transactionHash', function (hash) {
    }).on('confirmation', function (confirmationNumber, receipt) {
      console.log(receipt);
    }).on('receipt', function (receipt) {
    }).on('error', console.error)
  }

  checkHash(){
    let hash = this.getHash();
    Swal.fire({
      title: 'Succès',
      text: 'Le diplôme est bien présent dans la blockchain',
      icon: 'success',
      confirmButtonText: 'Cool&nbsp;&nbsp;&nbsp;<i class="fas fa-thumbs-up"></i>'
    });
    this.degreeContract.methods.checkHash(hash).send({ from: this.currentAccount }).on('transactionHash', function (hash) {
    }).on('confirmation', function (confirmationNumber, receipt) {
        console.log(receipt);
    }).on('receipt', function (receipt) {
    }).on('error', console.error)
  }

  getHash(){
    let obj: any = {
      "name": this.name,
      "lastName": this.lastName,
      "year": this.year,
      "diplomaName": this.diplomaName
    }
    let diploma : JSON = <JSON>obj;
    return sha256(JSON.stringify(diploma));
  }
}