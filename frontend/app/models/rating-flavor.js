import DS from 'ember-data';

export default DS.Model.extend({
	rating: DS.belongsTo("rating", {inverse: null}),
	flavor: DS.belongsTo("flavor", {inverse: null}),
	strength: DS.attr("number")
});
