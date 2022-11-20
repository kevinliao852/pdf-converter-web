# Server

## How to start Rabbitmq 
```shell
docker run -d --hostname my-rabbit --name some-rabbit rabbitmq:3
```

## How to Start a Worker

```shell
cd server
python3 -m worker.worker
```

