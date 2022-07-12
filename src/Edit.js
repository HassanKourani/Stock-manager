import { useState, useEffect } from "react";
//import { db } from "./config";
import { collection, addDoc } from "firebase/firestore";

const Edit = ({ db }) => {
  const [type, setType] = useState("");
  const [thick, setThick] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [user, setUser] = useState("");
  const [shelf, setShelf] = useState("");
  const typesCollectionRef = collection(db, "types");
  const thicksCollectionRef = collection(db, "thick");
  const widthsCollectionRef = collection(db, "width");
  const heightsCollectionRef = collection(db, "height");
  const usersCollectionRef = collection(db, "user");
  const shelfsCollectionRef = collection(db, "shelf");
  const handleAddType = (e) => {
    e.preventDefault();
    addDoc(typesCollectionRef, { type: type })
      .then(() => {
        setType("");
      })
      .catch((err) => console.log(err.message));
  };
  const handleAddThick = (e) => {
    e.preventDefault();
    addDoc(thicksCollectionRef, { value: thick })
      .then(() => {
        setThick("");
      })
      .catch((err) => console.log(err.message));
  };
  const handleAddWidth = (e) => {
    e.preventDefault();
    addDoc(widthsCollectionRef, { value: width })
      .then(() => {
        setWidth("");
      })
      .catch((err) => console.log(err.message));
  };
  const handleAddHeight = (e) => {
    e.preventDefault();
    addDoc(heightsCollectionRef, { value: height })
      .then(() => {
        setHeight("");
      })
      .catch((err) => console.log(err.message));
  };
  const handleAddUser = (e) => {
    e.preventDefault();
    addDoc(usersCollectionRef, { name: user })
      .then(() => {
        setUser("");
      })
      .catch((err) => console.log(err.message));
  };
  const handleAddShelf = (e) => {
    e.preventDefault();
    addDoc(shelfsCollectionRef, { shelf: shelf })
      .then(() => {
        setShelf("");
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div className="edit">
      <form onSubmit={handleAddType}>
        <label htmlFor="type"> Type : </label>
        <input
          type="text"
          name="type"
          placeholder="Add Type..."
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
        <button> ADD </button>
      </form>
      {/* ======================================================== */}
      <form onSubmit={handleAddThick}>
        <label htmlFor="thick"> Thickness : </label>
        <input
          type="text"
          name="thick"
          placeholder="Add Thickness..."
          value={thick}
          onChange={(e) => setThick(e.target.value)}
          required
        />
        <button> ADD </button>
      </form>
      {/* ======================================================== */}

      <form onSubmit={handleAddWidth}>
        <label htmlFor="width"> Width : </label>
        <input
          type="text"
          name="width"
          placeholder="Add width..."
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          required
        />
        <button> ADD </button>
      </form>
      {/* ======================================================== */}

      <form onSubmit={handleAddHeight}>
        <label htmlFor="height"> Height : </label>
        <input
          type="text"
          name="height"
          placeholder="Add height..."
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
        />
        <button> ADD </button>
      </form>
      {/* ======================================================== */}

      <form onSubmit={handleAddUser}>
        <label htmlFor="user"> User : </label>
        <input
          type="text"
          name="user"
          placeholder="Add User..."
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />
        <button> ADD </button>
      </form>
      {/* ======================================================== */}

      <form onSubmit={handleAddShelf}>
        <label htmlFor="shelf"> Shelf : </label>
        <input
          type="text"
          name="shelf"
          placeholder="Add shelf..."
          value={shelf}
          onChange={(e) => setShelf(e.target.value)}
          required
        />
        <button> ADD </button>
      </form>
    </div>
  );
};

export default Edit;
