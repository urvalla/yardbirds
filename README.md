# OpenUrvalla Solidity

OpenUrvalla is a library for writing flexible modular [Smart Contract](https://en.wikipedia.org/wiki/Smart_contract) applications on Ethereum.

OpenUrvalla is based on [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-solidity) library and provides modificated and extended contracts to cover surtain usecases.

The philosophy behind library is based on:
* Decentralised smart-contract based applications should be upgradable and mantainable just like any other application
* High modularity is good for the upgradability and mantainablity
* Segregating responsibilities is good for high modularity
* External contracts (which are called directly by users) should be replaced much less often than internal, especially ERC20 & ERC721
* External contracts should be simple and delegate logic to internal contracts
* Human-mistake tolerancy (where possible), which is good for mantainablity