Page({
  data: {
    input: '',
    todoTypes: ['重要且紧急', '重要但不紧急'],
    todoTypeIndex: 0,
    urgentTodos: [],
    nonUrgentTodos: [],
    leftCount: 0
  },

  onLoad: function () {
    this.load()
  },

  onShow: function() {
    wx.setNavigationBarTitle({
      title: '待办清单'
    })
  },

  inputChangeHandle: function (e) {
    this.setData({ input: e.detail.value });
  },

  typeChangeHandle: function (e) {
    this.setData({ todoTypeIndex: e.detail.value });
  },

  addTodoHandle: function (e) {
    if (!this.data.input || !this.data.input.trim()) return;

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
    const idx = e.currentTarget.dataset.index;
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

  getLeftCount: function () {
    return this.data.urgentTodos.filter(todo => !todo.completed).length + this.data.nonUrgentTodos.filter(todo => !todo.completed).length;
  },

  saveTodos: function () {
    wx.setStorageSync('urgentTodos', this.data.urgentTodos);
    wx.setStorageSync('nonUrgentTodos', this.data.nonUrgentTodos);
  },

  load: function () {
    this.setData({
      urgentTodos: wx.getStorageSync('urgentTodos') || [],
      nonUrgentTodos: wx.getStorageSync('nonUrgentTodos') || [],
      leftCount: this.getLeftCount()
    });
  }
});