import Ember from 'ember';

export default Ember.Route.extend({

	userService: Ember.inject.service(),
	model(params) {
		this.get('userService').checkUser(this);

		return this.store.find('beer', params.beer_id);
	},
	setupController(controller, model) {
		controller.set('model', model);
		this.store.find('user', this.get('userService').getCurrentUserId()).then(user => {
			controller.set('rating', this.store.createRecord('rating', {
		 		appearanceScore: 1,
				aromaScore: 1,
				flavorScore: 1,
				palateScore: 1,
				overallScore: 1,
				overallComment: "",
				beer: model,
				user: user
			}));
		});

		controller.loadFlavors();
	}


});
