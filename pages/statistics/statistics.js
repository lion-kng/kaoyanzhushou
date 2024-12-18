import wxCharts from '../../utils/wxcharts.js';

Page({
  data: {
    urgentTodos: [],
    nonUrgentTodos: [],
    completedUrgentTodos: [],
    completedNonUrgentTodos: [],
    days: []
  },

  onLoad: function () {
    this.loadStatistics();
  },

  loadStatistics: function () {
    wx.cloud.callFunction({
      name: 'getStatistics',
      success: res => {
        const statistics = res.result.data;
        this.processStatistics(statistics);
      },
      fail: err => {
        console.error('获取统计数据失败', err);
      }
    });
  },

  processStatistics: function (statistics) {
    if (!Array.isArray(statistics)) {
      console.error('统计数据格式错误:', statistics);
      return;
    }

    const completedUrgentTodos = [];
    const completedNonUrgentTodos = [];
    const days = [];

    statistics.forEach(stat => {
      const date = new Date(stat.date);
      const day = `${date.getMonth() + 1}-${date.getDate()}`;
      days.push(day);
      completedUrgentTodos.push(stat.urgentTodos_num);
      completedNonUrgentTodos.push(stat.nonUrgentTodos_num);
    });

    this.setData({
      completedUrgentTodos: completedUrgentTodos,
      completedNonUrgentTodos: completedNonUrgentTodos,
      days: days
    });

    this.drawChart();
  },

  drawChart: function () {
    new wxCharts({
      canvasId: 'barCanvas',
      type: 'column',
      categories: this.data.days,
      series: [{
        name: '重要且紧急',
        data: this.data.completedUrgentTodos,
        color: '#FF0000'
      }, {
        name: '重要但不紧急',
        data: this.data.completedNonUrgentTodos,
        color: '#00FF00'
      }],
      yAxis: {
        title: '完成任务数量',
        min: 0
      },
      width: 320,
      height: 400
    });
  }
});