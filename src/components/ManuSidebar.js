import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AppSidebarNav } from './AppSidebarNav';

const Sidebar = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API থেকে মেনু ডাটা লোড করা
    axios.get('https://your-api.com/menu')
      .then(response => {
        setMenuItems(response.data); // API থেকে পাওয়া মেনু ডাটা সেট করা
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching menu:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading Sidebar...</div>;
  }

  return <AppSidebarNav items={menuItems} />;
};

export default Sidebar;
