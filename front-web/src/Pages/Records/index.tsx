import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import { RecordResponse } from "./types";
import { formatDate } from "./Helpers";
import Pagination from "./Pagination";
import Filters from "../../Components/Filters";

const BASE_URL = "https://sds1-kaique.herokuapp.com";

const Records = () => {
  const [recordsResponse, setRecordsResponse] = useState<RecordResponse>();
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/records?linesPerPage=12&page=${activePage}`)
      .then((response) => setRecordsResponse(response.data));
  }, [activePage]);

  const handlePageChange = (index: number) => {
    setActivePage(index);
  };

  return (
    <div className="page-container">
      <Filters link="/charts" linkText="Ver Gráfico" />
      <table className="records-table" cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th>INSTANTE</th>
            <th>NOME</th>
            <th>IDADE</th>
            <th>PLATAFORMA</th>
            <th>GÊNERO</th>
            <th>TÍTULO DO GAME</th>
          </tr>
        </thead>
        <tbody>
          {recordsResponse?.content.map((record, key) => (
            <tr key={key}>
              <td>{formatDate(record.moment)}</td>
              <td>{record.name}</td>
              <td>{record.age}</td>
              <td className="text-secondary">{record.gamePlatform}</td>
              <td>{record.genreName}</td>
              <td className="text-primary">{record.gameTitle}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalPages={recordsResponse?.totalPages}
        activePage={activePage}
        goToPage={handlePageChange}
      />
    </div>
  );
};

export default Records;
