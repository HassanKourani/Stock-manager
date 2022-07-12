import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
const Hstory = ({ db }) => {
  const [actions, setActions] = useState([]);
  const actionsCollectionRef = collection(db, "action");
  const [newFilter, setNewFilter] = useState([]);
  const [newType, setNewType] = useState([]);
  const [newThick, setNewThick] = useState([]);
  const [types, setTypes] = useState([]);
  const [thicks, setThicks] = useState([]);
  const typesCollectionRef = collection(db, "types");
  const thicksCollectionRef = collection(db, "thick");

  useEffect(() => {
    const getdata = async () => {
      const data1 = await getDocs(typesCollectionRef);
      setTypes(data1.docs.map((type) => ({ ...type.data(), id: type.id })));
      const data2 = await getDocs(thicksCollectionRef);
      setThicks(data2.docs.map((thick) => ({ ...thick.data(), id: thick.id })));
      const data7 = await getDocs(actionsCollectionRef);
      setActions(
        data7.docs.map((action) => ({ ...action.data(), id: action.id }))
      );
    };
    getdata();
  });

  let filter = [];
  const handleFilter = () => {
    filter = actions.filter((r) => r.type === newType && r.thick === newThick);
    //console.log(filter);
    setNewFilter(filter);
  };
  return (
    <div className="history">
      <div>
        <select onChange={(e) => setNewType(e.target.value)}>
          <option value="none">type</option>
          {types.map((type) => (
            <option key={type.id}>{type.type}</option>
          ))}
        </select>
        <select onChange={(e) => setNewThick(e.target.value)}>
          <option value="none">Thickness</option>
          {thicks.map((thick) => (
            <option key={thick.id}>{thick.value}</option>
          ))}
        </select>

        <button onClick={handleFilter}>Filter</button>
      </div>
      <h2>History</h2>
      <table>
        <thead>
          <tr>
            <th>type</th>
            <th>thickness</th>
            <th>width</th>
            <th>height</th>
            <th>amount</th>
            <th>user</th>
            <th>Reason</th>
            <th>time</th>
          </tr>
        </thead>
        {actions.map((action) => (
          <tbody key={action.id}>
            <tr>
              <td>{action.type}</td>
              <td>{action.thick}</td>
              <td>{action.width}</td>
              <td>{action.height}</td>
              <td>{action.amount}</td>
              <td>{action.user}</td>
              <td>{action.reason}</td>
              <td>{action.time}</td>
            </tr>
          </tbody>
        ))}
      </table>
      <h2>Filtered History</h2>
      <table>
        <thead>
          <tr>
            <th>type</th>
            <th>thickness</th>
            <th>width</th>
            <th>height</th>
            <th>amount</th>
            <th>user</th>
            <th>Reason</th>
            <th>time</th>
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
              <td>{board.user}</td>
              <td>{board.reason}</td>
              <td>{board.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Hstory;
