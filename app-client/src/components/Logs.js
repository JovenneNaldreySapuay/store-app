import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchVisitors } from "../actions/visitor";

const Logs = ({ fetchVisitors }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const getVisitor = () => {
      fetchVisitors().then((response) => {
        // console.log(response);
        setLogs(response.data);
      });
    };

    getVisitor();
  }, [fetchVisitors]);

  return (
    <div className="text-center">
      <h1 className="uppercase py-5 font-semibold">Visitor Logs</h1>
      <ul className="pb-12">
        {logs.length > 0 ? (
          logs.map((v) => {
            return (
              <li key={v._id} className="text-red-500 mb-1">
                {v.ip} - {v.country} - {v.createdAt}
              </li>
            );
          })
        ) : (
          <div>No Logs...</div>
        )}
      </ul>
    </div>
  );
};

export default connect(null, { fetchVisitors })(Logs);
