Page({
  data: {
    input: '',
    taskPlaceholder: '请输入任务',
    todoTypes: ['重要且紧急', '重要但不紧急'],
    todoTypeIndex: 0,
    urgentTodos: [],
    nonUrgentTodos: [],
    leftCount: 0,
    deleteMode: false,
    selectedTodelite: {
      urgent: [],
      nonUrgent: []
    },
    toastHidden: true // 添加 toastHidden 属性
  },

  onLoad: function () {
    this.load();
  },

  onShow: function() {
    wx.setNavigationBarTitle({
      title: '待办清单'
    });
  },

  inputChangeHandle: function (e) {
    this.setData({ input: e.detail.value });
  },

  typeChangeHandle: function (e) {
    this.setData({ todoTypeIndex: e.detail.value });
    // console.log('任务类型:', this.data.todoTypes[this.data.todoTypeIndex]);
  },

  addTodoHandle: function (e) {
    if (!this.data.input || !this.data.input.trim()) return;

    const newTodo = {
      text: this.data.input,
      completed: false,
      type: this.data.todoTypes[this.data.todoTypeIndex]
    };
    console.log('任务类型:', newTodo.type);
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
    console.log('添加任务后 urgentTodos:', this.data.urgentTodos); // 打印 urgentTodos
    console.log('添加任务后 nonUrgentTodos:', this.data.nonUrgentTodos); // 打印 nonUrgentTodos
  },

  toggleTodoHandle: function (e) {
    if (this.data.deleteMode) return; // 如果在删除模式下，不执行切换完成状态的操作

    const idx = e.currentTarget.dataset.index;
    const type = e.currentTarget.dataset.type;

    if (type === 'urgent') {
      this.data.urgentTodos[idx].completed = !this.data.urgentTodos[idx].completed;
      this.data.urgentTodos[idx].completedDate = this.data.urgentTodos[idx].completed ? new Date() : null;
    } else {
      this.data.nonUrgentTodos[idx].completed = !this.data.nonUrgentTodos[idx].completed;
      this.data.nonUrgentTodos[idx].completedDate = this.data.nonUrgentTodos[idx].completed ? new Date() : null;
    }

    this.setData({
      urgentTodos: this.data.urgentTodos,
      nonUrgentTodos: this.data.nonUrgentTodos,
      leftCount: this.getLeftCount()
    });

    // 更新数据库
    wx.cloud.callFunction({
      name: 'updateStatistics',
      data: {
        date: new Date().toDateString(),
        type: type,
        increment: this.data[type === 'urgent' ? 'urgentTodos' : 'nonUrgentTodos'][idx].completed ? 1 : -1
      },
      success: res => {
        console.log('更新统计数据成功', res);
      },
      fail: err => {
        console.error('更新统计数据失败', err);
      }
    });
    
    
  },

  toggleDeleteMode: function () {
    this.setData({
      deleteMode: !this.data.deleteMode,
      selectedTodelite: {
        urgent: [],
        nonUrgent: []
      }
    });
  },

  selectTodoHandle: function (e) {
    const idx = parseInt(e.currentTarget.dataset.index);
    const type = e.currentTarget.dataset.type;
    const selectedTodelite = this.data.selectedTodelite;

    if (type === 'urgent') {
      if (e.detail.value.length > 0) {
        selectedTodelite.urgent.push(idx);
        console.log('选中任务:', this.data.urgentTodos[idx]);
      } else {
        const index = selectedTodelite.urgent.indexOf(idx);
        if (index > -1) {
          selectedTodelite.urgent.splice(index, 1);
        }
      }
    } else {
      if (e.detail.value.length > 0) {
        selectedTodelite.nonUrgent.push(idx);
        console.log('选中任务:', this.data.nonUrgentTodos[idx]);
      } else {
        const index = selectedTodelite.nonUrgent.indexOf(idx);
        if (index > -1) {
          selectedTodelite.nonUrgent.splice(index, 1);
        }
      }
    }

    this.setData({
      selectedTodelite: selectedTodelite
    });
  },

  removeTodoHandle: function (e) {
    const idx = e.currentTarget.dataset.index;
    const type = e.currentTarget.dataset.type;
    const todo = type === 'urgent' ? this.data.urgentTodos[idx] : this.data.nonUrgentTodos[idx];
    const that = this;
    wx.showModal({
      title: '确认删除',
      content: '您确定要删除这个待办事项吗？',
      success(res) {
        if (res.confirm) {
          // 用户点击了确定按钮
          // 如果任务已完成，更新数据库
          if (todo.completed) {
            wx.cloud.callFunction({
              name: 'updateStatistics',
              data: {
                date: new Date().toDateString(),
                type: type,
                increment: -1
              },
              success: res => {
                console.log('更新统计数据成功', res);
              },
              fail: err => {
                console.error('更新统计数据失败', err);
              }
            });
          }

          if (type === 'urgent') {
            that.data.urgentTodos.splice(idx, 1);
          } else {
            that.data.nonUrgentTodos.splice(idx, 1);
          }
          that.setData({
            urgentTodos: that.data.urgentTodos,
            nonUrgentTodos: that.data.nonUrgentTodos,
            leftCount: that.getLeftCount(),
            toastHidden: false // 显示 toast
          });
      
          that.saveTodos();
          console.log('删除任务后 urgentTodos:', that.data.urgentTodos); // 打印 urgentTodos
          console.log('删除任务后 nonUrgentTodos:', that.data.nonUrgentTodos); // 打印 nonUrgentTodos
      
          // 隐藏 toast
          setTimeout(() => {
            that.setData({ toastHidden: true });
          }, 2000);

        } else if (res.cancel) {
          // 用户点击了取消按钮
          console.log('用户点击取消');
        }
      }
    });

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
    console.log('加载任务 urgentTodos:', this.data.urgentTodos); // 打印 urgentTodos
    console.log('加载任务 nonUrgentTodos:', this.data.nonUrgentTodos); // 打印 nonUrgentTodos
  },

  navigateToStatistics: function () {
    wx.navigateTo({
      url: '/pages/todos/statistics/statistics'
    });
  },

  hideToast: function () {
    this.setData({ toastHidden: true });
  }
  
});
