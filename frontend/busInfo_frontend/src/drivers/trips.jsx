import React from 'react';

function TripsPage(/*{ trips }*/) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ padding: '50px' }}>
        <a className="navbar-brand" href="#" style={{ paddingLeft: '50px' }}>BusInfo</a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse n justify-content-end" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/api/drivers/index">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="logout">Logout</a>
            </li>
          </ul>
        </div>
      </nav>
      <br />
      <br />
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>License Number</th>
          </tr>
        </thead>
        <tbody>
          {/* {trips.map((trip, index) => (
            <tr key={index}>
              <td>{trip.trip_date || ' '}</td>
              <td>{trip.trip_time || ' '}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
      <footer className="bg-gray-500 py-4">
        <p style={{ color: '#fff' }}>© Copyright BusInfo</p>
      </footer>
    </>
  );
}

export default TripsPage;
