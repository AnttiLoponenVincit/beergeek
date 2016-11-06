import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr("string"),
	strength: DS.attr("number"),
	ratingFlavors: DS.hasMany("rating-flavor")
});
