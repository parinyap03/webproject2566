const firebaseConfig = {
  apiKey: "AIzaSyDbRAbnHG487LrPU-noFe2qeKDgSfQfvrw",
  authDomain: "webproject-25d5d.firebaseapp.com",
  projectId: "webproject-25d5d",
  storageBucket: "webproject-25d5d.appspot.com",
  messagingSenderId: "940584762206",
  appId: "1:940584762206:web:eb568adfe4658b4edaadcf"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
// db.collection("students").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         console.log(`${doc.id} =>`, doc.data());
//     });
// });


const RB = ReactBootstrap;
const { Alert, Card, Button, Table } = ReactBootstrap;



class App extends React.Component {
  stdprogram = (
    <div className="std-program">
      <button type="button" className="btn btn-primary btn-lg" onClick={() => this.handleCheckAttendanceClick()}>เช็คชื่อ</button>
      <br/>
      <button type="button" className="btn btn-secondary btn-lg">ถาม - ตอบ</button>
    </div>
  );

  stdcheck = (
    <div className="stdcheck">
      <h5>เช็คชื่อ นักศึกษา :</h5>
      <input type="text" class="form-control" placeholder="Code" aria-label="Username" ></input>
      <br/>
      <button className="btn btn-primary" type="button">Submit</button>
    </div>
  );

  state = {
    scene: 0,
    students: [],
    stdid: "",
    stdtitle: "",
    stdfname: "",
    stdlname: "",
    stdemail: "",
    stdphone: "",
    user: null,
    ustudent: null,
    // Add a state for displaying the message
    showMessage: false
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.toJSON() });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    if (this.state.user) {
      if (this.state.scene === 1) {
        return (
          <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm container-fluid">
              <div className="container">
                <a className="navbar-brand" href="index1.html">
                  <strong className="h6 mb-0 font-weight-bold text-uppercase">Study</strong>
                </a>
                <button onClick={() => this.google_logout()} className="btn btn-outline-dark">Logout</button>
              </div>
            </nav>
            <div className="std-containner">
              <h1>Welcome, {this.state.user.displayName}</h1>
              <br/>
              <h5>Email: {this.state.user.email}</h5>
              {/* Render the message if showMessage is true */}
              {this.state.showMessage && this.stdcheck}
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm container-fluid">
              <div className="container">
                <a className="navbar-brand" href="index1.html">
                  <strong className="h6 mb-0 font-weight-bold text-uppercase">Study</strong>
                </a>
                <button onClick={() => this.google_logout()} className="btn btn-outline-dark">Logout</button>
              </div>
            </nav>
            <div className="std-containner">
              <h1>Welcome, {this.state.user.displayName}</h1>
              <br/>
              <h5>Email: {this.state.user.email}</h5>
              {this.stdprogram}
            </div>
          </div>
        );
      }
    } else {
      return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm container-fluid">
          <div className="container">
            <a className="navbar-brand" href="#">
              <strong className="h6 mb-0 font-weight-bold text-uppercase">Study</strong>
            </a>
            <button onClick={() => this.google_login()} className="btn btn-outline-dark">
              <i className="bi bi-person-fill"></i>
              Log in
            </button>
          </div>
        </nav>
      );
    }
  }

  google_login() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    firebase.auth().signInWithPopup(provider);
  }

  google_logout() {
    if (confirm("Are you sure?")) {
      firebase.auth().signOut();
    }
  }

  handleCheckAttendanceClick() {
    // Change scene to 1 when check attendance button is clicked
    // Also set showMessage state to true to display the message
    this.setState({ scene: 1, showMessage: true });
  }
}
// end class App

// text input
function TextInput({label,app,value,style}){
  return <label className="form-label">
  {label}:    
   <input className="form-control" style={style}
   value={app.state[value]} onChange={(ev)=>{
       var s={};
       s[value]=ev.target.value;
       app.setState(s)}
   }></input>
 </label>;  
}

const container = document.getElementById("myapp");
const root = ReactDOM.createRoot(container);
root.render(<App />);
