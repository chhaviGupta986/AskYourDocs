import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import NavBar from './components/NewNavbar';
import Sidebar from './components/Sidebar';
import ChatInput from './components/ChatInput';
import ChatMessage from './components/ChatMessage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const defaultMessage = {
    text: "Please upload files to start conversation",
    isUser: false,
    timestamp: new Date().getTime(),
  };

  const [showSidebar, setShowSidebar] = React.useState(false);
  const [messages, setMessages] = React.useState(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? [defaultMessage, ...JSON.parse(savedMessages)] : [defaultMessage];
  });
  const [loading, setLoading] = React.useState(false);
  const [uploadedFileNames, setUploadedFileNames] = React.useState(() => {
    const savedFiles = localStorage.getItem('uploadedFiles');
    return savedFiles ? JSON.parse(savedFiles) : [];
  });
  const messagesEndRef = React.useRef(null);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const handleSendMessage = (message, response, references, graph_points) => {
    const newMessages = [
      ...messages,
      { text: message, isUser: true, timestamp: new Date().getTime() },
      { text: response, isUser: false, timestamp: new Date().getTime(), references, graph:graph_points }
    ];
    setMessages(newMessages);
    localStorage.setItem('chatMessages', JSON.stringify(newMessages.slice(1))); // Save all messages except the default one
  };

  const handleFileUpload = (fileNames) => {
    setUploadedFileNames(fileNames);
    localStorage.setItem('uploadedFiles', JSON.stringify(fileNames));
  };

  const handleNewChat = () => {
    setMessages([defaultMessage]);
    setUploadedFileNames([]);
    localStorage.removeItem('chatMessages');
    localStorage.removeItem('uploadedFiles');
  };

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div style={{ paddingTop: '56px', height: '100vh', display: 'flex', flexDirection: 'column', backgroundImage: 'linear-gradient(to right bottom, #0a1930, #0e203c, #132848, #182f54, #1d3761)'}}>
      <NavBar toggleSidebar={toggleSidebar} />
      <Sidebar show={showSidebar} handleClose={() => setShowSidebar(false)} />
      <Container fluid className=" overflow-auto">
        <Row className="h-100 ">
        
          <Col xs={12} className="d-flex flex-column ">

             <div className="p-2 mt-2" style={{ color: 'white' }}>
      <Row className="align-items-center d-flex justify-content-between ">
        <Col sm={12} md={'auto'} className='mb-2 mb-md-0 d-flex justify-content-center'>
          <Button variant="btn rounded-pill bg-gradient mt-0 fw-medium " 
          style={{backgroundColor:'#5276AA'}}
          onClick={handleNewChat}>
            New Chat
          </Button>
        </Col>
        <Col sm={12} md={'auto'}>
          {uploadedFileNames.length > 0 && (
            <div className="mb-0 p-2 px-3 bg-gradient 
            
            text-white rounded" style={{backgroundColor:'#20525B'}}>
              <strong>Uploaded Files:</strong> {uploadedFileNames.join(', ')}
            </div>
          )}
        </Col>
      </Row>
    </div>

            <div className="flex-grow-1 overflow-auto p-3" style={{ maxHeight: 'calc(100vh - 180px)', overflowY: 'scroll' }}>
              {messages.map((msg, index) => (
                <ChatMessage
                  key={index}
                  message={msg.text}
                  isUser={msg.isUser}
                  timestamp={msg.timestamp}
                  references={msg.references}
                  graph={msg.graph}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <ChatInput onSendMessage={handleSendMessage} onFileUpload={handleFileUpload} />
          </Col>
        </Row>
      </Container>
      <ToastContainer position='top-center' />
    </div>
  );
}

export default App;