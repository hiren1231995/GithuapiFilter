import React, { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import SearchBar from "./Common/SearchBar";
import TableComponent from "./Common/TableComponent";
import api from "./apiClient";
import { Image } from "react-bootstrap";

const Repo = () => {
  const { id } = useParams();
  const [repoList, setRepoList] = useState([]);
  const [finalRepo, setFinalRepo] = useState([]);
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    users();
  }, []);

  //search func
  useEffect(() => {
    if (!search) {
      setFinalRepo(repoList);
    }
  }, [repoList]);

  //tbl column
  const tableCol = useMemo(
    () => [
      {
        title: <span value="Repo">Repositry Name</span>,
        render: (rowData) => (
          <span>
            <div className="">
              <b>{rowData.name || "-"} </b>
              <p>Description : {rowData?.description}</p>
              <div className="d-flex justify-content-between">
                <p>Language: {rowData?.language}</p>
                <p>owner: {rowData?.owner?.login}</p>
              </div>
            </div>
          </span>
        ),
        tableClassName: "cursor-pointer",
      },
    ],
    []
  );

  //api call for repos user wise
  const users = () => {
    setLoading(true);
    const url = `/users/${id}/repos`;
    api
      .get(url)
      .then(function (response) {
        setLoading(false);
        setRepoList(response?.data);
        console.log("ddsfsdfs", response);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };

  //search funnc
  const handleRepo = (event) => {
    let newList = [];
    if (event.target.value !== "") {
      setSearch(true);

      newList =
        repoList &&
        repoList.length > 0 &&
        repoList.filter(({ name }) => {
          const filterData = name.toLowerCase() || "";
          const filterDatas = event.target.value.toLowerCase().trim();
          return filterData.includes(filterDatas);
        });
      setFinalRepo(newList);
    } else {
      setSearch(false);
      setFinalRepo(repoList);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between mt-4">
        <div>
          <h3 className="flex-end">Repositry List </h3>
          <Link to="/">back to userList</Link>
        </div>
        <SearchBar
          handleSearch={handleRepo}
          placeHolder="Search Repo List..."
        />
      </div>
      <div className="d-flex">
        <div className="col-3 mt-4">
          <Image src={finalRepo[0]?.owner?.avatar_url} alt="user" width={200} />
          <h2 className="mt-4">{id}</h2>
        </div>
        <div className="col-9">
          <TableComponent
            cols={tableCol}
            data={finalRepo || []}
            isLoading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default Repo;
