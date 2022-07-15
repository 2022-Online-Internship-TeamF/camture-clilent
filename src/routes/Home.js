import React, { useState } from "react";
import Header from "../components/Header"
import Popup from '../components/Popup'
import Listdisease from "../components/Listdisease"
import styled from "styled-components";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from '@mui/material/Container';
import axios from 'axios'
import Defaultimage from "../images/Default.png";


const Wrapper = styled.div`
  height: auto;
  width: 70%;
  margin:0 auto;
  border-radius: 0px;
  margin-bottom : 50px;
`;

export default function Home() { 
  const [popup, setPopup] = useState({open: false, title: "", message: "", callback: false});
  const [fileImage, setFileImage] = useState(Defaultimage);
  const navigate = useNavigate();

  const saveFileImage  = (event) => {
    setFileImage(URL.createObjectURL(event.target.files[0]));
    const file = event.target.files[0];
    console.log(file);
  };

  const deleteFileImage = (event) => {
    URL.revokeObjectURL(fileImage);
    setFileImage(Defaultimage);
  };

  const onTransmit = (event) => {
    event.preventDefault();

    console.log(fileImage);

    if(fileImage === Defaultimage){
      setPopup({open: true, title: "에러!", message: "사진을 넣어 주세요!"});
    }
    else {
      postData();
    }
  }

  const postData = async () => {
    const postUrl = "http://localhost:8000/auth/login";
    const postValue = {
      img: fileImage,
    }
    // console.log(postVal);
    await axios.post(postUrl, postValue)
    .then((response) => {
        if (response.data.status === "fail") {
            alert(response.data.message);
        }
        else if (response.data.status === "success"){
            localStorage.clear();
            alert(response.data.message);
            navigate("/Judgment",{replace:true});
        }
    });
  }

    return (
      <div>
          <Popup open = {popup.open} setPopup = {setPopup} title = {popup.title} message = {popup.message} callback = {popup.callback}/>

          <Header />
          <br /><br /><br /><br /><br />
          <Wrapper>
          <Container maxWidth={"xl"}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Listdisease/>
              </Grid>

              <Grid item xs={6} >
                <Form.Group controlId="formFileLg" className="mb-3">
                  <Form.Label style={{fontSize: "30px"}}>진단받고 싶은 사진을 선택하세요</Form.Label>
                  <Grid container spacing={2}>
                    <Grid item xs={9} >
                      <Form.Control type="file" size="lg" name="img" accept="image/*" onChange={saveFileImage}/>
                    </Grid>   
                    <Grid item xs={3} >
                      <Button
                        style={{fontSize: "20px", textTransform: "none", padding: "10px 20px" }}
                        variant="secondary" 
                        onClick={() => deleteFileImage()}>
                        삭제
                      </Button>
                    </Grid>     
                  </Grid>
                </Form.Group>
                <Box width="100%" height="80%" >
                  <img className="diseaseImage" alt="diseaseImage" src={fileImage} width="100%" height="100%"/>    
                </Box>                          
                <br/><br/>
                
                <Grid item xs={12} align='center'>
                  <Button 
                    style={{fontSize: "20px", textTransform: "none", padding: "20px 40px" }} 
                    variant="success"
                    onClick={onTransmit}>
                    진단하기
                  </Button>     
                </Grid>         

                {/* 여기부터 */}           
                <Grid item xs={12} align='center'>    
                  <br/><br/>
                  <Link to="/Judgment" style={{ textDecoration: 'none' }}>
                    <Button 
                    style={{fontSize: "20px", textTransform: "none", padding: "20px 40px" }} 
                    variant="success">
                      진단하기로 가기 
                    </Button>
                  </Link>
                </Grid>
                {/* 여기까지 나중에 삭제 */}  
                
              </Grid>
            </Grid> 
          </Container>
          </Wrapper>
          <>
          </>
      </div>
    );
  }
  