# NFT burn - block explorer
The block explorer is an instance of [BlockScout](https://github.com/blockscout/blockscout) targeting the local Hardhat testing network.

**WARNING:** This project is not meant to be used in a production environment! For production use, a unique `SECRET_KEY_BASE` needs to be generated, and all settings need to be tweaked, but it's unclear how many changes are required for this project to be secure.

## Prerequisites
Make sure you have **Docker** and **Docker Compose** installed on your system.

## Usage
First, you need to make sure the Hardhat testing blockchain is running:
```
cd ../
docker-compose up -d smart-contracts

# or

cd ../smartContracts
yarn hhNode
```

Now start the blockchain explorer itself.

```
yarn start # starts all docker-compose services

yarn stop # stops and deletes all docker-compose services
yarn stopAndClean # stops and deletes all docker-compose services, including their volumes
```
You can access the blockchain explorer at http://localhost:4000/.

## Docker Compose update
The settings for Docker Compose in this project are extracted from the
[Blocksout repository](https://github.com/blockscout/blockscout/tree/master/docker-compose) with minor changes. 
Use `git log` & `git blame` to get an idea about what changes were applied.
You can update settings from time to time by copying current Docker Compose settings from the project
and reapplying the changes done.
