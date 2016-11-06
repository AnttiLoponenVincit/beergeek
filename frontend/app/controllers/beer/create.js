import Ember from 'ember';

export default Ember.Controller.extend({
	notification: "",
	actions: {
		save(beer) {
			if (beer && beer.get('name')) {
				beer.save().then(beer => {
					var name = beer.get('name');
					this.set('notification', `Beer ${name} saved!`);
					this.set('model', this.store.createRecord('beer'));
				});
			} else {
				this.set('notification', 'name cannot be empty!');
			}
		}
	}
});
