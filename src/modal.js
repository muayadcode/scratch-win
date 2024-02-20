// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     useHistory,
//     useLocation,
//     useParams
// } from "react-router-dom";

// function Modal() {
//     let history = useHistory();
//     let { id } = useParams();



//     let back = e => {
//         e.stopPropagation();
//         history.goBack();
//     };

//     return (
//         <div
//             onClick={back}
//             className="modalBackground"
//         >
//             <div
//                 className="modal"
//                 style={{

//                 }}
//             >
//                 <h1>{image.title}</h1>
//                 <Image color={image.color} />
//                 <button type="button" onClick={back}>
//                     Close
//                 </button>
//             </div>
//         </div>
//     );
// }