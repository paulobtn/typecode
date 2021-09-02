# Typecode

Typecode is a typing game for programmers developed in node, react and
postgres SQL.
It serves random pieces of source code from different open source projects and
the user has to type it as fast as possible. The game will show the statistics
for words per minute and accuracy. [Try it out on Heroku](https://vast-journey-40229.herokuapp.com/)!

![webapp screenshot](/typecode.png)

## Installation

To use this app in a development environment, first install the dependencies from the api server and the client by going
to the root directory of this project and running:
```bash
npm install && npm install --prefix client
```
Next, create a [Postgres](https://www.postgresql.org/) database and run the following migration to create the required
objects:

```bash
DATABASE_URL=postgres://<your-pg-username>:<your-pg-password>@<your-pg-host>:<your-pg-port>/<your-pg-database> npm run migrate up
```
You can run the project with:
```bash
npm run dev
```
It's possible to run tests with:
```bash
npm run test
```
Access the application in the uri:
```
http://localhost:3000/
```
