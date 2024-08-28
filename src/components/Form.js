import React, { useState, useEffect } from 'react';
import '../styles/Form.css';
import Input from './Input';
import Button from './Button';
import SuccessImage from '../img/success-image.svg';
import Loader from './Loader';

const Form = ({ getUpdatedData }) => {
  const [position, setPosition] = useState('');
  const [positions, setPositions] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    photo: null,
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setPositions(data.positions);
        }
      })
      .catch(error => {
        console.error('Error fetching positions:', error);
      });
  }, []);

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoChange = (event) => {
    setFormData({
      ...formData,
      photo: event.target.files[0],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')
      .then(response => response.json())
      .then(data => {
        const token = data.token;

        const postData = new FormData();
        postData.append('name', formData.name);
        postData.append('email', formData.email);
        postData.append('phone', formData.phone);
        postData.append('position_id', position);
        postData.append('photo', formData.photo);

        return fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
          method: 'POST',
          headers: {
            'Token': token,
          },
          body: postData,
        });
      })
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        if (data.success) {
          getUpdatedData(true);
          setFormData({
            name: '',
            email: '',
            phone: '',
            photo: null,
          });
          setPosition('');
          setIsSuccess(true);
        } else {
          console.error('Error submitting form:', data.message);
        }
      })
      .catch(error => {
        setLoading(false);
        console.error('Error:', error);
      });
  };

  return (
    <div className='form-container-main'>
      <h1 className='h1-request text-center'>
        {isSuccess ? 'User successfully registered' : 'Working with POST request'}
      </h1>
      <div className="form-container">
        {loading ? (
          <Loader />
        ) : (
          !isSuccess ? (
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <Input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <div className="form-group">
                <label className='main-p position-select'>Select your position</label>
                <div className="radio-group">
                  {positions.map(pos => (
                    <label key={pos.id}>
                      <input
                        type="radio"
                        name="position"
                        value={pos.id}
                        checked={position === String(pos.id)}
                        onChange={handlePositionChange}
                      />
                      <span className='main-p'>{pos.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-group upload-container">
                <label htmlFor="upload-photo" className="upload-btn">
                  <span className="btn-text main-p">Upload</span>
                  <span className="upload-text main-p">
                    {formData.photo ? formData.photo.name : 'Upload your photo'}
                  </span>
                </label>
                <input
                  id="upload-photo"
                  type="file"
                  accept="image/jpeg, image/jpg"
                  onChange={handlePhotoChange}
                  required
                />
              </div>
              <div className='form-btn'>
                <Button type="submit">Sign Up</Button>
              </div>
            </form>
          ) : (
            <div className="success-message">
              <img src={SuccessImage} alt="Success" />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Form;