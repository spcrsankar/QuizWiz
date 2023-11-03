import React, { useState } from 'react'
import './style.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Footer from './Footer';

export default function EditProfile() {
 
    const navigate = useNavigate();
    
    const [profilePic, setProfilePic] = useState('user1.png');
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const id = localStorage.getItem('userId');
    const username = localStorage.getItem('userName')

    var [firstname, lastname] = username.split(' ')

    const handleImage = (e) => {
      setProfilePic(e.target.files);
      console.log(profilePic)
    }

    const handleEditProfile = async (e) => {
        e.preventDefault();
          const editData = {
            "firstName": fname,
            "lastName": lname,
          };
          console.log(editData);
          
          try {
            const res = await axios.put('https://quiz-app-ieqe.onrender.com/api/users/update/'+id,editData, {
              headers: {
                  'authorization': localStorage.getItem("token") // Setting the 'Authorization' header with the token
              }
            })

            if(profilePic) {
              const data = new FormData();
                for(var x = 0; x<profilePic.length; x++) {
                    data.append('file', profilePic[x])
              }
              const picres = await axios.post('https://quiz-app-ieqe.onrender.com/api/users/upload_user', data, {
                headers: {
                    'authorization': localStorage.getItem("token") // Setting the 'Authorization' header with the token
                }
              })
              console.log(data);
              console.log(picres.data);
            }
            localStorage.setItem('username',fname+' '+lname)
            
            navigate("/home")
            console.log(res.data);
          } catch (e) {
            alert(e.message)
          }
  
      };

    return (
      <div className="main-container">
          <Form className="login-form edit-form" onSubmit={handleEditProfile}>
            <h3>Edit Profile</h3>

            <Form.Group className="mb-3" controlId="profile-pic">
              {/* <img alt='' src={"https://quiz-app-ieqe.onrender.com/uploads/"+localStorage.getItem('userId')} className='edit-profile-pic'/>
              <br/> */}
              <Form.Label className="inp-label">Profile Photo</Form.Label>
              <Form.Control type="file" className="inp inp-user" placeholder='Choose Photo' onChange={handleImage} accept='image/*' />
            </Form.Group>

            <Form.Group className="mb-3" controlId="fname">
              <Form.Label className="inp-label">First Name</Form.Label>
              <Form.Control type="text" className="inp inp-user" placeholder={firstname} onChange={(e) => setfname(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="lname">
              <Form.Label className="inp-label">Last Name</Form.Label>
              <Form.Control type="text" className="inp inp-user" placeholder={lastname} onChange={(e) => setlname(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="inp-label">Email address</Form.Label>
              <Form.Control type="email" className="inp inp-user" placeholder='Email' disabled readOnly/>
            </Form.Group>

            <Button variant="primary" type="submit" className="btn form-btn">
              Edit
            </Button>

          </Form>
          <Footer />
      </div>
    )
}