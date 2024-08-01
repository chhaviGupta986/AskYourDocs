// import React, { useState } from 'react';
// import { Form, InputGroup, Button, Container, Row, Col, ProgressBar, Spinner, Badge, ListGroup, ListGroupItem } from 'react-bootstrap';
// import { Paperclip, Send, X } from 'react-feather';
// import { AiOutlineFile } from 'react-icons/ai';
// import axios from 'axios';

// function ChatInput({ onSendMessage }) {
//   const [message, setMessage] = useState('');
//   const [files, setFiles] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     setFiles(selectedFiles);
//   };

//   const handleRemoveFile = (index) => {
//     const newFiles = [...files];
//     newFiles.splice(index, 1);
//     setFiles(newFiles);
//   };

//   const handleUpload = async () => {
//     const formData = new FormData();
//     files.forEach((file) => {
//       formData.append('file', file);
//     });

//     try {
//       setUploading(true);
//       setUploadProgress(0);
//       const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         onUploadProgress: (progressEvent) => {
//           const { loaded, total } = progressEvent;
//           setUploadProgress(Math.round((loaded * 100) / total));
//         },
//       });
//       console.log('Upload successful:', response.data);
//       setUploading(false);
//       setUploadProgress(100);
//       return response.data;
//     } catch (error) {
//       setUploading(false);
//       setUploadProgress(0);
//       console.error('Upload failed:', error);
//       throw error;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (message.trim() || files.length > 0) {
//       try {
//         const uploadResponse = await handleUpload();
//         onSendMessage(message, uploadResponse, files);
//         setMessage('');
//         setFiles([]);
//         setUploadProgress(0);
//       } catch (error) {
//         console.error('Error during message send:', error);
//       }
//     }
//   };

//   return (
//     <Container fluid className="fixed-bottom py-3" style={{ backgroundColor: '#0A1930' }}>
//       <Row className="justify-content-center">
//         <Col xs={12} md={8} lg={6}>
//           {files.length > 0 && (
//             <ListGroup className="mb-2">
//               {files.map((file, index) => (
//                 <ListGroupItem
//                   key={index}
//                   className="d-flex justify-content-between align-items-center"
//                 >
//                   <AiOutlineFile size={20} className="me-2" />
//                   {file.name}
//                   <X
//                     size={14}
//                     className="cursor-pointer"
//                     onClick={() => handleRemoveFile(index)}
//                   />
//                 </ListGroupItem>
//               ))}
//               {uploading && (
//                 <ListGroupItem className="d-flex justify-content-center align-items-center">
//                   <Spinner animation="border" size="sm" />
//                 </ListGroupItem>
//               )}
//             </ListGroup>
//           )}
//           <Form onSubmit={handleSubmit}>
//             <InputGroup>
//               <Form.Control
//                 type="text"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Type your message..."
//               />
//               <InputGroup.Text as="label" htmlFor="file-upload" className="cursor-pointer">
//                 <Paperclip size={20} />
//               </InputGroup.Text>
//               <Form.Control
//                 id="file-upload"
//                 type="file"
//                 multiple
//                 onChange={handleFileChange}
//                 className="d-none"
//               />
//               <Button
//                 style={{ backgroundColor: '#5276AA', borderWidth: '0px' }}
//                 type="submit"
//                 className="px-2"
//                 disabled={uploading}
//               >
//                 {uploading ? <Spinner animation="border" size="sm" /> : <Send size={20} />}
//               </Button>
//             </InputGroup>
//             {uploading && <ProgressBar animated now={uploadProgress} className="mt-2" />}
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default ChatInput;

import React, { useState } from 'react';
import { Form, InputGroup, Button, Container, Row, Col, ProgressBar, Spinner, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Paperclip, Send, X } from 'react-feather';
import { AiOutlineFile } from 'react-icons/ai';
import axios from 'axios';

