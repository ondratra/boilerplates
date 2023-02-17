#!/usr/bin/env sh

# make sure all repositories pass their checks (lint, format, etc.)

(cd boilerplates/001_eth_hardhat_ts && yarn checks)
(cd boilerplates/002_qwik_web && yarn checks)
(cd boilerplates/003_qwik_web3_ethers && yarn checks)
(cd boilerplates/004_blockchain_explorer && yarn checks)
