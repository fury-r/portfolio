import React, { useState, useEffect } from "react";
//import {NativeSelect, FormControl, capitalize} from '@material-ui/core'
import { Form, Container } from "react-bootstrap";

import Data from "./states.json";
export const StatePicker = ({
  handleStateChange,
}: {
  handleStateChange: (value: string) => void;
}) => {
  const [state, setState] = useState<
    {
      code: string;
      name: string;
    }[]
  >([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setState(Data.data);
    };

    fetchAPI();
  }, []);

  return (
    <>
      <Container fluid className="mt-3">
        <h2 className="text-light">Covid Tracker</h2>
        <Form.Group className="mb-4 ">
          <Form.Label className="text-xl">State</Form.Label>
          <Form.Select
            defaultValue=""
            onChange={(e) => handleStateChange(e.target.value)}
            className="neuromorphic-border w-100 neuromorphic-select"
          >
            <option value="">All</option>
            {state.map((data) => (
              <option key={data?.code} value={data?.name}>
                {data?.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Container>
    </>
  );
};
