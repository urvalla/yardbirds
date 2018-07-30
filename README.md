# OpenUrvalla Solidity

OpenUrvalla is a library for writing flexible modular [Smart Contract](https://en.wikipedia.org/wiki/Smart_contract) applications on Ethereum.

OpenUrvalla is based on [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-solidity) library and provides modificated and extended contracts to cover surtain usecases.

The philosophy behind library is based on:
* Decentralised smart-contract based applications should be upgradable and mantainable just like any other application
* Upgradability and mantainablity can be achieved by modularity
* Modularity can be achieved by segregating responsibilities
* Mantainablity is also a human-mistake tolerancy (where possible)
* Entry-point contracts (which are called directly by users) should be replaced much less often than internal (for example ERC20 & ERC721)
* Entry-point contracts should be simple for not being upgraded frequently