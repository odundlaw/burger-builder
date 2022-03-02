import React from "react";
import Modal from "../../components/UI/Modal/Modal";
import Wrapper from "../Wrapper/Wrapper";

const WithError = (Component, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });

      this.resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (err) => {
          this.setState({ error: err });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    backDropClickHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Wrapper>
          <Modal
            show={this.state.error}
            clickBackdrop={this.backDropClickHandler}
          >
            {this.state.error?.message}
          </Modal>
          <Component {...this.props} />
        </Wrapper>
      );
    }
  };
};

export default WithError;
