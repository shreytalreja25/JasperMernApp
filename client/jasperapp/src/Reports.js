import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsreport from 'jsreport-browser-client-dist';
// import { response } from 'express';
// import { report } from 'process';

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);

    useEffect(() =>{
        axios.get('/api/reports')
            .then(response => {
                setReports(response.data);
            })
            .catch(error =>{
                console.log(error);
            });
        },[]);
        const handleReportClick = (report) => {
            setSelectedReport(report);
            jsreport.render({
              template: {
                content: '<h1>Report</h1><iframe src="' + report.uri + '"></iframe>'
              },
              options: {
                preview: true,
                pdf: true
              }
            })
            .then((response) => {
              window.open(response.toDataURI());
            })
            .catch((error) => {
              console.log(error);
            });
          }

          return(
            <div>
                <h1>Reports</h1>
                <ul>
                    {reports.map
                    ((report,index) => (
                        <li key={index} onClick={() => handleReportClick(report)}>
                            {report.label}
                        </li>
                    ))}
                </ul>
                {selectedReport && (
                    <div>
                    <h2>{selectedReport.label}</h2>
                    <iframe title='report' src={selectedReport.uri} style={{ width: '100%', height: '600px' }}></iframe>
                    <button onClick={() => handleReportClick(selectedReport)}>Download PDF</button>
                  </div>
                )}                    
            </div>
          );
    }

