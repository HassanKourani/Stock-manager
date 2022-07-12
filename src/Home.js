import { useState, useEffect } from "react";
//import { db } from "./config";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
const Home = ({ db }) => {
  const [types, setTypes] = useState([]);
  const [widths, setWidths] = useState([]);
  const [heights, setHeights] = useState([]);
  const [thicks, setThicks] = useState([]);
  const [shelfs, setShelfs] = useState([]);
  const [boards, setBoards] = useState([]);
  const [amount, setAmount] = useState("");
  const [actions, setActions] = useState([]);
  const [users, setUsers] = useState([]);
  const [newType, setNewType] = useState([]);
  const [newWidth, setNewWidth] = useState([]);
  const [newHeight, setNewHeight] = useState([]);
  const [newThick, setNewThick] = useState([]);
  const [newShelf, setNewShelf] = useState([]);
  const [newReason, setNewReason] = useState([]);
  const [newUser, setNewUser] = useState([]);
  const [newFilter, setNewFilter] = useState([]);
  const typesCollectionRef = collection(db, "types");
  const thicksCollectionRef = collection(db, "thick");
  const widthsCollectionRef = collection(db, "width");
  const heightsCollectionRef = collection(db, "height");
  const shelfsCollectionRef = collection(db, "shelf");
  const boardsCollectionRef = collection(db, "board");
  const actionsCollectionRef = collection(db, "action");
  const usersCollectionRef = collection(db, "user");

  //gets the data from the fireStore
  useEffect(() => {
    const getdata = async () => {
      //get types :
      const data1 = await getDocs(typesCollectionRef);
      setTypes(data1.docs.map((type) => ({ ...type.data(), id: type.id })));
      //get thicknesses  :
      const data2 = await getDocs(thicksCollectionRef);
      setThicks(data2.docs.map((thick) => ({ ...thick.data(), id: thick.id })));
      //get widths :
      const data3 = await getDocs(widthsCollectionRef);
      setWidths(data3.docs.map((width) => ({ ...width.data(), id: width.id })));
      //get heights :
      const data4 = await getDocs(heightsCollectionRef);
      setHeights(
        data4.docs.map((height) => ({ ...height.data(), id: height.id }))
      );
      //get shelf :
      const data5 = await getDocs(shelfsCollectionRef);
      setShelfs(data5.docs.map((shelf) => ({ ...shelf.data(), id: shelf.id })));
      //get boards
      const data6 = await getDocs(boardsCollectionRef);
      setBoards(data6.docs.map((board) => ({ ...board.data(), id: board.id })));
      //get Actions
      const data7 = await getDocs(actionsCollectionRef);
      setActions(
        data7.docs.map((action) => ({ ...action.data(), id: action.id }))
      );

      //get users
      const data8 = await getDocs(usersCollectionRef);
      setUsers(data8.docs.map((user) => ({ ...user.data(), id: user.id })));
    };

    getdata();
  }, []);
  // grab the new object and check if a similar one exist if so add the amounts if not pushes the object into the array
  const result = [];

  const process = () =>
    boards.forEach((r) => {
      const found = result.find(
        (a) =>
          a.type === r.type &&
          a.thick === r.thick &&
          a.width === r.width &&
          a.height === r.height &&
          a.shelf === r.shelf
      );
      if (found) {
        //console.log(typeof found.amount, typeof r.amount);
        found.amount = Number(found.amount);
        found.amount += Number(r.amount);
      } else {
        result.push({ ...r });
      }
    });

  process();

  //console.log(new Date().toLocaleString());
  //console.log(result);
  //console.log("boards => ", boards);

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(boardsCollectionRef, {
      type: newType,
      thick: newThick,
      height: newHeight,
      width: newWidth,
      amount: amount,
      shelf: newShelf,
    })
      .then(() => {
        console.log("added");
        window.location.reload();
      })
      .catch((err) => console.log(err.message));
  };
  const handleUse = (e) => {
    e.preventDefault();
    addDoc(boardsCollectionRef, {
      type: newType,
      thick: newThick,
      height: newHeight,
      width: newWidth,
      amount: -amount,
      shelf: newShelf,
    })
      .then(() => {
        console.log("removed");
      })
      .catch((err) => console.log(err.message));
    addDoc(actionsCollectionRef, {
      type: newType,
      thick: newThick,
      height: newHeight,
      width: newWidth,
      amount: -amount,
      user: newUser,
      reason: newReason,
      time: new Date().toLocaleString(),
    })
      .then(() => {
        console.log("removed");
        window.location.reload();
      })
      .catch((err) => console.log(err.message));
  };
  let filter = [];
  const handleFilter = () => {
    filter = result.filter((r) => r.type === newType && r.thick === newThick);
    //console.log(filter);
    setNewFilter(filter);
  };
  //console.log(newFilter);

  return (
    <div className="home">
      <div className="add">
        <select onChange={(e) => setNewType(e.target.value)}>
          <option value="none">type</option>
          {types.map((type) => (
            <option key={type.id}>{type.type}</option>
          ))}
        </select>
        {/* ================================================= */}
        <select onChange={(e) => setNewThick(e.target.value)}>
          <option value="none">Thickness</option>
          {thicks.map((thick) => (
            <option key={thick.id}>{thick.value}</option>
          ))}
        </select>
        {/* ================================================= */}
        <select onChange={(e) => setNewWidth(e.target.value)}>
          <option value="none">Width</option>
          {widths.map((width) => (
            <option key={width.id}>{width.value}</option>
          ))}
        </select>
        {/* ================================================= */}
        <select onChange={(e) => setNewHeight(e.target.value)}>
          <option value="none">Height</option>
          {heights.map((height) => (
            <option key={height.id}>{height.value}</option>
          ))}
        </select>
        {/* ================================================= */}
        <select onChange={(e) => setNewShelf(e.target.value)}>
          <option value="none">Shelf</option>
          {shelfs.map((shelf) => (
            <option key={shelf.id}>{shelf.shelf}</option>
          ))}
        </select>
        {/* ================================================= */}
        <select onChange={(e) => setNewUser(e.target.value)}>
          <option value="none">User</option>
          {users.map((user) => (
            <option key={user.id}>{user.name}</option>
          ))}
        </select>
        {/* ================================================= */}
      </div>
      <div className="use">
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount..."
          required
        />
        <button onClick={handleSubmit}>ADD</button>
        <input
          type="text"
          placeholder="Reason"
          value={newReason}
          onChange={(e) => setNewReason(e.target.value)}
        />
        <button onClick={handleUse}>USE</button>
        <button onClick={handleFilter}>Filter</button>
      </div>
      <div className="stock">
        <h2>Stock</h2>
        <table>
          <thead>
            <tr>
              <th>type</th>
              <th>thickness</th>
              <th>width</th>
              <th>height</th>
              <th>amount</th>
              <th>Shelf</th>
            </tr>
          </thead>
          <tbody>
            {result.map((board) => (
              <tr key={board.id}>
                <td className="table-element">{board.type}</td>
                <td>{board.thick}</td>
                <td>{board.width}</td>
                <td>{board.height}</td>
                <td>{board.amount}</td>
                <td>{board.shelf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="filtered">
        <h2>Filtered</h2>
        <table>
          <thead>
            <tr>
              <th>type</th>
              <th>thickness</th>
              <th>width</th>
              <th>height</th>
              <th>amount</th>
              <th>Shelf</th>
            </tr>
          </thead>
          <tbody>
            {newFilter.map((board) => (
              <tr key={board.id}>
                <td>{board.type}</td>
                <td>{board.thick}</td>
                <td>{board.width}</td>
                <td>{board.height}</td>
                <td>{board.amount}</td>
                <td>{board.shelf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
