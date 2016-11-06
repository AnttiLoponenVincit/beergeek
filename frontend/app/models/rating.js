import DS from 'ember-data';
import RatingUtils from '../utils/rating-utils';

const UNIT = 'ml';

function getServingType(portionSize, servingType) {
	if (servingType === 'cask' || servingType === 'tap') {
		return servingType;
	} else {
		if (servingType && portionSize) {
			return `${portionSize} ${UNIT} ${servingType}`;
		} else {
			return "";
		}
	}
}

function getDetails(portionSize, servingType, location) {
	let result = getServingType(portionSize, servingType);
	if (location) {
		if (result.length > 0) {
			result += " at " + location;
		} else {
			result += "Enjoyed at " + location;
		}
	}
	if (result.length > 0) {
		result += ". ";
	}
	return result;
}

function getHeadAppearance(headColor, headSize) {
	if (headSize) {
		if (headSize === '0') {
			return 'No head.';
		} else if (headColor) {
			return `The head is ${headColor} and ${RatingUtils.getTranslationFor('headSize', headSize)}. `;
		} 
	} else if (headColor) {
		return `The head is ${headColor}`; 
	}
	return "";	
}

function getAppearance(color, opaqueness) {
	if (color) {
		const UPPERCASED = color.charAt(0).toUpperCase() + color.slice(1);
		return `${UPPERCASED} colored ${opaqueness ? opaqueness + " " : ""}beer. `;
	} else {
		return "";
	}
}

function getPalate(thickness, bitterness, carbonation) {
	if (thickness && bitterness && carbonation) {
		return `The palate is ${RatingUtils.getTranslationFor('thickness', thickness)} and ${RatingUtils.getTranslationFor('bitterness', bitterness)} 
		bitter with ${RatingUtils.getTranslationFor('carbonation', carbonation)} carbonation. `;
	} else {
		return "";
	}
}

function listAromas(aromas) {
	if (aromas.get('length') > 0) {
		return `Aroma has ${concatList(aromas)}`
	} else {
		return "";
	}
}

function listFlavors(flavors) {
	if (flavors.get('length') > 0) {
		return `Flavor has ${concatList(flavors)}`
	} else {
		return "";
	}
}

function listAftertastes(aftertastes, aftertasteLength) {
	if (aftertastes.get('length') > 0) {
		if (aftertasteLength) {
			return `Aftertaste is ${RatingUtils.getTranslationFor('aftertasteLength', aftertasteLength)} and has ${concatList(aftertastes)}`
		} else {
			return `Aftertaste has ${concatList(aftertastes)}`
		 
		}
	} else {
		if (aftertasteLength) {
			return `Aftertaste is ${RatingUtils.getTranslationFor('aftertasteLength', aftertasteLength)}.`
		} else {
			return "";
		}
	}
}

function orderListByStrength(list) {
	let strong = [];
	let medium = [];
	let weak = [];
	list.forEach(item => {
		if (item.get('strength') === '1') {
			weak.push(item);
		} else if (item.get('strength') === '3') {
			strong.push(item);
		} else {
			medium.push(item);
		}
	});
	const result = [];
	[medium, strong, weak].forEach(list => {
		list.forEach(item => {
			result.pushObject(item);
		});
	});
	return result;
}

function concatList(list) {
	let result = "";
	list = orderListByStrength(list);
	for (let i = 0; i < list.get('length'); i++) {
		let item = list.objectAt(i);
			console.log(item.get('strength'));
		if (item.get('strength') === "1") {
			result += 'little ';
		} else if (item.get('strength') === "3") {
			result += 'lots of ';
		} else {
			console.log(' no match');
		}
		result += item.get('flavor').get('name');
		if (i === list.get('length') - 2) {
			result += " and ";
		} else if (i === list.get('length') -1) {
			result += ".";
		} else {
			result += ", ";
		}
	}
	return result;
}

function getNumericalScore(value) {
	if (value) {
		return parseInt(value);
	} else {
		return 0;
	}
}

export default DS.Model.extend({
	beer: DS.belongsTo("beer"),
	user: DS.belongsTo("user"),
	color: DS.attr("string"),
	opaqueness: DS.attr("number"),
	headSize: DS.attr("number"),
	thickness: DS.attr("number"),
	bitterness: DS.attr("number"),
	headColor: DS.attr("string"),
	aftertasteLength: DS.attr("string"),
	servingType: DS.attr("string"),
	portionSize: DS.attr("number"),
	flavors: DS.hasMany("rating-flavor", {inverse: null}),
	aromas: DS.hasMany("rating-flavor", {inverse: null}),
	aftertastes: DS.hasMany("rating-flavor", {inverse: null}),
	flavorScore: DS.attr("number"),
	aromaScore: DS.attr("number"),
	palateScore: DS.attr("number"),
	appearanceScore: DS.attr("number"),
	overallScore: DS.attr("number"),
	overallComment: DS.attr('string'),
	location: DS.attr('string'),
	text: Ember.computed('color', 'opaqueness', 'headSize', 
		'thickness', 'bitterness', 'headColor', 'aftertasteLength', 
		'servingType', 'portionSize', 'aromas', 'flavors', 'aftertastes', 
		'aromas.@each.strength', 'flavors.@each.strength', 
		'aftertastes.@each.strength', 'overallComment', 'location', function () {
		var TEXT = `${getDetails(this.get('portionSize'), this.get('servingType'), this.get('location'))} ${getAppearance(this.get('color'), this.get('opaqueness'))} ${getHeadAppearance(this.get('headColor'), this.get('headSize'))} ${listAromas(this.get('aromas'))} ${listFlavors(this.get('flavors'))} ${getPalate(this.get('thickness'), this.get('bitterness'), this.get('carbonation'))} ${listAftertastes(this.get('aftertastes'), this.get('aftertasteLength'))} ${this.get('overallComment') ? this.get('overallComment') + "." : ""}`;
		return TEXT;
	}),
	score: Ember.computed('flavorScore', 'aromaScore', 'palateScore', 'appearanceScore', 'overallScore', function () {
		return getNumericalScore(this.get('flavorScore')) + 
			getNumericalScore(this.get('palateScore')) + 
			getNumericalScore(this.get('aromaScore')) + 
			getNumericalScore(this.get('appearanceScore')) + 
			getNumericalScore(this.get('overallScore'));

	})
});
