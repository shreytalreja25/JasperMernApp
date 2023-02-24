import React, { useState, useEffect } from "react";
import axios from "axios";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/reports")
      .then((response) => {
        setReports(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleReportClick = (report) => {
    setSelectedReport(report);
  };

  const handleDownloadClick = () => {
    if (selectedReport) {
      axios({
        url: `http://localhost:3001/api/reports/${selectedReport.id}/download`,
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${selectedReport.name}.pdf`);
        document.body.appendChild(link);
        link.click();
      });
    }
  };

  return (
    <div>
      <h2>Reports List</h2>
      <ul>
        {reports.map((report) => (
          <li key={report.id} onClick={() => handleReportClick(report)}>
            {report.name}
          </li>
        ))}
      </ul>
      {selectedReport && (
        <div>
          <h3>{selectedReport.name}</h3>
          <iframe
            title={selectedReport.name}
            src={`http://localhost:8081/jasperserver/flow.html?_flowId=viewReportFlow&reportUnit=${selectedReport.path}&standAlone=true&j_username=jasperadmin&j_password=jasperadmin`}
            width="100%"
            height="600px"
          ></iframe>
          <button onClick={handleDownloadClick}>Download PDF</button>
        </div>
      )}
    </div>
  );
};

export default Reports;
