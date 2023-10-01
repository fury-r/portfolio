import React from "react";

import { Cards, StatePicker } from "./Table";
import { fetchData } from "./api";

class Api extends React.Component {
  state = {
    data: {},
    state: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();

    this.setState({ data: fetchedData });
  }

  handleStateChange = async (state) => {
    const fetchedData = await fetchData(state);
    this.setState({ data: fetchedData, state: state });
  };

  render() {
    const { data, state } = this.state;

    return (
      <div>
        <StatePicker handleStateChange={this.handleStateChange} />
        <Cards data={data} />
      </div>
    );
  }
}

export default Api;
