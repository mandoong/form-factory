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
  update() {
    
    usePageData('users')
    return this.UPDATE
  }
  delete() {
    return this.DELETE
  }
}

export const usePageData = (page) => computed(() => {
  switch (page) {
    case 'movies': 
      return new pageData({
        creat: {
          url: 'movieCreate',
          data: {
            id: 'Number', 
            name: "String"
          }
        },
        read : 'movieRead',
        update : 'movieUpdate',
        deleted : 'movieDelete',
      })
    case 'users': 
      return new pageData({
        creat : 'usersCreate',
        read : 'usersRead',
        update: {
          url: 'usersUpdate',
          data: {
            users: {
              type: 'string',
              relation: 'users'
            }
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