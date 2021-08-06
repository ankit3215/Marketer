import React, { useEffect, useRef, useState } from "react";
import "antd/dist/antd.css";
import "../../index.css";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

const HistoryTable = ({ data }) => {
  const [filter, setfilter] = useState({
    searchText: "",
    searchedColumn: "",
  });
  const [loading, setloading] = useState(true)

  useEffect(() => {
      if(data.length > 0){
          setloading(false)
      }
      setTimeout(() => {
        setloading(false)
      }, 1500);
  }, [data])
  const searchInput = useRef();

  const handleReset = async (clearFilters) => {
    await clearFilters();
    setfilter({ ...filter, searchText: "" });
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setfilter({
      ...filter,
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
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
      title: " Client Name",
      dataIndex: "clientName",
      key: "clientName",
      width: "30%",
      ...getColumnSearchProps("clientName"),
    },
    {
      title: " Client Email",
      dataIndex: "clientEmail",
      key: "clientEmail",
      width: "30%",
      ...getColumnSearchProps("clientEmail"),
    },
    {
      title: " Campaign Name",
      dataIndex: "campaignName",
      key: "campaignName",
      width: "30%",
      ...getColumnSearchProps("campaignName"),
    },
    {
      title: " Client Subject",
      dataIndex: "campaignSubject",
      key: "campaignSubject",
      width: "30%",
      // ...getColumnSearchProps("campaignSubject"),
    },
    {
      title: "Send On",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "30%",
      render : (text) => (
          <span>{text.toDate().toLocaleString()}</span>
      )
      // ...getColumnSearchProps("campaignSubject"),
    },
  ];
  console.log(data);
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ y: "350px" }}
        size="middle"
        loading={loading }
      />
    </div>
  );
};

HistoryTable.propTypes = {};

export default HistoryTable;
