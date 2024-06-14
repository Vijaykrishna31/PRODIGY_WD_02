import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './App.css';

function App() {

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps((prevLaps) => [...prevLaps, formatTime(time)]);
  };


  return (
    <section className='py-5 mh-100'>
      <Container className="py-3 mh-100 con col-8">
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <h1 className="text-center mb-4">Stopwatch</h1>
            <div className="display-1 text-center mb-4 text-white">{formatTime(time)}</div>
            <div className="d-flex justify-content-center mb-4">
              <Button variant="success" className="mx-1 font-weight-bold bt" onClick={handleStart} disabled={isRunning}>
                Start
              </Button>
              <Button variant="warning" style={{backgroundColor:"#ffbd03"}} className="mx-1 font-weight-bold bt" onClick={handlePause} disabled={!isRunning}>
                Pause
              </Button>
              <Button variant="danger" className="mx-1 font-weight-bold bt" onClick={handleReset}>
                Reset
              </Button>
              <Button variant="primary" className="mx-1 font-weight-bold bt" onClick={handleLap} disabled={!isRunning}>
                Lap
              </Button>
            </div>
            <div>
              <h3>Laps</h3>
              <ul className="list-group">
                {laps.map((lap, index) => (
                  <li key={index} className="list-group-item">
                    Lap {index + 1}: {lap}
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default App;
