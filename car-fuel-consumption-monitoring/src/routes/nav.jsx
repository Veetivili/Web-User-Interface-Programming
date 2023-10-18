import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav className="navbar">
        <div className="nav-container">
          <a className="navbar-brand">Car Fuel Consumption Monitoring</a>
        </div>
        <div className='navigation-links'>
            <Link to='/'>Home</Link>
            <Link to='/input'>Input</Link>
            <Link to='/history'>History</Link>
        </div>
      </nav>
    );
}

export default Nav;