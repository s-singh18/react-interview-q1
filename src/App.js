import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";

import logo from "./logo.svg";
import "./App.css";
import { isNameValid, getLocations } from "./mock-api/apis";

function App() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [locationOptions, setLocationOptions] = useState([]);
  const [entries, setEntries] = useState([]);

  const handleAdd = async () => {
    const success = await isNameValid(name);
    if (success) {
      setEntries([...entries, { name, location }]);
      setName("");
      setLocation("");
    } else {
      alert(`Invalid Name ${name}`);
    }
  };

  const handleClear = () => {
    setEntries([]);
  };

  useEffect(() => {
    const fetchLocations = async () => {
      const locations = await getLocations();
      setLocationOptions(locations);
    };
    fetchLocations();
  }, [locationOptions]);

  return (
    <Container style={{ width: "75%", marginTop: "50px" }}>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formLocation" className="mb-3">
              <Form.Control
                as="select"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">Select a Location</option>
                {locationOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <div className="d-flex mb-3 justify-content-end">
              <Button variant="primary" onClick={handleClear}>
                Clear
              </Button>
              <Button variant="secondary" onClick={handleAdd} className="me-2">
                Add
              </Button>
            </div>
          </Form>
          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.name}</td>
                  <td>{entry.location}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
