#!/bin/bash

# This script will start a single "disposable" instance and connect the caller to it.
# The instance will link to all infrastructure, including the service containers (if it exists)
IMAGE_NAME="pictureme"

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT="$(dirname "${SCRIPT_DIR}")"

echo " ----- Starting Up Infrastructure Containers -----"

docker-compose -p pictureme up -d

echo " ----- Starting Disposable Docker Container -----"

# Now, depending on whether our services are running or not, link them into our disposable container.
echo " ----- Starting up Container -----"
docker run \
    -i \
    -t \
    -p 9100:9100 \
    -v ${ROOT}:/var/www \
    --env-file=${ROOT}/.env \
    --network=${IMAGE_NAME}_main_network \
    ${IMAGE_NAME} \
    sh -c "npm install && bash"

echo " ----- EXITED from disposable container -----"
echo " ----- Removing Exited Containers. -----"

# Now grep through all containers and stop those that have been "exited". Only do that for our service.
docker ps -a | grep Exited | awk '{ print $1,$2 }' | \
grep ${IMAGE_NAME} |  awk '{print $1 }' | xargs -I {} docker rm {}
