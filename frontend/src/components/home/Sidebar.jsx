import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = [
    {
      title: "All tasks",
      icons: <CgNotes />,
      link: "/",
    },
    {
      title: "Important tasks",
      icons: <MdLabelImportant />,
      link: "/importantTasks",
    },
    {
      title: "Completed tasks",
      icons: <FaCheckDouble />,
      link: "/completeTasks",
    },
    {
      title: "Incomplete tasks",
      icons: <TbNotebookOff />,
      link: "/incompleteTasks",
    },
  ];

  const [Data, setData] = useState();
  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    navigate("/signup");
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v2/get-all-tasks",
        { headers }
      );
      setData(response.data.data);
    };
    fetch();
  });
  return (
    <>
      {Data && (
        <div>
          <h2 className="text-xl font-semibold">{Data.username}</h2>
          <h4 className="mb-1 text-gray-400">{Data.email}</h4>
          <hr />
        </div>
      )}
      <div>
        {data.map((items, i) => (
          <Link to={items.link} key={i} className="block">
            <div className="flex my-2 text-xl items-center hover:bg-gray-600 p-2 rounded transition-all duration-300">
              {items.icons} &nbsp; {items.title}
            </div>
          </Link>
        ))}
      </div>
      <div>
        <button className="bg-gray-600 w-full p-2 rounded" onClick={logout}>
          Log Out
        </button>
      </div>
    </>
  );
};

export default Sidebar;
