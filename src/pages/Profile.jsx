import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userId || !token) return;

        const res = await axios.get(`https://fakestoreapi.com/users/${userId}`);
        setUser(res.data);
        setFormData({
          firstname: res.data.name.firstname,
          lastname: res.data.name.lastname,
          email: res.data.email,
          username: res.data.username
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [userId, token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.href = '/';
  };

  const handleEditToggle = () => setEditing(prev => !prev);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`https://fakestoreapi.com/users/${userId}`, {
        email: formData.email,
        username: formData.username,
        name: {
          firstname: formData.firstname,
          lastname: formData.lastname
        }
      });

      alert('Profile updated!');
      setUser(res.data);
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  if (!user) return <div className="profile-container">Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src={`https://i.pravatar.cc/150?u=${user.id}`}
          alt="Avatar"
          className="profile-avatar"
        />
        {editing ? (
          <>
            <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
            <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
            <input type="text" name="email" value={formData.email} onChange={handleChange} />
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
            <button onClick={handleUpdate} className="save-btn">Save</button>
            <button onClick={handleEditToggle} className="cancel-btn">Cancel</button>
          </>
        ) : (
          <>
            <h2 className="profile-name">{user.name.firstname} {user.name.lastname}</h2>
            <p className="profile-email">{user.email}</p>
            <p className="profile-role">Username: {user.username}</p>
            <button onClick={handleEditToggle} className="edit-btn">Edit</button>
          </>
        )}
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default Profile;
