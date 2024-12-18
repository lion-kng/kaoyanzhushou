Page({
  data: {
    input: '',
    todos: [],
    urgentTodos: [],
    nonUrgentTodos: [],
    leftCount: 0,
    allCompleted: false,
    logs: [],
    toastHidden: true,
    todoTypes: ['重要且紧急', '重要但不紧急'],
    todoTypeIndex: 0,
  },
  onShow: function() {
    wx.setNavigationBarTitle({
      title: '待办清单'
    })

  },

  save: function () {
    wx.setStorageSync('todo_list', this.data.todos)
    wx.setStorageSync('todo_logs', this.data.logs)
    wx.setStorageSync('urgentTodos', this.data.urgentTodos);
    wx.setStorageSync('nonUrgentTodos', this.data.nonUrgentTodos);
  },

  load: function () {
    var todos = wx.getStorageSync('todo_list')
    if (todos) {
      var leftCount = todos.filter(function (item) {
        return !item.completed
      }).length
      this.setData({ todos: todos, leftCount: leftCount })
    }
    var logs = wx.getStorageSync('todo_logs')
    if (logs) {
      this.setData({ logs: logs })
    }
    this.setData({
      urgentTodos: wx.getStorageSync('urgentTodos') || [],
      nonUrgentTodos: wx.getStorageSync('nonUrgentTodos') || [],
      leftCount: this.getLeftCount()
    });
  },

  onLoad: function () {
    this.load()
  },

  inputChangeHandle: function (e) {
    this.setData({ input: e.detail.value })
  },

  typeChangeHandle: function (e) {
    this.setData({ todoTypeIndex: e.detail.value });
  },

  addTodoHandle: function (e) {
    if (!this.data.input || !this.data.input.trim()) return
    var todos = this.data.todos
    todos.push({ name: this.data.input, completed: false })
    var logs = this.data.logs
    logs.push({ timestamp: new Date(), action: 'Add', name: this.data.input })
    this.setData({
      input: '',
      todos: todos,
      leftCount: this.data.leftCount + 1,
      logs: logs
    })
    this.save()

    const newTodo = {
      text: this.data.input,
      completed: false,
      type: this.data.todoTypes[this.data.todoTypeIndex]
    };

    if (newTodo.type === '重要且紧急') {
      this.data.urgentTodos.push(newTodo);
    } else {
      this.data.nonUrgentTodos.push(newTodo);
    }

    this.setData({
      input: '',
      urgentTodos: this.data.urgentTodos,
      nonUrgentTodos: this.data.nonUrgentTodos,
      leftCount: this.getLeftCount()
    });

    this.saveTodos();
  },

  toggleTodoHandle: function (e) {
    var idx = e.currentTarget.dataset.index
    var todos = this.data.todos
    todos[idx].completed = !todos[idx].completed
    var logs = this.data.logs
    logs.push({
      timestamp: new Date(),
      action: todos[idx].completed ? 'Finish' : 'Restart',
      name: todos[idx].name
    })
    this.setData({
      todos: todos,
      leftCount: this.data.leftCount + (todos[idx].completed ? -1 : 1),
      logs: logs
    })
    this.save()

    const index = e.currentTarget.dataset.index;
    const type = e.currentTarget.dataset.type;

    if (type === 'urgent') {
      this.data.urgentTodos[idx].completed = !this.data.urgentTodos[idx].completed;
    } else {
      this.data.nonUrgentTodos[idx].completed = !this.data.nonUrgentTodos[idx].completed;
    }

    this.setData({
      urgentTodos: this.data.urgentTodos,
      nonUrgentTodos: this.data.nonUrgentTodos,
      leftCount: this.getLeftCount()
    });

    this.saveTodos();
  },

  removeTodoHandle: function (e) {
    var idx = e.currentTarget.dataset.index
    var todos = this.data.todos
    var remove = todos.splice(idx, 1)[0]
    var logs = this.data.logs
    logs.push({ timestamp: new Date(), action: 'Remove', name: remove.name })
    this.setData({
      todos: todos,
      leftCount: this.data.leftCount - (remove.completed ? 0 : 1),
      logs: logs
    })
    this.save()
  },

  toggleAllHandle: function (e) {
    this.data.allCompleted = !this.data.allCompleted
    var todos = this.data.todos
    for (var i = todos.length - 1; i >= 0; i--) {
      todos[i].completed = this.data.allCompleted
    }
    var logs = this.data.logs
    logs.push({
      timestamp: new Date(),
      action: this.data.allCompleted ? 'Finish' : 'Restart',
      name: 'All todos'
    })
    this.setData({
      todos: todos,
      leftCount: this.data.allCompleted ? 0 : todos.length,
      logs: logs
    })
    this.save()
    wx.vibrateShort()

    const allCompleted = this.data.leftCount === 0;
    const newUrgentTodos = this.data.urgentTodos.map(todo => {
      todo.completed = !allCompleted;
      return todo;
    });
    const newNonUrgentTodos = this.data.nonUrgentTodos.map(todo => {
      todo.completed = !allCompleted;
      return todo;
    });

    this.setData({
      urgentTodos: newUrgentTodos,
      nonUrgentTodos: newNonUrgentTodos,
      leftCount: this.getLeftCount()
    });

    this.saveTodos();
  },
  
  clearCompletedHandle: function (e) {
    var todos = this.data.todos
    var remains = []
    for (var i = 0; i < todos.length; i++) {
      todos[i].completed || remains.push(todos[i])
    }
    var logs = this.data.logs
    logs.push({
      timestamp: new Date(),
      action: 'Clear',
      name: 'Completed todo'
    })
    this.setData({ todos: remains, logs: logs })
    this.save()
    this.setData({
      toastHidden: false
    })
  wx.vibrateShort()

    const newUrgentTodos = this.data.urgentTodos.filter(todo => !todo.completed);
    const newNonUrgentTodos = this.data.nonUrgentTodos.filter(todo => !todo.completed);

    this.setData({
      urgentTodos: newUrgentTodos,
      nonUrgentTodos: newNonUrgentTodos,
      leftCount: this.getLeftCount()
    });

    this.saveTodos();
  },
  hideToast: function() {
    this.setData({
      toastHidden: true
    })
  },
  onShareAppMessage: function (res) {

    if (res.from ==='button') {
      // 来自页面内转发按钮
      console.log(res.target)
      return {
        title:'管理时间，保持专注！让自律成为习惯！',
         path: '/pages/index/index',
        imageUrl:'/image/share.jpg' //不设置则默认为当前页面的截图
      }
    }
  },
  onShareTimeline: function (res){
    return{  
      title: '管理时间，保持专注，让自律成为习惯！',
      query: {   
        // key: 'value' //要携带的参数 
      },  
      imageUrl: '/image/about.png'   
    }    
  },
  getLeftCount: function () {
    return this.data.urgentTodos.filter(todo => !todo.completed).length + this.data.nonUrgentTodos.filter(todo => !todo.completed).length;
  },

  saveTodos: function () {
    wx.setStorageSync('urgentTodos', this.data.urgentTodos);
    wx.setStorageSync('nonUrgentTodos', this.data.nonUrgentTodos);
  }
   
})
