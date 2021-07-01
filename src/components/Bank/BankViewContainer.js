import React from "react";
import BankView from "./BankView";
import Service from "../../Services/Service";

class BankViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let ifsc = this.props.match.params.ifsc;
    Service.getBank(ifsc)
      .then((bank) => {
        this.setState({ bank});
      })
      .catch((e) => {
        this.setState({ message: e.messag});
      });
  }

  render() {
    let { bank, message } = this.state;

    return <BankView bank={bank} message={message} />;
  }
}

export default BankViewContainer;
