import React from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';
import {Chart as ChartJS} from 'chart.js'
import {Chart,Line} from 'react-chartjs-2'
import logo from './logo.png'; // Update the path if needed
import {CategoryScale,LinearScale,PointElement,LineElement,Filler} from 'chart.js'; 
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Filler);

function ChatMessage({ message, isUser, timestamp, references, graph }) {
  function formatDateTime(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    const formattedTime = date.toLocaleTimeString(undefined, timeOptions);
    return { formattedDate, formattedTime };
  }

  const currentDateTime = new Date(timestamp);
  const { formattedDate, formattedTime } = formatDateTime(currentDateTime);

  return (
    <div className={`mb-3 ${isUser ? 'text-start' : 'text-start'}`} style={{ paddingLeft: '10%', paddingRight: '10%' }}>
      <Card
        className={`mb-2 ${isUser ? 'ms-auto' : 'me-auto'}`}
        style={{ width: 'fit-content', maxWidth: '75%', borderRadius: '0px', borderWidth: '0px',  backgroundColor: 'rgba(0,0,0,0)' }}
      >
        {!isUser && (
          <Row style={{ borderWidth: '0px' }}>
            <Col className="d-flex justify-content-between align-items-end mb-1">
              <Image src={logo} alt="Logo" style={{ height: '34px', margin: '0px', verticalAlign: 'text-bottom' }} />
              <small className={'text-white'} style={{ fontSize: '80%' }}>
                {formattedDate} {formattedTime}
              </small>
            </Col>
          </Row>
        )}
        {isUser && (
          <Row style={{ borderWidth: '0px' }}>
            <Col className='mb-1 bottom-0 start-0'>
              <small className={'inline text-white text-end'} style={{ fontSize: '80%' }}>
                {formattedDate} {formattedTime}
              </small>
            </Col>
          </Row>
        )}
        <Card.Body className={isUser ? 'text-white' : 'text-white'} style={{ backgroundColor: isUser ? '#5276AA' : '#20525B', borderRadius: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
          {message}
          {!isUser && references && references.length > 0 && (
            <div className="mt-2">
              {graph ?
  <div style={{ width: '100%'}}>
  <Line style={{backgroundColor:"white",width:"900px"}}
  
    data={{
      labels: graph["X axis"],
      datasets: [
        {
          label: "First dataset",
          data: graph["Y axis"],
          fill: true,
          
        },
      ],
    }}
    options={{
      scales: {
        y: {
          title: {
            display: true,
            color: "gray",
            align: "center",
            text: graph["label"][1]
          }
        },

        x: {
          title: {
            display: true,
            color: "gray",
            align: "center",
            text: graph["label"][0]
          }
        }
      }
    }}
  />
  </div> : ""

  
}

              <small>References:</small>
              <ul className="ps-3 mb-0">
                {references.map((ref, index) => (
                  <li key={index}>{ref}</li>
                ))}
              </ul>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default ChatMessage;