import React, { useEffect, useState } from 'react';
import '../styles/Card.css';
import defaultUserPhoto from '../img/photo-cover.svg';
import Button from './Button';
import styles from '../styles/Button.module.css';
import Tooltip from './Tooltip';
import Loader from './Loader';

const Card = ({ userUpdated }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const usersPerPage = 6;

  const fetchUsers = (page) => {
    setLoading(true);
    fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=${usersPerPage}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Fetch error :(');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data.users);
        setTotalPages(data.total_pages);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, userUpdated]);

  const handleShowMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className='users-card'>
      <h1 className='h1-request'>Working with GET request</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div className='user-list'>
          {users.map(user => (
            <div key={user.id} className='user-card'>
              <div className="circular-photo-container">
                {user.photo ? (
                  <img src={user.photo} alt="User Photo" className="user-photo" />
                ) : (
                  <img src={defaultUserPhoto} alt="Default User" className="user-photo" />
                )}
              </div>
              <Tooltip text={user.name}>
                <p className='user-name main-p'>{user.name}</p>
              </Tooltip>
              <Tooltip text={user.position}>
                <p className='user-position main-p'>{user.position}</p>
              </Tooltip>
              <Tooltip text={user.email}>
                <p className='user-email main-p'>{user.email}</p>
              </Tooltip>
              <Tooltip text={user.phone}>
                <p className='user-phone main-p'>{user.phone}</p>
              </Tooltip>
            </div>
          ))}
        </div>
      )}
      <div className='user-card-btn'>
      {loading ? (
  <Loader />
) : (
  <Button
    onClick={handleShowMore}
    className={`${styles.btn} ${currentPage >= totalPages ? styles.disabled : ''}`}
    disabled={currentPage >= totalPages}
  >
    Show more
  </Button>
)}
      </div>
    </div>
  );
};

export default Card;