import "./App.css";
import { useState, useEffect } from "react";
import axios from 'axios';

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [patient, setPatient] = useState(null); // Changed initial state to null for patient

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000/ws');

    socket.onopen = () => {
        console.log('WebSocket connection established.');
    };

    socket.onmessage = (event) => {
        console.log('Message received from server:', event.data);
        // Update state or handle message as needed
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
        console.log('WebSocket connection closed.');
    };

    return () => {
        if (socket.readyState === WebSocket.OPEN) {
            socket.close();
        }
    };
}, []);


  const onSubmitSave = async (e) => {
    e.preventDefault();

    const requestBody = {
      firstName,
      lastName,
      email
    };

    try {
      const response = await axios.post('http://localhost:8080/newPatient', requestBody, {
        headers: {
          'Content-Type': "application/json"
        }
      });

      console.log("response=", response);
    } catch (error) {
      console.error('Failed to save patient:', error.message);
    }
  };

  const onGetPatient = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/byEmail?email=${searchEmail}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setPatient(response.data); // Assuming response.data contains patient object
    } catch (error) {
      console.error('Failed to get patient:', error.message);
    }
  };

  return (
    <div className="App">
      <form onSubmit={onSubmitSave}>
        <h1 className="text-primary">Login</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="email"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="btn btn-outline-success" type="submit">
          Save
        </button>
      </form>

      <div>
        <input
          type="text"
          className="form-control"
          placeholder="enter user email"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={e => setSearchEmail(e.target.value)}
        />
        <button className="btn btn-outline-success" onClick={onGetPatient}>
          Get Patient
        </button>
        {patient && (
          <div>
            <h1>{patient.firstName}</h1>
            <p>{patient.lastName}</p>
            <p>{patient.email}</p>
            {/* Render additional patient details as needed */}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
