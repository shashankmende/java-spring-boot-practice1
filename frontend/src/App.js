import "./App.css";
import { useState  } from "react";
import axios from "axios";

const availableTabs = { login: "LOGIN", users: "USERS" };

function App() {
  const [firstName, setFirstName] = useState("");
  // const [firstNameFocus, setfirstNameFocus] = useState("");
  const [lastName, setLastName] = useState("");
  // const [secondNameFocus, setSecondNameFocus] = useState("");
  const [email, setEmail] = useState("");
  // const [emailFocus, setEmailFocus] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [patient, setPatient] = useState(null);
  const [tab, setTab] = useState(availableTabs.login);

  const [userFetchErrorMs, setuserFetchErrorMs] = useState("");

  // useEffect(() => {
  //   const socket = new WebSocket("ws://localhost:3000/ws");

  //   socket.onopen = () => {
  //     console.log("WebSocket connection established.");
  //   };

  //   socket.onmessage = (event) => {
  //     console.log("Message received from server:", event.data);
  //     // Update state or handle message as needed
  //   };

  //   socket.onerror = (error) => {
  //     console.error("WebSocket error:", error);
  //   };

  //   socket.onclose = () => {
  //     console.log("WebSocket connection closed.");
  //   };

  //   return () => {
  //     if (socket.readyState === WebSocket.OPEN) {
  //       socket.close();
  //     }
  //   };
  // }, []);

  const onSubmitSave = async (e) => {
    e.preventDefault();

    const requestBody = {
      firstName,
      lastName,
      email,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/newPatient",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("response=", response);
    } catch (error) {
      console.error("Failed to save patient:", error.message);
    }
  };

  const onGetPatient = async (e) => {
    
    e.preventDefault();
    console.log("get patient method is invoked")
    
      try {
        const response = await axios.get(
          `http://localhost:8080/byEmail?email=${searchEmail}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response=",response)
        setPatient(response.data); // Assuming response.data contains patient object
      } catch (error) {
        console.error("Failed to get patient:", error.message);
        setuserFetchErrorMs(error.message);
      }
    
  };

  const onClickLoginTab = () => {
    setTab(availableTabs.login);
  };

  const onClickUsersTab = () => {
    setTab(availableTabs.users);
  };

  // const onBlurFirstName = () => {
  //   console.log("blur event is triggered");
  //   setfirstNameFocus("*first name is required");
  // };

  // const onFocusFirstName = () => {
  //   setfirstNameFocus(""); // Clear the focus error message
  // };

  // const onBlurLastName = () => {
  //   console.log("blur event is triggered");
  //   setSecondNameFocus("*second name is required");
  // };

  // const onFocusLastName = () => {
  //   setSecondNameFocus("");
  // };

  // const onBlurEmail = () => {
  //   setEmailFocus("*Email is required");
  // };

  // const onFocusEmail = () => {
  //   setEmailFocus("");
  // };

  const returnButton = () => {
    const loginActiveCss =
      tab === availableTabs.login ? "activeTabCss" : "inActiveTabCss";

    const userActiveCSs =
      tab === availableTabs.users ? "activeTabCss" : "inActiveTabCss ";

    return (
      <div className="buttons-container">
        <button className={`${loginActiveCss}`} onClick={onClickLoginTab}>
          Login
        </button>
        <button className={`${userActiveCSs}`} onClick={onClickUsersTab}>
          Users
        </button>
      </div>
    );
  };

  return (
    <div className="App">
      {returnButton()}
      {tab === availableTabs.login && (
        <form onSubmit={onSubmitSave}>
          {/* <h1 className="text-primary">Login</h1> */}
          <div className="w-100 first_name_container">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              aria-label="Username"
              aria-describedby="basic-addon1"
              // onBlur={onBlurFirstName}
              // onFocus={onFocusFirstName}
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
            {/* <br />
            {firstNameFocus && (
              <p className="first_name_foucs">{firstNameFocus}</p>
            )} */}
          </div>
          <div className="w-100 mb-1 first_name_container">
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              aria-label="Username"
              // onBlur={onBlurLastName}
              // onFocus={onFocusLastName}
              required
              aria-describedby="basic-addon1"
              onChange={(e) => setLastName(e.target.value)}
            />
            {/* {secondNameFocus && (
              <p className="second_name_focus">{secondNameFocus}</p>
            )} */}
          </div>
          <div className="w-100 first_name_container">
            <input
              type="text"
              className="form-control"
              placeholder="email"
              aria-label="Username"
              required
              // onBlur={onBlurEmail}
              // onFocus={onFocusEmail}
              aria-describedby="basic-addon1"
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* {emailFocus && <p className="second_name_focus">{emailFocus}</p>} */}
          </div>

          <button className="btn btn-outline-success" type="submit">
            Save
          </button>
        </form>
      )}
      

      {tab === availableTabs.users && (
        <div>
          <form>
            <input
              type="text"
              className="form-control"
              placeholder="enter user email"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => setSearchEmail(e.target.value)}
            />
            <button className="btn btn-outline-success" onClick={onGetPatient}>
              Get Patient
            </button>
            <div>
              {patient && (
                <table className="table table-secondary  table-hover w-100">
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{patient.firstName}</td>
                      <td>{patient.lastName}</td>
                      <td>{patient.email}</td>
                    </tr>
                    <tr>
                      <td>fname</td>
                      <td>lname</td>
                      <td>email</td>
                    </tr>
                  </tbody>
                </table>
              )}
              {userFetchErrorMs && <p>{userFetchErrorMs}</p>}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
