import Ember from 'ember';

export default Ember.Controller.extend({
	userService: Ember.inject.service('user-service'),
	user: null,
	init() {
		this.updateUser();
	},
	updateUser() {
		this.get('userService').checkUser(this);
	},
	actions: {
		setUser() {
			this.updateUser();
		}
	}	
});
