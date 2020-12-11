import { MOVIE_IMAGE_LINK } from './../../config';

const app = getApp();
Component({
  mixins: [],
  data: {
    movie: null
  },
  props: {
    movie: null
  },
  methods: {
  },
  onInit() { },
  deriveDataFromProps(nextProps) { },
  didMount() {
    let movie = this.props.movie;
    if (movie) {
      movie.image = MOVIE_IMAGE_LINK + movie.poster_path;
      this.setData({ movie: movie });
    }
  },
  didUpdate() { },
  didUnmount() { },
})