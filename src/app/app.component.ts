declare global {
  interface Window {
    web3: any;
    ethereum: any;
  }
}
import { Component } from '@angular/core';
import Web3 from 'web3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isConnected: boolean = false;
  web3: any;
  degreeContract: any;
  degreeAbi: any = [
    {
      "constant": true,
      "inputs": [],
      "name": "last_completed_migration",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "fileHash",
          "type": "string"
        }
      ],
      "name": "addHash",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "string",
          "name": "fileHash",
          "type": "string"
        }
      ],
      "name": "checkHash",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "string",
          "name": "a",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "b",
          "type": "string"
        }
      ],
      "name": "compareStrings",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    }
  ]
  degreeAddr: string = '0x155180faABC6bBD85de6bb9Bff7e79a91c1682CE'
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
    await window.ethereum.enable();
    this.isConnected = true;
    // this.web3.eth.getAccounts((err, res) => {
    //   console.log(res);
    //   console.log(err);
    // });
  }

  addHash(){
    // this.degreeContract.methods.addHash(this.hash).send({ from: firstAccount }).on('transactionHash', function (hash) {
    // })
    //   .on('confirmation', function (confirmationNumber, receipt) {
    //     console.log(receipt);
    //   })
    //   .on('receipt', function (receipt) {
    //   })
    //   .on('error', console.error)
  }

  checkHash(){
    // this.degreeContract.methods.checkHash(this.hash).send({ from: firstAccount }).on('transactionHash', function (hash) {
    // })
    //   .on('confirmation', function (confirmationNumber, receipt) {
    //     console.log(receipt);
    //   })
    //   .on('receipt', function (receipt) {
    //   })
    //   .on('error', console.error)
  }
}
