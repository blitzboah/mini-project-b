import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function Navbar() {
    return (
      <nav className="flex justify-center items-center flex-wrap bg-gray-900 p-4">
        <Link to="/" className="text-cyan-400 underline-none mr-auto text-xl">BusInfo</Link>
        <div className="flex justify-center items-center space-x-4">
          <Link to="/" className="text-white hover:text-blue-500 underline-none">Home</Link>
          <Link to="/" className="text-white hover:text-blue-500 underline-none">Logout</Link>
        </div>
      </nav>
    )
}

function UsersTable() {

    const users = [
        { driver_name: 'John Doe', driver_licno: '12345', driver_phno: '1234567890' },
        { driver_name: 'Jane Smith', driver_licno: '67890', driver_phno: '9876543210' }
      ];
    return (
      <div className="bg-gray-800 p-8">
        <div className='bg-white p-4 rounded-md shadow-md'>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">License Number</th>
              <th className="px-4 py-2">Phone number</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {users.map((user, index) => (
          <tr key={index}>
            <td className="border px-4 py-2">{user.driver_name || ' '}</td>
            <td className="border px-4 py-2">{user.driver_licno || ' '}</td>
            <td className="border px-4 py-2">{user.driver_phno || ' '}</td>
          </tr>
        ))}
          </tbody>
        </table>
        </div>
      </div>
    );
  }

// function ViewDrivers() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // Fetch users data here and set it to state
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch('/api/users');
//         const data = await response.json();
//         setUsers(data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <div className="bg-gray-800 min-h-screen">
//       <Navbar />
//       <div className="container mx-auto py-8">
//         <UsersTable users={users} />
//       </div>
//     </div>
//   );
// }
function ViewDriversPage(){
    return(
        <>
        <Navbar/>
        <UsersTable/>
        {/* <ViewDrivers/> */}
        </>
    )
}

export default ViewDriversPage;
