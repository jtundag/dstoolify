<template>
	<div class="h-full flex overflow-x-auto">
		<div class="cover fixed w-full h-full top-0 left-0 bg-transparent z-10" v-show="isCovered"></div>
		<draggable v-model="tmpCurrentWorkspace.services" @start="drag=true" @end="drag=false" handle=".move">
			<transition-group class="flex h-full">
				<vue-resizable v-for="service in tmpCurrentWorkspace.services" :key="service.id" class="window overflow-hidden relative mr-1" :style="{ height: '100%' }" 
					:min-width="getMinWidthOf(service)"
					:width="service.width"
					@resize:start="cover"
					@resize:end="(l, t, w) => resized(service, w)">
					<div class="top flex justify-between p-2 border-b border-grey-lightest px-4 bg-white">
						<div class="move text-content cursor-pointer" title="Move" v-tippy="{arrows: true}">
							<i class="fas fa-arrows-alt-h"></i>
						</div>
						<div class="service-name">
							{{ getNameOf(service) }}
						</div>
						<div class="options text-content cursor-pointer">
							<i class="fas fa-ellipsis-h"></i>
						</div>
					</div>
					<div class="h-full bg-white webcontent">
						<webview :id="`${service.id}`" 
							:key="`${service.id}`"
							:ref="`${service.id}`"
							preload="file://./webview/preload.js"
							:src="getURLOf(service)" 
							:partition="`persist:${service.id}`"
							class="h-full"></webview>
					</div>
				</vue-resizable>
			</transition-group>
		</draggable>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { serviceInfoExtractor } from '~/helpers'
const { remote } = require('electron')

export default {
	components: {
		draggable: () => import('vuedraggable'),
		VueResizable: () => import('vue-resizable')
	},
	created(){
		this.tmpCurrentWorkspace = JSON.parse(JSON.stringify(this.currentWorkingWorkspace))
	},
	data(){
		return {
			drag: false,
			isCovered: false,
			tmpCurrentWorkspace: null
		}
	},
	computed: {
		...mapGetters({
			availableServices: 'services/availableServices',
			currentWorkingWorkspace: 'workspace/currentWorkingWorkspace'
		})
	},
	methods: {
		cover(){
			this.isCovered = true
		},
		resized(item, w){
			this.isCovered = false
		},
		getNameOf(service){
			return serviceInfoExtractor.getNameFrom(this.availableServices, service)
		},
		getURLOf(service){
			return serviceInfoExtractor.getURLFrom(this.availableServices, service)
		},
		getMinWidthOf(service){
			return serviceInfoExtractor.getMinWidthFrom(this.availableServices, service)
		}
	},
	watch: {
		currentWorkingWorkspace: {
			handler(to){
				this.tmpCurrentWorkspace = JSON.parse(JSON.stringify(to))
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	.webcontent{
		height: calc(100% - 41px);
	}
</style>
