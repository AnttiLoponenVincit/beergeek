import Ember from 'ember';

export default Ember.Service.extend({
	selectUser(user) {
		this.get('cookie').setCookie('currentUserId', user.id, { expires: 7, path: '/' });
	},
	checkUser(controller) {
		controller.store.find('user', this.get('cookie').getCookie('currentUserId'))
		.then(user => {		
			if (!user) {
				controller.transitionToRoute('/');
			} else {
				controller.set('user', user);
			}
		});
	},
	getCurrentUser(controller) {
		return controller.store.find('user', this.getCurrentUserId())
	},
	getCurrentUserId() {
		return this.get('cookie').getCookie('currentUserId');
	}
});
