import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel() {
		this.controllerFor('beer-list').send('setUser');
	},
	model() {
		return this.store.findAll('beer');
	}
});
