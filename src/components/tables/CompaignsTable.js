import React, { useState, forwardRef, useRef, useImperativeHandle,useEffect } from "react";
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

import { CompaignList } from '../../redux/actionCreators/compaignsAction'
import {editCampaign,deleteCampaign} from '../../redux/actionCreators/campaignsActions';
export  const CompaignsTable = () => {
    const [filter, setfilter] = useState({
        searchText: "",
        searchedColumn: "",
      });
      const [isModal, setIsModal] = useState(false)
      const [formData, setFormData] = React.useState({
        name: '',
       subject: '',
       content: '',
      })
      const [UserID, setUserID] = React.useState('')
      const [data, setData] = useState([])

      const dispatch = useDispatch();
  const { campaigns } = useSelector((state) => state.CampaignReducer)

  const openModal = (row) => {
    setFormData({ ...formData, name: row.name, subject: row.subject, content: row.content })
    setUserID(row.key)
    setIsModal(!isModal)
  }
  useEffect(() => {
    if(campaigns&&campaigns){
     let clientData= campaigns.map(e => {
        return {key : e.id,...e.data}
      })
      setData(clientData)
      
      console.log(clientData)
    }
  }, [campaigns])
  useEffect(() => {
    dispatch(CompaignList())
  }, [])
  const searchInput = useRef();

  const handleDelete =async (row) =>{
    await dispatch(deleteCampaign(row.key))
     
   }
   const toggle = () => {
    setIsModal(!isModal)
  }
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    dispatch(editCampaign({ id: UserID, data: formData }))
    toggle()
  }

  
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setfilter({
      ...filter,
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = async(clearFilters) => {
   await clearFilters();
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
          id="reset"
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
  const columns = [
    
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      width: "20%",
      ...getColumnSearchProps("subject"),
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      width: "30%",
      // ...getColumnSearchProps("content"),
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
        <div>
             <Table
        style={{ maxHeight: "100px" }}
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ y: "350px" }}
        size="middle"
        loading={data.length>0?false:true}
      />
      <Modal on={isModal} toggle={toggle}>
        {isModal && (
          <form onSubmit={(e) => onSubmit(e)}>
            {/* <span>Edit client</span> */}
            <label>Campaign Name:</label>
            <br />
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={(e) => onChange(e)}
            />
            <br />
            <label>Subject:</label>
            <br />
            <input
              type='text'
              name='subject'
              value={formData.subject}
              onChange={(e) => onChange(e)}
            />
            <br />
            <label>Content:</label>
            <br />
            <input
              type='text'
              name='content'
              value={formData.content}
              onChange={(e) => onChange(e)}
            />
            <br />
            <br />
            <button type='submit'>Submit</button>
          </form>
        )}
      </Modal>
        </div>
    )
}
