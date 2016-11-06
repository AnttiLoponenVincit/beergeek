export function initialize(application) {
    application.inject('service', 'cookie', 'cookie:main');
    application.inject('model', 'rateService', 'service:rate-service' )
}

export default {
    name: 'rate-beer',
    after: ['cookie'],
    initialize: initialize
}