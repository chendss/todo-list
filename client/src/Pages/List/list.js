import { GET } from '@utils/request'
import ListHeader from '@/Components/ListHeader'
import ListSideBar from '@/Components/ListSideBar'
import ListContent from '@/Components/ListContent'
import { EventEmitter } from 'events'

GET('/icons')

export default {
	data() {
		return {
			EventEmitter: new EventEmitter(),
			title: '',
		}
	},
	components: { ListHeader, ListSideBar, ListContent },
}
