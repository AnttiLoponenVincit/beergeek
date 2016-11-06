import Ember from 'ember';

export default Ember.Component.extend({
	updateStrength(flavor, strength) {
		this.get('updateStrength')(flavor, strength);
	},
	actions: {
		setStrength(strength) {
			this.updateStrength(this.get('flavor'), strength);
		},
		remove(flavor) {
			this.get('remove')(flavor);
		}
	}
});
