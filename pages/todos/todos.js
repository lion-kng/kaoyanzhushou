Page({
  data: {
    input: '',
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

    this.saveTodos();
    console.log('切换任务状态后 urgentTodos:', this.data.urgentTodos); // 打印 urgentTodos
    console.log('切换任务状态后 nonUrgentTodos:', this.data.nonUrgentTodos); // 打印 nonUrgentTodos

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
      this.data.urgentTodos.splice(idx, 1);
    } else {
      this.data.nonUrgentTodos.splice(idx, 1);
    }

    this.setData({
      urgentTodos: this.data.urgentTodos,
      nonUrgentTodos: this.data.nonUrgentTodos,
      leftCount: this.getLeftCount(),
      toastHidden: false // 显示 toast
    });

    this.saveTodos();
    console.log('删除任务后 urgentTodos:', this.data.urgentTodos); // 打印 urgentTodos
    console.log('删除任务后 nonUrgentTodos:', this.data.nonUrgentTodos); // 打印 nonUrgentTodos

    // 隐藏 toast
    setTimeout(() => {
      this.setData({ toastHidden: true });
    }, 2000);
  },

  confirmDeleteHandle: function () {
    const selectedTodelite = this.data.selectedTodelite;

    console.log('删除任务:', {
      urgent: selectedTodelite.urgent.map(idx => this.data.urgentTodos[idx]),
      nonUrgent: selectedTodelite.nonUrgent.map(idx => this.data.nonUrgentTodos[idx])
    });

    selectedTodelite.urgent.forEach(idx => {
      if (this.data.urgentTodos[idx].completed) {
        wx.cloud.callFunction({
          name: 'updateStatistics',
          data: {
            date: new Date().toDateString(),
            type: 'urgent',
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
    });

    selectedTodelite.nonUrgent.forEach(idx => {
      if (this.data.nonUrgentTodos[idx].completed) {
        wx.cloud.callFunction({
          name: 'updateStatistics',
          data: {
            date: new Date().toDateString(),
            type: 'non-urgent',
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
    });

    this.setData({
      urgentTodos: this.data.urgentTodos.filter((_, index) => !selectedTodelite.urgent.includes(index)),
      nonUrgentTodos: this.data.nonUrgentTodos.filter((_, index) => !selectedTodelite.nonUrgent.includes(index)),
      deleteMode: false,
      selectedTodelite: {
        urgent: [],
        nonUrgent: []
      },
      leftCount: this.getLeftCount(),
      toastHidden: false // 显示 toast
    });

    this.saveTodos();
    console.log('确认删除后 urgentTodos:', this.data.urgentTodos); // 打印 urgentTodos
    console.log('确认删除后 nonUrgentTodos:', this.data.nonUrgentTodos); // 打印 nonUrgentTodos

    // 隐藏 toast
    setTimeout(() => {
      this.setData({ toastHidden: true });
    }, 2000);
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
      url: '/pages/statistics/statistics'
    });
  },

  hideToast: function () {
    this.setData({ toastHidden: true });
  }
});
