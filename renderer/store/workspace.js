const state = () => ({
    workspaces: [{
        id: 'samplegeneratedid_1',
        name: 'Go2Have Store',
        services: [{
            id: 'samplewp1serviceid_1',
            app_id: 'social_fb_web',
            width: 400
        },
        {
            id: 'samplewp1serviceid_2',
            app_id: 'social_fb_chat',
            width: 400
        }, {
            id: 'samplewp1serviceid_3',
            app_id: 'social_ig',
            width: 400
        }, {
            id: 'samplewp1serviceid_4',
            app_id: 'social_twitter',
            width: 400
        }]
    },
    {
        id: 'samplegeneratedid_2',
        name: 'Chill',
        services: [{
                id: 'samplewp2serviceid_1',
                app_id: 'social_fb_web'
            },
            {
                id: 'samplewp2serviceid_2',
                app_id: 'social_fb_chat'
            }
        ]
    }],
    activeWorkspaceIndex: 0
})

const getters = {
    workspaces(state) {
        return state.workspaces
    },
    currentWorkingWorkspace(state){
        return state.workspaces[state.activeWorkspaceIndex]
    }
}
const mutations = {
    ACTIVE_WORKSPACE(state, workspace){
        state.activeWorkspaceIndex = workspace
    },
    ADD_WORKSPACE(state, workspace){
        state.workspaces.push(workspace)
    }
}
const actions = {
    changeWorkspaceTo(context, workspace){
        let workspaceIndex = _.findIndex(context.getters.workspaces, (wp) => wp.id == workspace.id)
        context.commit('ACTIVE_WORKSPACE', workspaceIndex)
        return workspace
    },
    createNewWorkspace(context, workspace) {
        context.commit('ADD_WORKSPACE', workspace)
        context.commit('ACTIVE_WORKSPACE', (context.getters.workspaces.length - 1))
        return context.getters.workspaces
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}