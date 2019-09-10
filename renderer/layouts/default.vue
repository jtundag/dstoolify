<template>
	<div id="app" class="h-screen text-content">
		<div class="flex h-full overflow-hidden">
			<div class="sidebar-tabs w-16 h-full bg-primary p-2">
				<div class="flex flex-col items-center content-between h-full justify-between">
					<div class="services flex-col">
						<div class="relative">
							<div class="menu-btn text-white text-center cursor-pointer flex text-lg bg-primary-lighter text-primary-lightest w-12 h-12 justify-center items-center rounded-lg mb-2 relative" title="Create Workspace" v-tippy="{ arrow: true, placement: 'right' }">
								<i class="fas fa-plus text-sm"></i>
							</div>
							<div class="create-wp-form" v-if="isCreating">
								<form action="#" @submit.prevent="createWorkspace">
									<input type="text" 
										name="wpName" 
										id="wp-name" 
										placeholder="Workspace Name" 
										v-model="workspaceForm.name">
									<button id="create-submit" 
										class="text-primary-lightest">
										<i class="fas fa-check"></i>
									</button>
									<button type="button" id="create-cancel" 
										class="text-primary-lightest"
										@click="closeCreateWorkspaceForm">
										<i class="fas fa-times"></i>
									</button>
								</form>
								<div class="text-red-600 text-xs px-3" v-if="isEmptyWorskpaceName">
									Name is required.
								</div>
							</div>
						</div>
						<div class="relative"
							v-for="workspace in workspaces"
							:key="workspace.id">
							<div class="menu-btn text-white text-center cursor-pointer flex text-lg bg-primary-lighter text-primary-lightest w-12 justify-center items-center rounded-lg mb-2"
								@click="changeWorkspaceTo(workspace)">
								<div class="flex flex-col w-full h-full p-1 text-sm" 
									:title="workspace.name" 
									v-tippy="{ arrow: true, placement: 'right' }">
									<div class="flex justify-between w-full"
										v-for="(serviceRow, index) in chunkServicesOf(workspace)"
										:key="index">
										<div class="app-icon m-auto" 
											v-for="service in serviceRow"
											:key="service.id">
											<i :class="getIconOf(service)"></i>
										</div>
									</div>
									<div class="flex justify-between w-full"
										v-if="!workspace.services.length">
										<div class="app-icon m-auto">
											<i class="fas fa-plus"></i>
										</div>
									</div>
								</div>
							</div>
							<!-- Dropdown -->
						</div>
					</div>
					<div class="actions">
						<div class="menu-btn text-white text-center cursor-pointer flex text-lg bg-primary-lighter text-primary-lightest w-12 h-12 justify-center items-center rounded-lg" title="Settings" v-tippy="{ arrow: true, placement: 'right' }">
							<i class="fas fa-cog text-sm"></i>
						</div>
					</div>
				</div>
			</div>
			<vue-tailwind-modal ref="availableServicesModal">
				Sample
			</vue-tailwind-modal>
			<div class="placeholder flex-grow h-full w-full bg-primary-dark pr-16">
				<Nuxt/>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { serviceInfoExtractor, utils } from '~/helpers'

export default {
	name: 'ds-toolify',
	components: {
		VueTailwindModal: () => import('~/components/vue-tailwind-modal')
	},
    head(){
        return {
            title: 'DS Toolify'
        }
	},
	data(){
		return {
			isCreating: false,
			workspaceForm: {
				id: null,
				name: null,
				services: []
			},
			isEmptyWorskpaceName: false
		}
	},
	computed: {
		...mapGetters({
			workspaces: 'workspace/workspaces',
			availableServices: 'services/availableServices',
			currentWorkingWorkspace: 'workspace/currentWorkingWorkspace'
		})
	},
	methods: {
		chunkServicesOf(workspace){
			return _.chunk(workspace.services, 2)
		},
		getIconOf(service){
			return serviceInfoExtractor.getIconFrom(this.availableServices, service)
		},
		changeWorkspaceTo(workspace){
			this.$store.dispatch('workspace/changeWorkspaceTo', workspace)
		},
		goToService(workspace, service){

		},
		closeCreateWorkspaceForm(){
			this.isCreating = false
			this.isEmptyWorskpaceName = false
		},
		async createWorkspace(){
			this.isEmptyWorskpaceName = false
			if(!this.workspaceForm.name){
				this.isEmptyWorskpaceName = true
				return false
			}
			this.workspaceForm.id = utils.generateId()
			await this.$store.dispatch('workspace/createNewWorkspace', this.workspaceForm)
			this.workspaceForm = {
				id: null,
				name: null,
				services: []
			}
			this.isCreating = false
		}
	}
}
</script>

<style lang="scss">
	@import '~/assets/fontawesome/css/all.css';
	@import '~/resources/scss/main.scss';
</style>
