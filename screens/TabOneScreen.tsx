// import { StyleSheet } from 'react-native';

// import EditScreenInfo from '../components/EditScreenInfo';
// import LogInForm from '../components/LogInForm';
// import { Text, View } from '../components/Themed';
// import { RootTabScreenProps } from '../types';

// export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Log In</Text>
//       <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
//       <LogInForm />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });
// import React, { useState } from "react";
// // import { Auth } from "aws-amplify"; -> comentado pero después se usa
// // import { useHistory } from "react-router-dom";
// import { useNavigate } from "react-router-dom"; // reemplazo de useHistory
// import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
// import LoaderButton from "../components/LoaderButton";
// import { useFormFields } from "../libs/hooksLib";
// import { onError } from "../libs/errorLib";
// import "./ChangePassword.css";

// export default function ChangePassword() {
//   //const history = useHistory();
//   const history = useNavigate();
//   const [fields, handleFieldChange] = useFormFields({
//     password: "",
//     oldPassword: "",
//     confirmPassword: "",
//   });
//   const [isChanging, setIsChanging] = useState(false);

//   function validateForm() {
//     return (
//       fields.oldPassword.length > 0 &&
//       fields.password.length > 0 &&
//       fields.password === fields.confirmPassword
//     );
//   }

//   async function handleChangeClick(event) {
//     event.preventDefault();

//     setIsChanging(true);

//     try {
//       const currentUser = await Auth.currentAuthenticatedUser();
//       await Auth.changePassword(
//         currentUser,
//         fields.oldPassword,
//         fields.password
//       );

//       history.push("/settings");
//     } catch (error) {
//       onError(error);
//       setIsChanging(false);
//     }
//   }

//   return (
//     <div className="ChangePassword">
//       <form onSubmit={handleChangeClick}>
//         <FormGroup bsSize="large" controlId="oldPassword">
//           <ControlLabel>Old Password</ControlLabel>
//           <FormControl
//             type="password"
//             onChange={handleFieldChange}
//             value={fields.oldPassword}
//           />
//         </FormGroup>
//         <hr />
//         <FormGroup bsSize="large" controlId="password">
//           <ControlLabel>New Password</ControlLabel>
//           <FormControl
//             type="password"
//             onChange={handleFieldChange}
//             value={fields.password}
//           />
//         </FormGroup>
//         <FormGroup bsSize="large" controlId="confirmPassword">
//           <ControlLabel>Confirm Password</ControlLabel>
//           <FormControl
//             type="password"
//             onChange={handleFieldChange}
//             value={fields.confirmPassword}
//           />
//         </FormGroup>
//         <LoaderButton
//           block
//           type="submit"
//           bsSize="large"
//           disabled={!validateForm()}
//           isLoading={isChanging}
//         >
//           Change Password
//         </LoaderButton>
//       </form>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
// import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, ListGroup, ListGroupItem } from "react-bootstrap";
// import { useAppContext } from "../libs/contextLib";
import { useAppContext } from "../lib/contextLib";
import { onError } from "../lib/errorLib";
//import "./Home.css";


export default function Home() {
  //const [notes, setNotes] = useState([]);
  // const { isAuthenticated } = useAppContext();
  //const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   async function onLoad() {
  //     if (!isAuthenticated) {
  //       return;
  //     }

  //     try {
  //       const notes = await loadNotes();
  //       setNotes(notes);
  //     } catch (e) {
  //       onError(e);
  //     }

  //     setIsLoading(false);
  //   }

  //   onLoad();
  // }, [isAuthenticated]);

  // function loadNotes() {
  //   return API.get("notes", "/notes");
  // }

  // function renderNotesList(notes) {
  //   return [{}].concat(notes).map((note, i) =>
  //     i !== 0 ? (
  //       <LinkContainer key={note.noteId} to={`/notes/${note.noteId}`}>
  //         <ListGroupItem header={note.content.trim().split("\n")[0]}>
  //           {"Created: " + new Date(note.createdAt).toLocaleString()}
  //         </ListGroupItem>
  //       </LinkContainer>
  //     ) : (
  //       <LinkContainer key="new" to="/notes/new">
  //         <ListGroupItem>
  //           <h4>
  //             <b>{"\uFF0B"}</b> Create a new note
  //           </h4>
  //         </ListGroupItem>
  //       </LinkContainer>
  //     )
  //   );
  // }

  // function renderLander() {
  //   return (
  //     <div className="lander">
  //       <h1>Scratch</h1>
  //       <p>A simple note taking app</p>
  //       <div>
  //         <Link to="/login" className="btn btn-info btn-lg">
  //           Login
  //         </Link>
  //         <Link to="/signup" className="btn btn-success btn-lg">
  //           Signup
  //         </Link>
  //       </div>
  //     </div>
  //   );
  // }

  // function renderNotes() {
  //   return (
  //     <div className="notes">
  //       <PageHeader>Your Notes</PageHeader>
  //       <ListGroup>
  //         {!isLoading && renderNotesList(notes)}
  //       </ListGroup>
  //     </div>
  //   );
  // }

  return (
    <div className="Home">
      {/* {isAuthenticated ? renderNotes() : renderLander()} */}
      "Hola mundo"
    </div>
  );
}