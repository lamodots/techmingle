
import React, { useContext, useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import { UserPlusIcon } from '@heroicons/react/20/solid';
import './dash.css';
import ContactCard from '../../components/ContactCard/ContactCard';
import { userContext } from '../../context/UserContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { currentUser } = useContext(userContext);
  const navigate = useNavigate();

  // Redirect to login page for any user who isn't logged in
  useEffect(() => {
    if (!currentUser?.token) {
      navigate('/directory/login');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const fetchContacts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:8800/contacts/', {
          headers: {
            Authorization: `BEARER ${currentUser.token}`
          }
        });
        setContacts(response.data.data);
        setFilteredContacts(response.data.data); // Set filteredContacts initially with all contacts
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchContacts();
  }, [currentUser.token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/contacts/${id}`);
      // Remove the deleted contact from the state
      setContacts((prevContacts) => prevContacts.filter((contact) => contact._id !== id));
      setFilteredContacts((prevContacts) => prevContacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.log(error);
      // Handle error here, show a notification, etc.
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = contacts.filter((contact) =>
      `${contact.firstname} ${contact.middlename} ${contact.surname}`.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredContacts(filtered);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <nav>
        {/* After: Passed Accessibility check */}
        <Link to="/directory/create">
          <button className='dash_btn' title='Add Contact'>
            <UserPlusIcon className='addIcon' />
          </button>
        </Link>
        {currentUser?.token && <Link to="/directory/logout"><button>Logout</button></Link>}
      </nav>
      <main>
        <div className='search-container'>
          <input
            type='text'
            placeholder='Search contacts'
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        {filteredContacts.length > 0 ? (
          <div>
            {filteredContacts.map(({ _id, ...rest }) => (
              <ContactCard key={_id} id={_id} {...rest} handleDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <h1 className='no_contact'>No contact found 😳</h1>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
