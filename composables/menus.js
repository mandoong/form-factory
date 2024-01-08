import { movieData } from "./pageData"

class pageData {
  constructor({ table, creat, read, update, deleted }) {
    this.table = table
    this.CREATE = creat
    this.READ = read
    this.UPDATE = update
    this.DELETE = deleted
  }
  create() {
    return movieData
  }
  find() {
    return movieData
  }
  update(id = null) {
    const { url, data } = this.UPDATE
    if (data && Array.isArray(data)) {
      data.forEach(e => {
        return
      })
    }
    
    return
  }
  delete() {

    console.log('deleted')
    return this.DELETE
  }
}

export const usePageData = (page) => computed(() => {
  switch (page) {
    case 'movies':
      return new pageData({
        table: {
          id: 'number',
          name: 'string',
          rage: 'number',
          updated: 'number',
        },
        creat: {
          url: 'movieCreate',
        },
        read : 'movieRead',
        update: {
          url: 'usersUpdate',
          data: {
            user: {
              type: 'string',
              relation: 'users'
            },
            like: 'number'
          }
        },
        deleted : 'movieDelete',
      })
    case 'users': 
      return new pageData({
        creat : 'usersCreate',
        read : 'usersRead',
        update: {
          url: 'usersUpdate',
          data: {
            movies: {
              type: 'string',
              relation: 'movies'
            },
            age: 'number'
          }
        },
        deleted : 'usersDelete',
      })
    case 'comments': 
      return new pageData({
        creat : 'commentsCreate',
        read : 'commentsRead',
        update : 'commentsUpdate',
        deleted : 'commentsDelete',
      })
    
    default:
      return
  }
})