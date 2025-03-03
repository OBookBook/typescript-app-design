# typescript-app-design

## usage

```shell
npx ts-node hello.ts
```

## server run

```shell
npx ts-node src/main.ts
or
npm start
```

## DB run

```shell
docker compose up -d
docker-compose logs -f
docker-compose exec mysql mysql -u reversi -p reversi
or
chmod +x ./bin/connect_mysql.sh
./bin/connect_mysql.sh

# containerdelete
docker-compose down
```

# load ddl

```shell
chmod +x ./bin/load_ddl.sh
./bin/load_ddl.sh
```
