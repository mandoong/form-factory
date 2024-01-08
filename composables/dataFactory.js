import { commentData, movieData } from "./pageData"

class pageData {
  constructor({ table, creat, read, update, deleted }) {
    this.table = table
    this.CREATE = creat
    this.READ = read
    this.UPDATE = update
    this.DELETE = deleted
  }
  create() {
    return
  }

  findAll() {
    return  this.READ
  }

  findOne(id) {
    return movieData.find(e => e.id === id) || {}

  }

  update(id = null) {
    const { url, data } = this.UPDATE
    // if (data && Array.isArray(data)) {
    //   data.forEach(e => {
    //     return
    //   })
    // }
    return
  }
  delete() {

    console.log('deleted')
    return this.DELETE
  }
}


export const usePageMenus = () => {
  console.log(pageDatas)
  return pageDatas
}

export const usePageData = (page) => computed(() => {
  const datas = pageDatas[page]

  return new pageData({...datas})
})

const pageDatas = {
  movies: {
    table: {
      children: ['comment'],
      user: 'user',
      comment_movie: 'movie',
      parent: 'comment'
    },
    creat: {
      url: 'movieCreate',
    },
    read: movieData,
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
    deleted: 'movieDelete',

  },
  users: {
    creat: 'usersCreate',
    read: 'usersRead',
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
    deleted: 'usersDelete',

  },
  comments: {
    creat: 'commentsCreate',
    read: commentData,
    update: 'commentsUpdate',
    deleted: 'commentsDelete',
  }
}
