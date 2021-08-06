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
import Modal from '../../common/Modal'


const Test = ({selected,setSelected,toast}) => {
  const [filter, setfilter] = useState({
    searchText: "",
    searchedColumn: "",
  });
  const [isModal, setIsModal] = useState(false)

  const [formData, setFormData] = useState({
    client_name: '',
    company_name: '',
    phone_number: '',
    client_email: '',
    customer_type: '',
  })
  const [UserID, setUserID] = useState('')

  const [data, setData] = useState([])

  const dispatch = useDispatch();

  const client = useSelector((state) => state.ClientReducer);
 
  const openModal = (row) => {
    setFormData({
      ...formData,
      client_name: row.client_name,
      company_name: row.company_name,
      phone_number: row.phone_number,
      client_email: row.client_email,
      customer_type: row.customer_type,
    })
    setUserID(row.key)
    setIsModal(!isModal)
  }

  useEffect(() => {
    if(client&&client.clients){
     let clientData= client.clients.map(e => {
        return {key : e.id,...e.data}
      })
      setData(clientData)
      // console.log(clientData)
    }
  }, [client])

  useEffect(() => {
    dispatch(clientList())
  }, [])

  const searchInput = useRef();

  const handleDelete = async (row) => {
    await dispatch(deleteClient(row.key))
    toast.error('Deleted Successfully')
  }

  const toggle = () => {
    setIsModal(!isModal)
  }
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    await dispatch(editClient({ id: UserID, data: formData }))
    toast.success('Edit Successfully')
    toggle()
  }


  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {


      setSelected(selectedRowKeys)
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
      title: "Name",
      dataIndex: "client_name",
      key: "client_name",
      width: "30%",
      ...getColumnSearchProps("client_name"),
    },
    {
      title: "Email",
      dataIndex: "client_email",
      key: "client_email",
      width: "20%",
      ...getColumnSearchProps("client_email"),
    },
    {
      title: "Company Name",
      dataIndex: "company_name",
      key: "company_name",
      width: "20%",
     // ...getColumnSearchProps("company_name"),
    },
    {
      title: "Customer Type",
      dataIndex: "customer_type",
      key: "customer_type",
      width: "30%",
      // ...getColumnSearchProps("customer_type"),
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
      width: "30%",
      // ...getColumnSearchProps("phone_number"),
    },
   
    {
      title: "Action",
      width: "20%",
      render: (text,record) => (
        <div>
          <IconButton onClick={() => openModal(record)}>
            {" "}
            <EditIcon />
          </IconButton>

          <IconButton onClick={() =>  handleDelete(record)}>
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
        dataSource={data}
        rowSelection={{
          ...rowSelection,
        }}
        pagination={false}
        scroll={{ y: "350px" }}
        size="middle"
        loading={data.length>0?false:true}
      />

<Modal on={isModal} toggle={toggle}>
        {isModal && (
          <form onSubmit={(e) => onSubmit(e)}>
            {/* <span>Edit client</span> */}
            <label>Client Name:</label>
            <br />
            <input
              type='text'
              name='client_name'
              value={formData.client_name}
              onChange={(e) => onChange(e)}
            />
            <br />
            <label>Company Name:</label>
            <br />
            <input
              type='text'
              name='company_name'
              value={formData.company_name}
              onChange={(e) => onChange(e)}
            />
            <br />
            <label>Phone Number:</label>
            <br />
            <input
              type='text'
              name='phone_number'
              value={formData.phone_number}
              onChange={(e) => onChange(e)}
            />
            <br />
            <label>Email:</label>
            <br />
            <input
              type='text'
              name='client_email'
              value={formData.client_email}
              onChange={(e) => onChange(e)}
            />
            <br />
            <label>Customer Type:</label>
            <br />
            <input
              type='text'
              name='customer_type'
              value={formData.customer_type}
              onChange={(e) => onChange(e)}
            />
            <br />
            <br />
            <button type='submit'>Submit</button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default Test;

