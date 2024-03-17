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

  state = {
    scene: 0,
    // add students
    students: [],
    // add table
    stdid: "",
    stdtitle: "",
    stdfname: "",
    stdlname: "",
    stdemail: "",
    stdphone: "",
    // auth
    user: null,  // เพิ่มตัวแปร user=null คือยังไม่ login
    ustudent: null,
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
    // var stext = JSON.stringify(this.state.students);  
    // ตรวจสอบว่าผู้ใช้เข้าสู่ระบบหรือไม่
    if (this.state.user) {
      return (
        <div>
          <h1>Welcome, {this.state.user.displayName}</h1>
          <p>Email: {this.state.user.email}</p>
          <button onClick={() => this.google_logout()} className="btn btn-outline-dark">Logout</button>
        </div>
      );
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



  // google login logout
  google_login() {
    // Using a popup.
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




}


const container = document.getElementById("myapp");
const root = ReactDOM.createRoot(container);
root.render(<App />);