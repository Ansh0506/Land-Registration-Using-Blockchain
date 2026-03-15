#!/bin/bash

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if [ ! -d "crypto-config" ]; then
  echo "Generating crypto material..."
  cryptogen generate --config=./crypto-config.yaml --output=crypto-config
fi

export FABRIC_CFG_PATH="$SCRIPT_DIR"

if [ ! -f "genesis.block" ]; then
  echo "Creating genesis block..."
  configtxgen \
  -profile Genesis \
  -channelID system-channel \
  -outputBlock ./genesis.block
fi

echo "Starting Fabric containers..."
docker-compose up -d

echo "Network started successfully!"
docker ps