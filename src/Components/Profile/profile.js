import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
const ProfilePage = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState([])

  const [lemail, setlemail] = useState(localStorage.getItem('email')) 
  const [name, setname] = useState(localStorage.getItem('name'))

  useEffect(() => {
    setlemail(localStorage.getItem('email'))
    setname(localStorage.getItem("name"))
  },[])

  const loginemail = lemail

  const Update = async(e) =>
  {
    navigate("/profileform")
  }
 
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user-details/${loginemail}`);
        setdata(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, [loginemail]);

  
  return (
    <div>
      {data ? (
        <div className="d-flex flex-column align-content-lg-start justify-content-center p-4">
          <h2>User Details</h2>
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
          <p>Date of Birth: {data.dob}</p>
          <p>Age: {data.age}</p>
          <p>Gender: {data.gender}</p>
          <p>Contact: {data.contact}</p>
          <p>Education: {data.education}</p>
          <p>Adress: {data.adress}</p>
          <p>Pincode: {data.pincode}</p>
          <Button onClick={() => navigate("/updateUser", {state: data})} >Edit</Button>
        </div>
      ) : (
        name == null && lemail == null?(
          <div>Login</div>
        ):(
        <div>
        <p>Update your profile</p>
        <p>Name: {name}</p>
        <p>Email: {lemail}</p>
        <button onClick={Update}>Update</button>
        </div>
        )
      )}
    </div>

  );
};

export default ProfilePage;