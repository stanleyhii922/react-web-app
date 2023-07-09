import { Collapse, Form, Input, Select, Space, Table, Empty, Card, Descriptions } from 'antd';
import React, { useEffect, useState } from 'react';
import { getStandardColumn } from '../../shared/columns-display-helper';
import './UserList.css';

const { Panel } = Collapse;

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const UserList: React.FC = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [sortingOption, setSortingOption] = useState('');
  const [filterOption, setFilterOption] = useState('');
  const [searchText, setSearchText] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        data = data.map((val: any) => {
          return {
            ...val,
            key: val.id
          }
        })
        setUserList(data);
      });
  }, []);

  const filteredUsers = userList.filter((user) => {
    if (filterOption === 'name') {
      return user.name.toLowerCase().includes(searchText.toLowerCase());
    } else if (filterOption === 'email') {
      return user.email.toLowerCase().includes(searchText.toLowerCase());
    } else if (filterOption === 'phone') {
      return user.phone.includes(searchText);
    }
    else if (filterOption === 'id') {
      return user.id.toString().includes(searchText);
    }
    return true;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortingOption === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortingOption === 'email') {
      return a.email.localeCompare(b.email);
    } else if (sortingOption === 'phone') {
      return a.phone.localeCompare(b.phone);
    } else if (sortingOption === 'id') {
      return a.id - b.id;
    }
    return 0;
  });

  const columns: any = [
    getStandardColumn("User ID", "id"),
    getStandardColumn("Name", "name"),
    getStandardColumn("Email", "email"),
    getStandardColumn("Phone", "phone"),
  ];

  return (
    <>
      <Collapse defaultActiveKey={["1"]} className="filter-collapse">
        <Panel header={"Filter"} key="1">
          <Form labelCol={{ span: 2 }}>
            <Form.Item label={"Search"}>
              <Space>
                <Select
                  placeholder={"Select Field"}
                  style={{ width: 120 }}
                  onChange={(value) => {
                    setFilterOption(value);
                  }}
                  options={[
                    { value: 'id', label: 'User ID' },
                    { value: 'name', label: 'Name' },
                    { value: 'email', label: 'Email' },
                    { value: 'phone', label: 'Phone' },
                  ]}
                />
                <Input placeholder={"Enter Text"} onChange={(event) => {
                  const value = event.target.value;
                  setSearchText(value);
                }} />
              </Space>
            </Form.Item>
            <Form.Item label={'Sort By'} name="status">
              <Space>
                <Select
                  placeholder={"Select Field"}
                  style={{ width: 120 }}
                  onChange={(value) => {
                    setSortingOption(value);
                  }}
                  options={[
                    { value: 'id', label: 'User ID' },
                    { value: 'name', label: 'Name' },
                    { value: 'email', label: 'Email' },
                    { value: 'phone', label: 'Phone' },
                  ]}
                />
              </Space>
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
      {windowWidth < 468 ?
        userList.length > 0 ?
          <Space wrap>
            {userList.map((val) => {
              return (
                <Card
                  title={val.name}
                  bordered={true}
                  style={{ width: 300 }}>
                  <Descriptions>
                    <Descriptions.Item label="User ID">{val.id}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{val.phone}</Descriptions.Item>
                    <Descriptions.Item label="Email">{val.email}</Descriptions.Item>
                  </Descriptions>
                </Card>
              )
            })}
          </Space>
          :
          <Empty /> :
        <Table columns={columns} dataSource={sortedUsers} className='user-list-table'
          pagination={
            {
              position: ['bottomRight'],
              showSizeChanger: true,
              defaultPageSize: 5,
              pageSizeOptions: [1, 2, 5, 10]
            }
          } />}
    </>
  );
};

export default UserList;