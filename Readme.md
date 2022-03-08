## How to setup this on your local machine ?

- fork/clone the repository
- install the dependencies
- Setup environment variables
- do the database setup

<br>

## Install the dependencies

After cloning, install the dependencies by running the following command in the project folder

```
npm install
```

---

<br>

## Environment variables setup

Make a new file with name, the filename should be exactly the same, written below

```
.env
```

Inside that file, set the following values

```
MYSQL_DB_HOST=<host>
MYSQL_DB_USER=<user>
MYSQL_DB_PASS=<password>
MYSQL_DATABASE=<database_name>
```

where MYSQL_DB_HOST is the name of your database, if you are running it locally, it is fine with localhost

MYSQL_DB_USER is the username of the database user

MYSQL_DB_PASS is the password of the database

MYSQL_DATABASE is the name of the database

A sample file should be something like

```
MYSQL_DB_HOST=localhost
MYSQL_DB_USER=Genos
MYSQL_DB_PASS=GenosPwd123
MYSQL_DATABASE=session
```

---

<br>

## Database setup

Make a new sql database

```sql
CREATE DATABASE <DB_NAME>
```

In the project, my database name is session, if your database name is different, use that name

---

<br>

## Run server

```
npm run dev
or
npm start
```

See package.json for what these commands do

---
