const COLORS = ["straw yellow", "white golden", "golden", "orange", "dark orange", 
"amber", "copper", "mahogany", "ruby red", "red", "light brown", "cola brown", 
"dark brown", "almost black", "black"];

const OPAQUENESS = ["clear", "hazy", "cloudy", "murky", "opaque"];

const HEAD_SIZE = [{"value": 0, "translation": "none"}, {"value": 1, "translation": "small"}, {"value": 2, "translation": "medium"}, {"value": 3, "translation":"large"}, {"value": 4, "translation":"huge"}];

const HEAD_COLOR = ["white", "off-white", "beige", "tanned", "light brown", "brown", "pink"];

const THICKNESS = [
	{"value": 0, "translation": "watery"}, {"value": 1, "translation": "thin"}, {"value": 2, "translation": "quite thin"}, {"value": 3, "translation": "medium full"}, 
	{"value": 4, "translation": "quite full"}, {"value": 5, "translation": "full"}
];

const BITTERNESS = [
	{"value": 0, "translation": "none"}, {"value": 1, "translation": "light"}, {"value": 2, "translation": "quite light"}, {"value": 3, "translation": "medium"}, 
	{"value": 4, "translation": "quite heavy"}, {"value": 5, "translation": "heavy"}
];

const AFTERTASTE_LENGTH = [
	{"value": 0, "translation": "none"}, {"value": 1, "translation": "short"}, {"value": 2, "translation": "quite short"}, {"value": 3, "translation": "medium long"}, 
	{"value": 4, "translation": "quite long"}, {"value": 5, "translation": "long"}
];	

const CARBONATION = [
	{"value": 0, "translation": "flat"}, {"value": 1, "translation": "weak"}, {"value": 2, "translation": "quite weak"}, {"value": 3, "translation": "medium"}, 
	{"value": 4, "translation": "quite strong"}, {"value": 5, "translation": "strong"}
];

const SERVINGTYPES = ["bottle", "can", "tap", "cask", "plastic bottle"];

const getRatingCriteria = () => {
		return {
			opaqueness: OPAQUENESS,
			headSize: HEAD_SIZE,
			headColor: HEAD_COLOR,
			colors: COLORS,
			thickness: THICKNESS,
			bitterness: BITTERNESS,
			carbonation: CARBONATION,
			aftertasteLength: AFTERTASTE_LENGTH,
			servingTypes: SERVINGTYPES,
		}
	};

const getTranslationFor = (type, value) => {
		const criterias = getRatingCriteria();
		const typeCriterias = criterias[type];
		const VALUE = parseInt(value);
		const valueMatchingCriteria = typeCriterias.find(criteria => {
			console.log(criteria.value);
			return criteria.value === VALUE;
		});
		return valueMatchingCriteria.translation;
	};

export default {
	getRatingCriteria,
	getTranslationFor
}