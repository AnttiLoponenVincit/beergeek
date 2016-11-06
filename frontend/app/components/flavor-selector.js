import Ember from 'ember';

export default Ember.Component.extend({

	availableFlavors: null,
	selectedFlavors: null,
	init() {
		this.sort();
		this._super();
	},
	didUpdateAttrs() {
    	this._super(...arguments);
    	console.log('updating attrs');
  	},
	sort() {
		if (this.get('availableFlavors')) {
			this.set('availableFlavors', this.get('availableFlavors').sortBy('flavor.name'));
		}
	},
	actions: {
		add(flavor) {
			this.get('availableFlavors').removeObject(flavor);
			this.get('toggle')(flavor);
			this.sort();
		},
		remove(flavor) {
			this.availableFlavors.addObject(flavor);
			this.get('toggle')(flavor);
			this.sort();
		},
		updateStrength(flavor, strength) {
			this.get('updateStrength')(flavor, strength);
		}
	}
});