const PUBLIC_KEY='project_public_6a6a9f1adf13be71b26299cbd2583bd5_36Y1Efe178fc411c01fb981c40a75341c3e74';
const SECRET_KEY='secret_key_acb7d16bdd9c44ac1cec574e0379dae2_9B9uh4d48b62f2b58b46b2bdb40ccaf00c1f7'
function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  // Function to get a signed token
  const getSignedToken = async () => {
    try {
      const response = await axios.post('https://api.ilovepdf.com/v1/auth', {
        public_key: 'project_public_6a6a9f1adf13be71b26299cbd2583bd5_36Y1Efe178fc411c01fb981c40a75341c3e74',
      });
      console.log("signed_token=",response.data.token)
      return response.data.token;
    } catch (error) {
      console.error('Error getting signed token:', error);
      throw error;
    }
  };
  

  // Function to start the compression process
  const startCompression = async (signed_token) => {
    try {
      const response = await axios.get('https://api.iloveimg.com/v1/start/compress', {
        headers: {
          'Authorization': `Bearer ${signed_token} `
        },
      });
      console.log("startcompression:",response.data)
      return [response.data.server,response.data.task] // or any response indicating the task has started
    } catch (error) {
      console.error('Error starting compression:', error);
      throw error;
    }
  };

  // Function to upload the file
  const uploadFile = async (task, server, file,signed_token) => {
    console.log("uploading fiel :",file)
    const formData = new FormData();
    formData.append('file', file);
    // formData.append('server', server);
    formData.append('task', task);
    console.log('FormData contents:', formData.get('file'), formData.get('task'));

    // console.log('Server:', server);
    // console.log('Task:', task);
    // console.log('File:', file);
    // const payload = {
    //   task: task,
    //   // cloud_file: file // Replace fileUrl with the actual URL if uploading a file from the cloud
    // };
    try {
      const response = await axios.post(`https://${server}/v1/upload`,formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${signed_token} `
        }
      });
      console.log("AAAAAAAAA:",response.data.server_filename)
      return response.data.server_filename; // or any response indicating the upload was successful
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  // Function to process the compression and get the result
  const processCompression = async (server,task,server_filename,filename,signed_token) => {
    const payload = {
      task: task,
      tool: 'compress',
      files: [
        {
          server_filename: server_filename,
          filename: filename
        }
      ]
    };
    try {
      const response = await axios.post(`https://${server}/v1/process`,payload,{
        
        headers: {
          // 'Content-Type': 'multipart/form-data',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${signed_token} `
        }
      });
      console.log("RETURNING AFTER PROCESSING:",response.data)
      return response.data; // Retrieve the URL or location of the compressed file
    } catch (error) {
      console.error('Error processing compression:', error);
      throw error;
    }
  };
  const download = async (server,task,signed_token) => {
    try {
      const response = await axios.get(`https://${server}/v1/download/${task}`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${signed_token} `
        }
      });
      return response.data; // Retrieve the URL or location of the compressed file
    } catch (error) {
      console.error('Error downloading:', error);
      throw error;
    }
  };

  // Function to compress PDF if needed
  const compressPDF = async (file) => {


    try {
      const token = await getSignedToken();
      // getSignedToken();
      const start_response= await startCompression(token);
      console.log("lol=",start_response)
      // console.log("server=",server)
      // console.log("task=",task)
      // const server=start_response.server;
      const server=start_response[0];
      // const task=start_response.task;
      const task=start_response[1];
      const server_filename=await uploadFile(task,server, file,token);

      // Wait for the compression process to finish
      const filename=file.name
      console.log("FILENAME:::",filename)
      const result = await processCompression(server,task, server_filename,filename,token);
      console.log("result after processin:",result)
      // const download_res=await download(server,task,token)
      // Assuming the result contains a URL to download the compressed file
      // const compressedFileResponse = await axios.get(result.download_filename, { responseType: 'blob' });
      // console.log("compressedFileResponse",compressedFileResponse)
      // const compressedFile = new File([compressedFileResponse.data], file.name, { type: file.type });
      // console.log("compressedFile",compressedFile)
      const compressedFileResponse = await axios.get(result.download_filename, { responseType: 'blob' });
      console.log("compressedFileResponse", compressedFileResponse);

      const blob = new Blob([compressedFileResponse.data], { type: file.type });
      const compressedFile = new File([blob], file.name, { type: file.type });

      console.log("compressedFile", compressedFile);
      return compressedFile;
      // console.log("download_res=",download_res)
      // return download_res;
    } catch (error) {
      console.error('Error compressing file:', error);
      throw error;
    }
  };

  // Handle file upload and compression
  const handleUpload = async () => {
    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();

    for (let file of files) {
      console.log("FOR LOOOOOPPPPPP file:",file)
      if (file.type === 'application/pdf') {
        try {
          const compressedFile = await compressPDF(file);
          console.log(" uh compressed file type",compressedFile.type)
          formData.append('file', compressedFile);
          console.log("inside handle upload, compressedfile=",compressedFile)
          console.log("000 formdata=",formData.get('file'))
        } catch (error) {
          console.error('Compression failed:', error);
          setUploading(false);
          return;
        }
      } else {
        formData.append('file', file);
      }
    }

    try {
      console.log("111 formdata=",formData)
      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          setUploadProgress(Math.round((loaded * 100) / total));
        }
      });

      console.log('Upload successful:', response.data);
      setUploading(false);
      setUploadProgress(100);
      return response.data;
    } catch (error) {
      console.error('Upload failed:', error);
      setUploading(false);
      setUploadProgress(0);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() || files.length > 0) {
      try {
        const uploadResponse = await handleUpload();
        onSendMessage(message, uploadResponse, files);
        setMessage('');
        setFiles([]);
        setUploadProgress(0);
      } catch (error) {
        console.error('Error during message send:', error);
      }
    }
  };

  return (
    <Container fluid className="fixed-bottom py-3" style={{ backgroundColor: '#0A1930' }}>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          {files.length > 0 && (
            <ListGroup className="mb-2">
              {files.map((file, index) => (
                <ListGroupItem key={index} className="d-flex justify-content-between align-items-center">
                  <AiOutlineFile size={20} className="me-2" />
                  {file.name}
                  <X size={14} className="cursor-pointer" onClick={() => handleRemoveFile(index)} />
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
                placeholder="Type your message..."
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
                disabled={uploading}
              >
                {uploading ? <Spinner animation="border" size="sm" /> : <Send size={20} />}
              </Button>
            </InputGroup>
            {uploading && <ProgressBar animated now={uploadProgress} className="mt-2" />}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ChatInput;
