const state = () => ({
    availableServices: [{
            id: 'social_fb_web',
            name: 'Facebook',
            group: 'social',
            icon: 'fab fa-facebook-f',
            url: 'https://m.facebook.com/',
            min_width: 450
        },
        {
            id: 'social_fb_chat',
            name: 'Messenger',
            group: 'social',
            icon: 'fab fa-facebook-messenger',
            url: 'https://www.messenger.com/',
            min_width: 900
        },
        {
            id: 'social_fb_analytics',
            name: 'Analytics',
            group: 'social',
            icon: 'fab fa-facebook-f',
            url: 'https://analytics.facebook.com/',
            min_width: 900
        },
        {
            id: 'social_ig',
            name: 'Instagram',
            group: 'social',
            icon: 'fab fa-instagram',
            url: 'https://www.instagram.com/',
            min_width: 550
        }, {
            id: 'social_twitter',
            name: 'Twitter',
            group: 'social',
            icon: 'fab fa-twitter',
            url: 'https://mobile.twitter.com/',
            min_width: 450
        }
    ]
})

const getters = {
    availableServices(state){
        return state.availableServices
    }
}
const mutations = {
}
const actions = {
}

export default {
    state,
    getters,
    mutations,
    actions
}