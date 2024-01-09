import axios from "axios"

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

  async findAll() {
    if (this.READ?.all) {
      const result = await axios.get(this.READ.all)
    
      if (result) {
        return result.data
      }
    }
    return []
  }

  async findOne(id) {
    if (this.READ?.one && id) {
      const result = await axios.get(this.READ.one + `${id}`)
    
      if (result) {
        return result.data
      }
    }
    return {}

  }

  async update(id = null, value) {
    if (this.UPDATE.url && id && value) {
      const result = await axios.post(this.UPDATE.url + `${id}`, value)

      if (result.status === 200) {
        return result.data
      } else {
        console.log(result.status)
      }
     
    }

    return []
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
    creat: {
      url: 'movieCreate',
    },
    read: {
      all: 'https://api.fullbloommovies.com/movies/deadline',
      one : 'https://api.fullbloommovies.com/movies/'
    },
    update: {
      url: 'usersUpdate',
      data: {
        title: 'string',
        scoring: 'number',
        description: 'string',
        like_count: 'number',
        dislike_count: 'number',
      }
    },
    deleted: 'movieDelete',

  },
  // users: {
  //   creat: 'usersCreate',
  //   read: 'usersRead',
  //   update: {
  //     url: 'usersUpdate',
  //     data: {
  //       movies: {
  //         type: 'string',
  //         relation: 'movies'
  //       },
  //       age: 'number'
  //     }
  //   },
  //   deleted: 'usersDelete',

  // },
  comments: {
    table: {
      type: {
        
      },
      ignore: {
        
      },
      relation: {
        children: ['comment'],
        user: 'user',
        comment_movie: 'movie',
        parent: 'comment'
        
      }
    },
    creat: 'commentsCreate',
    read: {
      all: 'https://api.fullbloommovies.com/comments/all/'
    },
    update: {
      url: 'commentsUpdate/',
      data: {
        like: 'number',
        report: 'number',
        content: 'string',
      }
    },
    deleted: 'commentsDelete',
  }
}
