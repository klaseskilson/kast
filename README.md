# Kast

> :notes: The missing podcast app

[![Circle CI](https://circleci.com/gh/klaseskilson/kast.svg?style=svg&circle-token=fa082b934dc94ab50ea184871ef32619346b8436)](https://circleci.com/gh/klaseskilson/kast)
[![Dependency Status](https://david-dm.org/klaseskilson/kast.svg)](https://david-dm.org/klaseskilson/kast)

[Deployed staging](https://kast-staging.herokuapp.com/)

## Getting started

This is a `Meteor 1.3` app. First, you need to [install Meteor](https://meteor.com/install). When you've done that, copy the contents of [`settings.example.json`](settings.example.json) to `settings.json`, and enter the empty fields in that file. This file contains client IDs and secrets to the external services used in the app. Then run

```bash
npm install
npm run start
```

to install dependencies and start the app. Then head over to [`localhost:3000`](http://localhost:3000).

## Specification

This project was developed for the course TDDD27 Advanced Web Programming at Linköping University. Below is a specification of the techniques used to create, run and deploy it as well as a description of what it should do.

### Functional specification

The web site should be a podcast player, primarily focused to work on desktop. It should support the following:

* searching for podcasts available through iTunes,
* subscribing to a podcast and lists its episodes,
* marking a podcast episodes as a favourite,
* personal accounts,
* playing episodes and controlling playback from any unit where you are logged in to your account and
* pausing playback and coming back to it at a later time.

If there is time, I have a lot of ideas for the application:

* seeing what your friends listen to,
* timed bookmarks in a bookmark to mark interesting parts,
* timed comments (SoundCloud-like),
* ChromeCast support and
* offline capabilities.

### Technological specification

The short version: Kast is a Meteor application running EcmaScript 2015 and React.

#### Client

Right now, Meteor are transitioning into becoming a framework with great modular support. Anything should essentially be replaceable. For client frameworks there are three major alternatives; the default Blaze, Angular and React.

While Blaze is a great alternative for Meteor applications, supporting reactive and reusable templates with full support for all of Meteors great data pushing features, I wanted to try something new. My previous experience with Angular is that it is hard to maintain as soon as you are going to create something larger than a simple form. I also do not like the way that it handles a lot of logic in the views, essentially leaving out JavaScript and replacing it with it's own features.

React, however, feels like a modern and inviting alternative. I believe that it is not only the React part of the React eco system that is great, but that it *is* an eco system. Instead of creating a huge framework that tries to solve everything like React does (with its whole http helper et.c.), React encapsulates all these in separate libraries rather than frameworks. Besides this, React outperforms a lot of corresponding client frameworks in terms of performance and speed.

This is why the system will use **React** for the view.

#### Server

Since Kast is a **Meteor** application, DDP (distributed data protocol) will be used for data transportation, which is a WebSocket-backed JSON transporting REST-like protocol. The data will be stored in MongoDB, which has great indexing support and works excellent with JavaScript-based servers since it stores JSON-like documents.

#### Build system

The application is written in EcmaScript 2015, the next generation of JavaScript. To ensure proper compatibility with today's web browsers, transpilation will be performed by Babel JS through Meteor's asset system. To ensure the application is written in a good way, ESLint will be used with Airbnb's JavaScript code style configuration.

For CSS, Sass will be used. (I had the ambition to use [CSS Modules](https://github.com/css-modules/css-modules), but the support for Meteor's assets pipeline is currently broken.)

#### Deployment

The application will be hosted and deployed through **Heroku**, using MLab as a MongoDB service. It will also use Kadira APM to monitor performance. I have experience of running applications through Heroku since before, and have had a smooth experience.
