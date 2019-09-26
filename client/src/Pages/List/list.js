import ListHeader from '@/Components/ListHeader'
import ListSideBar from '@/Components/ListSideBar'
import ListContent from '@/Components/ListContent'
import { EventEmitter } from 'events'

export default {
  data () {
    return {
      EventEmitter: new EventEmitter(), title: ''
    }
  },
  components: { ListHeader, ListSideBar, ListContent },
}
