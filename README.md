# Yardbirds Solidity

Yardbirds is a library for writing flexible modular [Smart Contract](https://en.wikipedia.org/wiki/Smart_contract) applications on Ethereum.

Yardbirds is based on [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-solidity) library and provides modificated and extended contracts to cover surtain usecases.

* Decentralised smart-contract based applications should be upgradable and mantainable just like any other application
* Upgradability and mantainablity can be achieved by modularity
* Modularity can be achieved by segregating responsibilities
* Mantainablity is also a human-mistake tolerancy (where possible)
* Entry-point contracts should be replaced much less often than internal
* Entry-point contracts should be simple for not being upgraded frequently

## Getting Started

Yardbirds integrates with [Truffle](https://github.com/ConsenSys/truffle) and [Embark](https://github.com/embark-framework/embark/).

### truffle

To use with Truffle, first install it and initialize your project with `truffle init`.

```sh
npm install -g truffle
mkdir myproject && cd myproject
truffle init
```

### Embark

To use with Embark, first install it and initialize your project with `embark new MyApp`.

```sh
npm install -g embark
embark new MyApp
cd MyApp
```

## Contracts

* **token**
	* **ERC20**
		* **mintable**
			* SegMintableToken - OpenZeppelin's MintableToken with segregated transferrable minter role
			* SegMintableFinishableToken - SegMintableToken with ability to finish minting forever

## License
Code released under the [MIT License](https://github.com/urvalla/yardbirds/blob/master/LICENSE).