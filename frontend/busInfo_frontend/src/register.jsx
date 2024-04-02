import React from 'react';

function Register() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Navbar */}
      <nav className="bg-dark p-5">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="text-white font-bold text-xl">BusInfo</a>
          <div className="flex space-x-4">
            <a href="#" className="text-white">Home</a>
            <a href="#" className="text-white">Register</a>
            <a href="#" className="text-white">View</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="container mx-auto py-10">
        <div className="flex justify-between space-x-8">
          {/* Register Drivers */}
          <div className="bg-gray-800 p-6 rounded-lg text-center w-1/2">
            <h3 className="text-2xl font-bold mb-4">Register Your Drivers</h3>
            <p className="text-white mb-6">
              Register the drivers related to your company. We keep track of their license validity period. And notify you when the license is about to expire, so you can ask your drivers to renew their license for smooth functioning.
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => { window.location.href = "./driverReg.php"; }}>Register</button>
          </div>
          
          {/* Register Vehicles */}
          <div className="bg-gray-800 p-6 rounded-lg text-center w-1/2">
            <h3 className="text-2xl font-bold mb-4">Register Your Vehicles</h3>
            <p className="text-white mb-6">
              Register the vehicles owned by your company. We keep track of the permit renewal of the vehicles, for smooth functionality of your business without facing any legal issues.
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => { window.location.href = "./busReg.php"; }}>Register</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
