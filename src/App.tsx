import React from 'react';
import UserList from './components/user-list/UserList';
import './App.css'
import { Typography } from 'antd';

const { Title } = Typography;

const App: React.FC = () => {
  return (
    <div className="App">
      <Title level={2}>User List</Title>
      <UserList />
    </div>
  );
};

export default App;
