#!/usr/bin/env bash

function show_help {
cat << EOH
This script manages the build and running oporations of dixit-ws.
Usage: $0 [OPTIONS]

OPTIONS
  -b, --build             build image
  --buildx86              build x86 image
  -d, --daemon            run as daemon
  --deploy                deploy to the server and restart target container
  -h, --help              this help message

Ex1: $0                   #run a new temporary interactive container
Ex2: $0 -b                #build the container
Ex3: $0 -d                #run as daemon
EOH
}

[[ -z "$@" ]] && run=1

TEMP=$(getopt -o 'bdh' --long 'build,buildx86,deploy,daemon,help' -- "$@")
eval set -- "$TEMP"
unset TEMP

while true; do
	case "$1" in
		'-h'|'--help')
            show_help; exit 0
		;;
		'--buildx86')
        build=1
		    buildx86="--platform=linux/amd64"; shift; continue
		;;
		'-b'|'--build')
		    build=1; shift; continue
		;;
		'--deploy')
		    deploy=1; shift; continue
		;;
		'-d'|'--daemon')
		    rund=1; shift; continue
		;;
		'--')
			shift; break
		;;
		*)
			echo "Option: '$1' unknown" >&2
			exit 1
		;;
	esac
done

[[ -n "$build" ]] && \
  docker build $buildx86 -t dixit-ws .

if [ -n "$deploy" ]; then
  #todo backup data before deploy new version
  docker save dixit-ws | bzip2 | pv | ssh -p 2223 root@florida.rodrigolop.es 'bunzip2 | docker load'
  scp -P 2223 container.sh root@florida.rodrigolop.es:/var/www/dixit-ws
  ssh -p 2223 root@florida.rodrigolop.es 'docker rm -f dixit-ws || echo "not running"; cd /var/www/dixit-ws; ./container.sh -d && echo "success"'
fi

[[ -n "$run" ]] && \
  docker run --rm -ti --name dixit-ws -p 7000:7000 dixit-ws sh

[[ -n "$rund" ]] && \
  docker run -d --restart=always --name dixit-ws -p 7000:7000 \
    -v /root/.acme.sh/rodrigolop.es:/app/cert \
    -v /var/log/dixit-ws:/app/log \
    --env SSL_CERT_PATH=/app/cert/fullchain.cer \
    --env SSL_KEY_PATH=/app/cert/rodrigolop.es.key \
    dixit-ws
