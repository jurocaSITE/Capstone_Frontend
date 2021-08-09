import "./Lists.css";
import React, { useEffect, useState } from "react";
import { ListCard, ListCardNoChange, NotAllowed } from "components";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import apiClient from "services/apiClient";
import { Link } from "react-router-dom";
import { useSearchForm } from "hooks/useSearchForm";
import { useAuthContext } from "contexts/auth";
import { alphaSort, dateSortOldest } from "utils/sort";

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
    fontSize: "1.5em",
  },
}));

function Lists() {
  const classes = useStyles();
  const { filteredData, handleFilter } = useSearchForm();
  const { user } = useAuthContext();
  //   const [lists, setLists] = useState([]);
  const [defaultLists, setDefaultLists] = useState([]);
  const [otherLists, setOtherLists] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [isSorting, setIsSorting] = useState(0);
  //   let defaultLists = [];
  //   let otherLists = [];
  // let copyLists = []

  useEffect(() => {
    const fetchListsByUserId = async () => {
      setIsFetching(true);
      try {
        const defaults = await apiClient.getDefaultListsByUserId();
        setDefaultLists(defaults.data.default_lists);

        const created = await apiClient.getCreatedListsByUserId();
        setOtherLists(created.data.created_lists);
      } catch (error) {
        setError(error);
      }

      setIsFetching(false);
    };

    fetchListsByUserId();
  }, []);

  //   const settingLists = () => {
  //     for (let i = 0; i < lists.length; i++) {
  //       if (lists[i].list_name === "Want To Read") {
  //         defaultLists.push(lists[i]);
  //       } else if (lists[i].list_name === "Currently Reading") {
  //         defaultLists.push(lists[i]);
  //       } else if (lists[i].list_name === "Did Not Finish") {
  //         defaultLists.push(lists[i]);
  //       } else if (lists[i].list_name === "Finished") {
  //         defaultLists.push(lists[i]);
  //       } else {
  //         otherLists.push(lists[i]);
  //         // copyLists.push(lists[i]);
  //       }
  //     }
  //   };

  //   settingLists();

  const handleOnFilter = (e) => {
    handleFilter(e, otherLists);
  };

  const handleSorting = (sortType) => {
    if (isSorting !== sortType) setIsSorting(sortType);
    else setIsSorting(0);
  };

  if (!user?.email) {
    return <NotAllowed />;
  }

  return (
    <div className="Lists">
      <div className="top">
        <h1 className="title">Library</h1>
      </div>

      <div className="default-lists">
        {defaultLists?.map((list) => (
          <ListCardNoChange key={list.id} list={list} className="list-card" />
        ))}
      </div>

      <div className="search-and-create">
        <div className="search">
          <div className="search-bar">
            <InputBase
              placeholder="Search In Lists by name..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              type="search"
              inputProps={{ "aria-label": "search" }}
              onChange={handleOnFilter}
              onFocus={()=>{setIsSorting(0)}}
            />
          </div>
        </div>

        <div className="create-new-list">
          <Link to={`/list/create-new`}>
            <h2 alt="Create New List Button">+</h2>
          </Link>
        </div>
      </div>

      <div className="filter-buttons">
        <button
          className={isSorting === 1 ? "active-sort" : ""}
          onClick={() => handleSorting(1)}
        >
          alphabetical
        </button>
        <button
          className={isSorting === 2 ? "active-sort" : ""}
          onClick={() => handleSorting(2)}
        >
          oldest
        </button>
      </div>

      {/* Uses CSS to hide when sorting or filtering to avoid mapping
          after every filter or sort
       */}
      <div
        className={
          Boolean(isSorting) || Boolean(filteredData)
            ? "hidden"
            : "display-lists-area"
        }
      >
        {otherLists?.map((list) => (
          <ListCard key={list.id} list={list} className="list-card" />
        ))}
      </div>

      <div
        className={
          Boolean(isSorting) || Boolean(filteredData)
            ? "display-lists-area"
            : "hidden"
        }
      >
        {!isSorting &&
          filteredData?.map((list) => (
            <ListCard key={list.id} list={list} className="list-card" />
          ))}

        {isSorting === 1
          ? alphaSort(otherLists)?.map((list) => (
              <ListCard key={list.id} list={list} className="list-card" />
            ))
          : null}

        {isSorting === 2
          ? dateSortOldest(otherLists)?.map((list) => (
              <ListCard key={list.id} list={list} className="list-card" />
            ))
          : null}
      </div>
    </div>
  );
}

export default Lists;
