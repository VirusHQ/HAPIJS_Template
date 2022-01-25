# API Template

## Links
* [Hapi Documentation](https://hapi.dev/)

## Environment
Security must be managed properly in API, no .env file is to be checked into the code repository.  .env.example file will give you guidance on what to use to properly configure an .env file.

## Understanding structure
* API is developed in a controller model format.  Think models will persist information into the database.
* Use migrations/seeders folder to properly manage database changes
* Route all paths through ./config/routes

## Database Schema
Database schema is done via Sequelize

### Model creation and migration example
```
npx sequelize-cli model:generate --name market --attributes timeStamp:DATE,epochTime:INTEGER,symbol:STRING,bid:DOUBLE,ask:DOUBLE,bidVolume:DOUBLE,askVolume:DOUBLE,spread:DOUBLE,microLotValue:DOUBLE,miniLotValue:DOUBLE,lotValue:DOUBLE,tradable:BOOLEAN,epochTimeLocal:INTEGER,timeStampLocal:DATE
```

### Model copy example
```
sequelize-auto -c "config\config.js" -o "models" -h <host> -d <database> -u <user> -x [password] -p [port]  --dialect [dialect] -t [tableName]
```

### Create Kubernetes env secret file
```
kubectl create secret generic bigpotato-secret --from-env-file=.env -n crm
```

### Delete Kubernetes env secret file
```
kubectl delete secret bigpotato-secret -n crm
```

### Associations
Associations must be done manually though each model file

## How template is built
1. All required packages are installed
2. Sequelize is initiated
```
sequelize init
```
3. Hapi is configured to work with JWT and Swagger

### About populateSQL.js
This script populates 1000 rows in the sql table.
Table schema 
```
CREATE TABLE `videos` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`url` VARCHAR(250) NOT NULL COLLATE 'latin1_swedish_ci',
	`thumbnailUrl` VARCHAR(250) NOT NULL COLLATE 'latin1_swedish_ci',
	`isPrivate` TINYINT(1) NOT NULL DEFAULT '0',
	`timesViewed` INT(11) NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;

```
