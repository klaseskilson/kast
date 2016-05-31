import { Random } from 'meteor/random';
import { Session } from 'meteor/session';

// init and define routes
import './routes.jsx';

Session.setDefault('clientId', Random.id());

// Fix up prefixing
window.AudioContext = window.AudioContext || window.webkitAudioContext;
