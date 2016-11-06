import Ember from 'ember';

export default Ember.Controller.extend({
	notification: "",
	actions: {
		save(user) {
			if (user && user.get('name')) {
				user.save().then(user => {
					const name = user.get('name');
					this.set('notification', `User ${name} saved!`);
					this.set('model', this.store.createRecord('user'));
				});
			}
		}
	}
});