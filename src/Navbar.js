import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar">
      <h2 id="logo">Karaki Stock Manager</h2>
      <div className="links">
        <Link className="link" to="/">
          <div>Stock</div>
        </Link>
        <Link className="link" to="/edit">
          <div>Edit</div>
        </Link>
        <Link className="link" to="/history">
          <div>History</div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
