import React from "react";

import { Cards, StatePicker } from "./Table";
import { fetchData } from "./api";

class Api extends React.Component {
  state: {
    data: {
      activeCases: any;
      recovered: any;
      deceased: any;
      lastUpdatedAtApify: any;
    };
    state: string;
  } = {
    data: {
      activeCases: "",
      recovered: "",
      deceased: "",
      lastUpdatedAtApify: "",
    },
    state: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData(this.state.state);

    this.setState({ data: fetchedData });
  }

  handleStateChange = async (state: string) => {
    const fetchedData = await fetchData(state);
    this.setState({ data: fetchedData, state: state });
  };

  render() {
    const { data } = this.state;

    return (
      <div>
        <StatePicker handleStateChange={this.handleStateChange} />
        <Cards data={data} />
      </div>
    );
  }
}

export default Api;
