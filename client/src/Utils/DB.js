import { get } from './index'
import Dexie from 'dexie'
class DB {

  static Object = null

  static init () {
    const indexDB = get(window, ['indexedDB', 'webkitIndexedDB', 'mozIndexedDB', 'msIndexedDB', null])
    if (indexDB == null) {
      alert('垃圾浏览器别用这个')
    } else {
      const db = new Dexie("todo")
      db.version(1).stores({ list: "++id,name,age" })
      db.transaction('rw', db.list, async () => {  
        if ((await db.friends.where({ name: 'Josephine' }).count()) === 0) {
          const id = await db.friends.add({ name: "Josephine", age: 21 });
          alert(`Addded friend with id ${id}`);
        }
        const youngFriends = await db.friends.where("age").below(25).toArray();
        alert("My young friends: " + JSON.stringify(youngFriends));

      })
    }
  }

	/**
	 * 清空指定键的storege数据
	 *
	 * @param {*} key_
	 * @memberof DB
	 */
  static clear (...keyList) {
    if (keyList == null || keyList.length === 0) {
      localStorage.clear()
      sessionStorage.clear()
    } else {
      keyList.forEach(key => {
        localStorage.removeItem(key)
        sessionStorage.removeItem(key)
      })
    }
  }
	/**
	 * 清空localStorage对应键
	 *
	 * @static
	 * @param {*} keyList
	 * @memberof DB
	 */
  static clearLocal (...keyList) {
    keyList.forEach(key => {
      localStorage.removeItem(key)
    })
  }
  static clearExclude (...keyList) {
    let excludeList = []
    keyList.forEach(key =>
      excludeList.push({
        key: key,
        body: DB.get(key),
      })
    )
    DB.clear()
    excludeList.forEach(item => DB.set(item.key, item.body))
  }
  static set (key, obj, type = 'local') {
    let storage = JSON.stringify(obj)
    if (type === 'local') {
      localStorage.removeItem(key)
      sessionStorage.removeItem(key)
      localStorage.setItem(key, storage)
      sessionStorage.setItem(key, storage)
    } else {
      sessionStorage.removeItem(key)
      sessionStorage.setItem(key, storage)
    }
  }
  static get (key) {
    let storage = sessionStorage.getItem(key) || localStorage.getItem(key)
    return JSON.parse(storage)
  }
  static print (key) {
    console.log(key, DB.get(key))
  }
}

DB.init()

export default DB 