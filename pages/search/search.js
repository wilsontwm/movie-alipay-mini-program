const app = getApp();
Page({
  data: {
    searchInput: '',
    movies: []
  },
  onLoad(query) {
    // 页面加载
    if (query.query) {
      this.setData({ searchInput: query.query });
    }
    this.onSearch();
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'Movie',
      desc: 'Movie mini program',
      path: 'pages/index/index',
    };
  },
  async onSearch() {
    const input = encodeURI(this.data.searchInput);
    const url = '/search/movie?query=' + input;
    const resp = await app.fetchAPI('GET', url, {});
    const { results } = resp;
    if (results) {
      this.setData({ movies: [...this.data.movies, ...results] });
    }
  },
  handleInput(value) {
    this.setData({
      searchInput: value,
    });
  },
  handleClear() {
    this.setData({
      searchInput: '',
    });
  },
  handleSubmit() {
    this.setData({ movies: [] });
    this.onSearch();
  }
});
