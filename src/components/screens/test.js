import React, { useState, useRef,useEffect } from "react";
import "antd/dist/antd.css";
import "../../index.css";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch, useSelector } from 'react-redux'
import { clientList,editClient,deleteClient } from '../../redux/actionCreators/clientAction'
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Joe Black",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Jim Green",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "5",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "6",
    name: "Joe Black",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "7",
    name: "Jim Green",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "8",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "9",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "10",
    name: "Joe Black",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "11",
    name: "Jim Green",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "12",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "13",
    name: "Joe Black",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "14",
    name: "Jim Green",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "15",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "16",
    name: "Joe Black",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "17",
    name: "Jim Green",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "18",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "19",
    name: "Joe Black",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "20",
    name: "Jim Green",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "21",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "22",
    name: "Joe Black",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "23",
    name: "Jim Green",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "24",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];

const Test = ({selected,setSelected,toast}) => {
  const [filter, setfilter] = useState({
    searchText: "",
    searchedColumn: "",
  });

  const dispatch = useDispatch();

  const client = useSelector((state) => state.ClientReducer);


  useEffect(() => {
    dispatch(clientList())
  }, [])

  const searchInput = useRef();

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {

      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setfilter({
      ...filter,
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setfilter({ ...filter, searchText: "" });
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput.current = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setfilter({
                ...filter,
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      filter.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[filter.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  console.log(searchInput);
  const columns = [
    {
      title: "Client Name",
      dataIndex: "client_name",
      key: "client_name",
      width: "30%",
      ...getColumnSearchProps("client_name"),
    },
    {
      title: "client Email",
      dataIndex: "client_email",
      key: "client_email",
      width: "20%",
      ...getColumnSearchProps("client_email"),
    },
    {
      title: "Action",
      render: () => (
        <div>
          <IconButton onClick={() => console.log("edit")}>
            {" "}
            <EditIcon />
          </IconButton>

          <IconButton onClick={() => console.log("delete")}>
            {" "}
            <DeleteIcon />
          </IconButton>
        </div>
      )
    },
  ];
  return (
    <div className="tab">
      <Table
        style={{ maxHeight: "100px" }}
        columns={columns}
        dataSource={client&&client.clients }
        rowSelection={{
          ...rowSelection,
        }}
        pagination={false}
        scroll={{ y: "350px" }}
        size="middle"
        loading={client&&client.clients&& client.clients.length>0?false:true}
      />
    </div>
  );
};

export default Test;

// export default class Test extends React.Component {
//   state = {
// searchText: '',
// searchedColumn: '',
//   };

// getColumnSearchProps = dataIndex => ({
//   filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
//     <div style={{ padding: 8 }}>
//       <Input
//         ref={node => {
//           this.searchInput = node;
//         }}
//         placeholder={`Search ${dataIndex}`}
//         value={selectedKeys[0]}
//         onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//         onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
//         style={{ marginBottom: 8, display: 'block' }}
//       />
//       <Space>
//         <Button
//           type="primary"
//           onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
//           icon={<SearchOutlined />}
//           size="small"
//           style={{ width: 90 }}
//         >
//           Search
//         </Button>
//         <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
//           Reset
//         </Button>
//         <Button
//           type="link"
//           size="small"
//           onClick={() => {
//             confirm({ closeDropdown: false });
//             this.setState({
//               searchText: selectedKeys[0],
//               searchedColumn: dataIndex,
//             });
//           }}
//         >
//           Filter
//         </Button>
//       </Space>
//     </div>
//   ),
//   filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
//   onFilter: (value, record) =>
//     record[dataIndex]
//       ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
//       : '',
//   onFilterDropdownVisibleChange: visible => {
//     if (visible) {
//       setTimeout(() => this.searchInput.select(), 100);
//     }
//   },
//   render: text =>
//     this.state.searchedColumn === dataIndex ? (
//       <Highlighter
//         highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
//         searchWords={[this.state.searchText]}
//         autoEscape
//         textToHighlight={text ? text.toString() : ''}
//       />
//     ) : (
//       text
//     ),
// });

// handleSearch = (selectedKeys, confirm, dataIndex) => {
//   confirm();
//   this.setState({
//     searchText: selectedKeys[0],
//     searchedColumn: dataIndex,
//   });
// };

// handleReset = clearFilters => {
//   clearFilters();
//   this.setState({ searchText: '' });
// };

//   render() {
// const columns = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     key: 'name',
//     width: '30%',
//     ...this.getColumnSearchProps('name'),
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//     key: 'age',
//     width: '20%',
//     ...this.getColumnSearchProps('age'),
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//     key: 'address',
//     ...this.getColumnSearchProps('address'),
//     sorter: (a, b) => a.address.length - b.address.length,
//     sortDirections: ['descend', 'ascend'],
//   },
// ];
//     return <Table columns={columns} dataSource={data} />;
//   }
// }
