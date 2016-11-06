import Ember from 'ember';

export default Ember.Route.extend({

	userService: Ember.inject.service(),
	model(params) {
		this.get('userService').checkUser(this);

		return Ember.RSVP.hash({
			rating: this.store.createRecord('rating', {
				appearanceScore: 1,
				aromaScore: 1,
				flavorScore: 1,
				palateScore: 1,
				overallScore: 1,
				overallComment: ""
			}),
			beer: this.store.find('beer', params.beer_id),
			flavors: []
		})
	},
	afterModel(model) {
		
		if (!model.rating) {
			model.rating = this.store.createRecord('rating', {
				appearanceScore: 1,
				aromaScore: 1,
				flavorScore: 1,
				palateScore: 1,
				overallScore: 1,
				overallComment: ""
			});
		}
		
		model.rating.set('beer', model.beer);
		this.store.find('user', this.get('userService').getCurrentUserId()).then(user => {
			model.rating.set('user', model.user);
		});
	},
	setupController(controller, model) {
		controller.set('model', model);
		controller.loadFlavors();
	}


});
