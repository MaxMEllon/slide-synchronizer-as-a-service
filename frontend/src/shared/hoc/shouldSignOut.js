export default (Component) =>
  class extends Component {
    componentDidMount() {
      if (this.props.jwt !== null) {
        this.props.replace('/dashboard')
        this.props.notify({
          message: 'すでにログインしています',
        })
      }
    }
  }
