// ********** APP.JS **********

//   const App = () => {
//     const userCookie = Cookies.get("token");
//     const [user, setUser] = useState({ token: userCookie });

//     const [showModal, setShowModal] = useState(false);

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [isSamePassword, setIsSamePassword] = useState("");
//     const [username, setUsername] = useState("");

//     const handleChange = (event, str) => {
//       const value = event.target.value;
//       if (str === "email") {
//         setEmail(value);
//       } else if (str === "password") {
//         setPassword(value);
//       } else if (str === "passwordBis") {
//         setIsSamePassword(value);
//       } else {
//         setUsername(value);
//       }
//     };

//     const handleSubmit = event => {
//       event.preventDefault();
//     };

//     const logIn = object => {
//       Cookies.set("token", object.token);
//       setUser({ token: object.token, username: object.account.username });
//     };

//     const logOut = () => {
//       Cookies.remove("token");
//       setUser(null);
//     };

// ********** MODAL.JS **********

// ********** 1) Function .post **********

// const req = async () => {
//     const response = await axios.post(
//       "https://leboncoin-api.herokuapp.com/api/user/log_in",
//       {
//         email: props.email,
//         password: props.password
//       }
//     );
//     if (response.data.token) {
//       props.logIn(response.data);
//     }

//     props.setShowModal(false);
//     props.setEmail("");
//     props.setPassword("");
//   };

// ********** HEADER.JS **********

// ********** 2) Props.user exists ? If yes: show disconnect + username **********

// {props.user ? (
//     <div
//       className="login"
//       onClick={() => {
//         props.logOut();
//       }}
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="20"
//         height="20"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="#346699"
//         stroke-width="2"
//         stroke-linecap="round"
//         stroke-linejoin="round"
//       >
//         <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//         <circle cx="8.5" cy="7" r="4"></circle>
//         <line x1="18" y1="8" x2="23" y2="13"></line>
//         <line x1="23" y1="8" x2="18" y2="13"></line>
//       </svg>
//       Se déconnecter - {props.user.username}
//     </div>
//   )
