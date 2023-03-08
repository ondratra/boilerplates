# Nginx proxy for web demos

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)

## Install

Create a self-signed certificate for localhost
This is needed for returning HTTPS error 404 for domains that are don't served and HTTPS support on localhost.
```
./generateLocalhostKey.sh
```

## Use
```
# setup network that docker services can use to connect with nginx proxy
# this needs to be done only once
docker compose -f docker-compose.network.yml up

# start the nginx webserver proxy
docker compose up -d webserver

# stop the nginx webserver proxy
docker compose down -v
```

## Connect applications

Add **precisly this** network setting to your applications `docker-compose.yml`
```
networks:
  # this network is expected to be booted via `./docker-compose.network.yml`
  nginx-proxy-webserver-to-host:
    name: nginx-proxy-webserver-to-host
    external: true
```
and update services that you want to be behind the proxy:
```
services:
  myService:
    ...
    # expose port to localhost
    ports:
        # edit this however is needed in particular situation but make sure applications port are exposed to localhost
        - 127.0.0.1:XXX:YYY # replace YYY with port of you application and XXX with port it should be mapped on host
    networks:
      nginx-proxy-webserver-to-host:
      ipv4_address: 172.25.0.ZZZ # replace ZZZ with unique value; 100 is reserved for proxy itself
```

Then add a new config for the application's domain as described in [Add new domain](#add-new-domain) and set up a proxy
by editing the line with `proxy_pass http://host.docker.internal:XXX;`.

Now your application should be served on the domain and port you've selected and set in your virtual host configuration
(done in [Add new domain](#add-new-domain)).

---

Services are expected to serve their applications on hostname `0.0.0.0`.

Services are expected **not to expose** their ports on `0.0.0.0` (that means values
`ports: [80:80, 0.0.0.0:443:443, 8080]` are undesirable), otherwise their applications will be reachable from outside,
which is likely unwanted. This can be the whole internet if no additional restrictions are in place.


## Add new domain

Replace `__MY_DOMAIN__` in the following command and set a unique numeric code instead of `500`. The numeric code
should be in range `<500, 599>` so it is ignored by git 
(see [volumes/nginx/conf.d/.gitignore](volumes/nginx/conf.d/.gitignore)).

For proxying HTTP and HTTPS, it's best to start by adjusting the template `virtualHost.conf` and for other TCP or UDP
protocols start by adjusting `virtualHost_stream.conf`.

```
cp volumes/nginx/conf.d/virtualHost.conf.template volumes/nginx/conf.d/500-__MY_DOMAIN__.conf
# and/or
cp volumes/nginx/conf.d/virtualHost_stream.conf.template volumes/nginx/conf.d/501-__MY_DOMAIN___stream.conf

# now manually edit the new config file,y for example:
# vim volumes/nginx/conf.d/500-__MY_DOMAIN__.conf

# check that configuration is valid
docker compose up validate-nginx-config
```

Generate a certificate for the new domain. Change `DOMAIN` variable and set the `EMAIL`.
(`EMAIL` is intentionally left blank in this guide to prevent unintentional domain registration with
a stranger's e-mail)
```
DOMAIN=__MY_DOMAIN__ EMAIL= docker compose up certbot
DOMAIN=www.__MY_DOMAIN__ EMAIL= docker compose up certbot
```
