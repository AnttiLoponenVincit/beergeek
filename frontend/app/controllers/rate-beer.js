import Ember from 'ember';
import RatingUtils from '../utils/rating-utils';

export default Ember.Controller.extend({
	newFlavor: "",
	refreshAromas: true,
	refreshFlavors: true,
	refreshAftertastes: true,
	rating: null,
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
					var itemInRating = this.get('rating').get(collection.charAt(0).toLowerCase() + collection.slice(1)).find(item => {
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
		const existingItem = this.get('rating').get(collection).find(item => {
			return item.get('flavor').get('name') === newItem.get('flavor').get('name');
		});
		if (existingItem) {
			console.log('existing item yes');
			this.get('rating').get(collection).removeObject(existingItem);
		} else {

			//newAroma.save().then(aroma => {
				this.get('rating').get(collection).addObject(newItem);
			//})
		}
	},
	actions: {
		setColor(color) {
			this.get('rating').set('color', color);
		},
		setServingType(type) {
			this.get('rating').set('servingType', type);
		},
		setHeadSize(size) {
			this.get('rating').set('headSize', size);
		},
		setHeadColor(color) {
			this.get('rating').set('headColor', color);
		},
		setOpaqueness(opaqueness) {
			this.get('rating').set('opaqueness', opaqueness);
		},
		setBitterness(bitterness) {
			this.get('rating').set('bitterness', bitterness);
		},
		setThickness(thickness) {
			this.get('rating').set('thickness', thickness);
		},
		setAftertasteLength(length) {
			this.get('rating').set('aftertasteLength', length);
		},
		setCarbonation(carbonation) {
			this.get('rating').set('carbonation', carbonation);
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
