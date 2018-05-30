# Just A Rather Very Intelligent System (J.A.R.V.I.S)
A Realtime Streaming Dashboard of financial transactions
 
### Technologies and architecture used
JARVIS uses a number of open source tools:

* [Rethinkdb] - The open source database for the real time web !
* [Horizon.i.o] - The real time JavaScript backend !
* [AngularJS 2] - The JavaScript framework for web applications !
* [Node.js] - An open-source, cross-platform runtime environment for developing server-side Web ! 
* [Express.js] - A Node.js web application server framework, designed for building single-page, multi-page, and hybrid web applications !
* [ng2-admin] - Admin panel framework based on Angular 2, Bootstrap 4 and Webpack ! 

### What your code is designed for 
It is designed for building up a realtime streaming dashboard for the banks to monitor their financial transactions in REAL TIME . The demand for stream processing is increasing a lot these days. The reason is that often processing big volumes of data is not enough.

Data has to be processed fast, so that a firm can react to changing business conditions in real time. At this moment Big data is a buzzword which comes with three V's Volume, Velocity and Variety. This huge data posses a challenge of fast processing of data. JARVIS has the solution for both of these business problems through the technologies it uses. Jarvis is built up on a backend server Rethinkdb and Node.js, Javascript client library and Horizon.

### What your code was written in 
 - A backend server built with Node.js and RethinkDB that supports data persistence, realtime streams, input validation, user authentication, and permissions
 - A JavaScript client library that developers can use on the frontend to store JSON documents in the database, perform queries, and subscribe to live updates
 - A command-line tool that can generate project templates, start up a local Horizon development server, and help you deploy your Horizon application to the cloud
 - Horizon is an open source software which will watch for change feeds or live updates in Rethinkdb and push it to the front end. It eliminates repetitive boilerplate and tedious steps like hand-writing CRUD endpoints, authentication, and session management.
 - Node.js
 - Angular 2
 - ng2-admin

#### Open source or proprietary software used 
 - Rethinkdb - open source
 - Horizeon - open source
 - Node.js - open source
 - Angular 2 - open source
 - Boilerplated dashboard form ng2-admin - open source

### Why is it cool
J.A.R.V.I.S is cool because its built on open source tools + cool UI + real time feed + easy to develop + Mark Zukerburg is planning to build it and hey Iron Man has it and we have it too!
 
### Installation

JARVIS requires [Node.js](https://nodejs.org/) v6+ to run.

### Rethinkdb
You need Rethinkdb installed globally:

Download link for [RethinkDB](https://www.rethinkdb.com/docs/install/windows/)

```sh
Press Win + X and click “Command Prompt”; or
Open the Start Menu, click “Run,” and type “cmd” ENTER
```
### Horizon
Before installing Horizon, you must install the RethinkDB server. 

Install Horizon from npm:
```sh
npm install -g horizon
```

**Free Software, Hell Yeah!**

   [RethinkDB]: <https://www.rethinkdb.com/>
   [Horizon]: <http://horizon.io/>
   [Node.js]: <https://nodejs.org/en/>
   [AngularJS]: <http://angularjs.org>
