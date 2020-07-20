#!/bin/bash

distro=("pictureme" "pictureme_api")
len=${#distro[@]}


# for i in ${arraylen}
# do
#     echo "Welcome $i times"
# done

# for (( i=0; i<$len; i++ )); 
#     do echo "${distro[$i]}" ; 
# done


SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT="$(dirname "${SCRIPT_DIR}")"
PORT=0

for (( i=0; i<$len; i++ )); 
    do echo "${distro[$i]}" ; 

    if test "${distro[$i]}" = "pictureme"
    then
        PORT=9100
    else
        PORT=9101
    fi

    docker-compose -p ${distro[$i]} up -d

    echo " ----- Starting Disposable Docker Container -----"

    # Now, depending on whether our services are running or not, link them into our disposable container.
    echo " ----- Starting up Container -----"
    docker run \
        -i \
        -t \
        -p ${PORT}:${PORT} \
        -v ${ROOT}:/var/www \
        --env-file=${ROOT}/.env \
        --network=${distro[$i]}_main_network \
        ${distro[$i]} \
        sh -c "npm install"
done