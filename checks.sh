#!/usr/bin/env sh

# make sure all repositories pass their checks (lint, format, etc.)

(cd eth_hardhat_ts && yarn checks)
(cd qwik_web && yarn checks)
(cd qwik_web3_ethers && yarn checks)
