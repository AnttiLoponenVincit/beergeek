import Ember from 'ember';

export default Ember.Controller.extend({
	userService: Ember.inject.service('user-service'),
	actions: {
		selectUser(id) {
			if (id) {
				this.store.findRecord('user', id)
					.then(user => {
						this.get('userService').selectUser(user)
						this.transitionToRoute('beer-list');
					});
			}
		}
	}
});
