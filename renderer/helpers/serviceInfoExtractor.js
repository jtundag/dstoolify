export default {
    getIconFrom(availableServices, service) {
        let foundService = _.find(availableServices, (ser) => ser.id == service.app_id)
        if (!foundService) return 'fas fa-question-mark'
        return foundService.icon
    },
    getNameFrom(availableServices, service) {
        let foundService = _.find(availableServices, (ser) => ser.id == service.app_id)
        if (!foundService) return 'Unnamed'
        return foundService.name
    },
    getURLFrom(availableServices, service) {
        let foundService = _.find(availableServices, (ser) => ser.id == service.app_id)
        if (!foundService) return 'Unnamed'
        return foundService.url
    },
    getMinWidthFrom(availableServices, service) {
        let foundService = _.find(availableServices, (ser) => ser.id == service.app_id)
        if (!foundService) return 400
        return foundService.min_width
    }
}