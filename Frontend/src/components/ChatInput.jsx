import React, { useState } from 'react';
import { Form, InputGroup, Button, Container, Row, Col, Spinner, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Paperclip, Send, X } from 'react-feather';
import { AiOutlineFile } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ChatInput({ onSendMessage, onFileUpload }) {
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    setFileUploaded(false);
  };

  const handleRemoveFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return false;
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      setUploading(true);
      setUploadProgress(0);
      // const response = await axios.post('https://crusaders-llm.onrender.com/chat', formData, {
      const response = await axios.post('http://127.0.0.1:5000/chat', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          setUploadProgress(Math.round((loaded * 100) / total));
        },
      });
      setUploading(false);
      setUploadProgress(100);
      setFileUploaded(true);
      onFileUpload(files.map(f => f.name)); // Notify parent component of the uploaded files
      return response.data;
    } catch (error) {
      setUploading(false);
      setUploadProgress(0);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fileUploaded) {
      if (files.length > 0) {
        try {
          const uploadResponse = await handleUpload();
          if (uploadResponse) {
            toast.success(uploadResponse.message);
            setFiles([]);
            setUploadProgress(0);
          }
        } catch (error) {
          console.error('Error during file upload:', error);
          toast.error("File upload failed. Please try again.");
        }
      } else {
        toast.error("Please upload at least one file before chatting.");
      }
    } else if (message.trim()) {
      try {
        setIsSending(true);
        // const response = await axios.post('https://crusaders-llm.onrender.com/chat', {
        const response = await axios.post('http://127.0.0.1:5000/chat', {
          query: message
        });

        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          onSendMessage(message, response.data.response, response.data.references, response.data.graph);
          toast.success("Response received successfully");
        }
        setMessage('');
      } catch (error) {
        console.error('Error during message send:', error);
        toast.error("An error occurred while processing your request");
      } finally {
        setIsSending(false);
      }
    }
  };

  return (
    <Container fluid className="fixed-bottom py-3" style={{  }}>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          {!fileUploaded && (
            <ListGroup className="mb-2">
              {files.map((file, index) => (
                <ListGroupItem
                  key={index}
                  className="d-flex justify-content-between align-items-center
                  bg-gradient bg-info-subtle"
                >
                  <AiOutlineFile size={20} className="me-2" />
                  {file.name}
                  <X
                    size={14}
                    className="cursor-pointer"
                    onClick={() => handleRemoveFile(index)}
                  />
                </ListGroupItem>
              ))}
              {uploading && (
                <ListGroupItem className="d-flex justify-content-center align-items-center">
                  <Spinner animation="border" size="sm" />
                </ListGroupItem>
              )}
            </ListGroup>
          )}
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Form.Control
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={fileUploaded ? "Type your message..." : "Upload files to start chatting"}
                disabled={!fileUploaded || isSending}
              />
              <InputGroup.Text as="label" htmlFor="file-upload" className="cursor-pointer">
                <Paperclip size={20} />
              </InputGroup.Text>
              <Form.Control
                id="file-upload"
                type="file"
                multiple
                onChange={handleFileChange}
                className="d-none"
              />
              <Button
                style={{ backgroundColor: '#5276AA', borderWidth: '0px' }}
                type="submit"
                className="px-2"
                disabled={uploading || (!fileUploaded && files.length === 0) || isSending}
              >
                {uploading || isSending ? <Spinner animation="border" size="sm" /> : <Send size={20} />}
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ChatInput;