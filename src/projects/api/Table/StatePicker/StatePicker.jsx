import React, { useState, useEffect } from "react";
//import {NativeSelect, FormControl, capitalize} from '@material-ui/core'
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  FormCheck,
  Container,
  InputGroup,
  Alert,
} from "@themesberg/react-bootstrap";

import { fetchState } from "../../api";
import Data from "./states.json";
export const StatePicker = ({ handleStateChange }) => {
  const [getState, setfetchState] = useState([]);
  const [state, setState] = useState([]);
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
      <Form.Group  className="mb-4 ">
        <Form.Label className='text-xl'>State</Form.Label>
        <Form.Select
          defaultValue=""
          onChange={(e) => handleStateChange(e.target.value)}
          className="neuromorphic-border w-100 neuromorphic-select"
        >
          <option value="" >All</option>
          {state.map((data) => (
            <option key={data.code} value={data.name}>
              {data.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      </Container>
    </>
  );
};
