import Ember from 'ember';
import RatingUtils from '../utils/rating-utils';

export default Ember.Controller.extend({
	newFlavor: "",
	refreshAromas: true,
	refreshFlavors: true,
	refreshAftertastes: true,
	init() {
		this.set('criteria', RatingUtils.getRatingCriteria());
	},
	loadFlavors() {
		this.store.findAll('flavor').then(flavors => {
			flavors = flavors.sortBy('name');
			this.set('model.flavors', flavors);
			const collections = ['Aromas', 'Flavors', 'Aftertastes'];
			collections.forEach(collection => {
				const availableCollection = 'available' + collection;
				this.set('model.' + availableCollection, [].toArray());
				this.get('model.flavors').forEach(flavor => {
					var itemInRating = this.get('model.rating').get(collection.charAt(0).toLowerCase() + collection.slice(1)).find(item => {
						flavor.get('name') === item.get('flavor').get('name');
					});
					if (!itemInRating) {
						this.get('model.' + availableCollection).pushObject(this.store.createRecord('rating-flavor', {
							flavor: flavor,
							strength: 2
						}));
					} 
				});
			});
		});
	},
	toggleCollection(newItem, collection) {
		const existingItem = this.get('model').rating.get(collection).find(item => {
			return item.get('flavor').get('name') === newItem.get('flavor').get('name');
		});
		if (existingItem) {
			console.log('existing item yes');
			this.get('model').rating.get(collection).removeObject(existingItem);
		} else {

			//newAroma.save().then(aroma => {
				this.get('model').rating.get(collection).addObject(newItem);
			//})
		}
	},
	actions: {
		setColor(color) {
			this.get('model').rating.set('color', color);
		},
		setServingType(type) {
			this.get('model').rating.set('servingType', type);
		},
		setHeadSize(size) {
			this.get('model').rating.set('headSize', size);
		},
		setHeadColor(color) {
			this.get('model').rating.set('headColor', color);
		},
		setOpaqueness(opaqueness) {
			this.get('model').rating.set('opaqueness', opaqueness);
		},
		setBitterness(bitterness) {
			this.get('model').rating.set('bitterness', bitterness);
		},
		setThickness(thickness) {
			this.get('model').rating.set('thickness', thickness);
		},
		setAftertasteLength(length) {
			this.get('model').rating.set('aftertasteLength', length);
		},
		setCarbonation(carbonation) {
			this.get('model').rating.set('carbonation', carbonation);
		},
		addFlavor() {
			if (!this.get('newFlavor')) {
				return;
			}
			const flavor = this.store.createRecord('flavor', {
				name: this.get('newFlavor')
			});
			
			flavor.save().then(() => {
				this.set('newFlavor', '');
				['Aromas', 'Flavors', 'Aftertastes'].forEach(collection => {
					var newModel = this.get('model')['available' + collection];
					newModel.pushObject(this.store.createRecord('rating-flavor', {
						flavor: flavor,
						strength: 2
					}));
					this.set('refresh' + collection, false);
					Ember.run.next(() => {
				        this.set('refresh' + collection, true);
				    });
					//this.set('model.' + collection, newModel);
				});
			});
		},
		toggleAroma(flavor) {
			this.toggleCollection(flavor, "aromas");
		},
		toggleFlavor(flavor) {
			this.toggleCollection(flavor, "flavors");
		},
		toggleAftertaste(flavor) {
			this.toggleCollection(flavor, "aftertastes");
		},
		updateStrength(flavor, strength) {
			flavor.set('strength', strength);
		}
	}
});
