import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('rate-beer', {path: 'rate-beer/:beer_id'});
  this.route('beer', function() {
    this.route('create');
  });
  this.route('user', function() {
    this.route('create');
  });
  this.route('beer-list');
});

export default Router;
