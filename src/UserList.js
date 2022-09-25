import React, { useState, useEffect, useMemo, useCallback } from "react";
import SearchBar from "./Common/SearchBar";
import { Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import TableComponent from "./Common/TableComponent";
import api from "./apiClient";

const UserList = () => {
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState(false);
  const [finalUser, setFinalUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  //useeffect for search state
  useEffect(() => {
    if (!search) {
      setFinalUser(userData);
    }
  }, [userData, search]);

  useEffect(() => {
    users();
  }, []);

  //api call for list of users
  const users = () => {
    setLoading(true);
    const url = "/users";
    api
      .get(url)
      .then(function (response) {
        setUserData(response?.data);
        setLoading(false);
        console.log("ddsfsdfs", response);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
    };
    
    //redirect to repos
    const handleUserRepo = useCallback(
      (id) => {
        history.replace(`/repo/${id}`);
      },
      [history]
    );
    
  //table Column data
  const tableCol = useMemo(
    () => [
      {
        title: <span value="userName">Image</span>,
        render: (rowData) => (
          <Image
            onClick={() => handleUserRepo(rowData.login)}
            src={rowData.avatar_url}
            alt="img"
            width={30}
          ></Image>
        ),
      },
      {
        title: <span value="userName">User Name</span>,
        render: (rowData) => (
          <span onClick={() => handleUserRepo(rowData.login)}>
            {rowData.login || "-"}
          </span>
        ),
      },
      {
        title: <span value="userName">Url</span>,
        render: (rowData) => (
          <span onClick={() => handleUserRepo(rowData.login)}>
            {rowData.html_url || "-"}
          </span>
        ),
      },
    ],
    [handleUserRepo]
  );


  //search func
  const searchUser = (event) => {
    let newList = [];
    if (event.target.value !== "") {
      setSearch(true);

      newList =
        userData &&
        userData.length > 0 &&
        userData.filter(({ login }) => {
          const filterData = login.toLowerCase() || "";
          const filterDatas = event.target.value.toLowerCase().trim();
          return filterData.includes(filterDatas);
        });
      setFinalUser(newList);
    } else {
      setSearch(false);
      setFinalUser(userData);
    }
  };

  return (
    <div>
      <div className="d-flex d-flex justify-content-between mt-4">
        <h3>User List </h3>
        <SearchBar handleSearch={searchUser} placeHolder="Search User..." />
      </div>
      <TableComponent
        cols={tableCol}
        data={finalUser || []}
        isLoading={loading}
      />
    </div>
  );
};

export default UserList;
