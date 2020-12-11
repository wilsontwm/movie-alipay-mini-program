const app = getApp();
Page({
  data: {
    searchInput: '',
    nowPlayingMovies: [],
    popularMovies: [],
    upcomingMovies: []
  },
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
    this.onGetNowPlayingMovies();
    this.onGetPopularMovies();
    this.onGetUpcomingMovies();
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
  async onGetNowPlayingMovies() {
    const resp = await app.fetchAPI('GET', '/movie/now_playing', {});
    const { results } = resp;
    if (results) {
      this.setData({ nowPlayingMovies: [...this.data.nowPlayingMovies, ...results] });
    }
  },
  async onGetPopularMovies() {
    const resp = await app.fetchAPI('GET', '/movie/popular', {});
    const { results } = resp;
    if (results) {
      this.setData({ popularMovies: [...this.data.popularMovies, ...results] });
    }
  },
  async onGetUpcomingMovies() {
    const resp = await app.fetchAPI('GET', '/movie/upcoming', {});
    const { results } = resp;
    if (results) {
      this.setData({ upcomingMovies: [...this.data.upcomingMovies, ...results] });
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
    const search = this.data.searchInput;
    my.navigateTo({
      url: '/pages/search/search?query=' + search
    });
  }
});
