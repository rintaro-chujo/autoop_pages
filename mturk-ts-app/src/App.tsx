import logo from './logo.svg';
import './App.css';
import Button from "@material-ui/core/Button";
import React, { useEffect, useState, useRef } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";


function App() {
  const [page_num, setPage_num] = React.useState<any>(1);
  const [api_status, setApi_status] = React.useState<any>(false);
  const [message, setMessage] = React.useState<any>([]);
  const [page_status, setPage_status] = React.useState<any>([]);
  const [pic_num, setPic_num] = React.useState<number>(0);
  const [user_id, setUser_id] = React.useState<any>("");
  const [form_type,setForm_type]= React.useState<number>(0);

  function set_user_id() {
    var textbox = document.getElementById("user_id") as HTMLInputElement;
    setUser_id(textbox.value);
    console.log(user_id)
  }

  function getParam(name:any) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return 0;
    if (!results[2]) return 0;
    return Number(decodeURIComponent(results[2].replace(/\+/g, " ")));
  };

  function next_pic(score:number) {
    send_data(user_id,message[pic_num][2],message[pic_num][3],score,form_type)
    if (pic_num<9){
      setPic_num(pic_num + 1)
    } else {
      setPage_num(3)
    }
  }

  function push_next() {
    set_user_id();
    setPage_num(page_num + 1);
  }

  function send_data(user_id: any, pic_a: any, pic_b: any, score: number, form_type:number) {
    var post_url = "https://script.google.com/macros/s/AKfycby4GPwHUYn0kkUSAmph1V0mdyRDx30pcslMc1iv7AaQcDN8KQ4xtdwjFDSXgB3I2hVcSA/exec";
    
    var SendDATA = {"user_id":user_id,"pic_a":pic_a,"pic_b":pic_b,"score":score,"form_type":form_type};
   console.log(user_id,score)
    var postparam: RequestInit = 
          {
            "method"     : "POST",
            "mode"       : "no-cors",
            "headers": { "Content-Type": "application/x-www-form-urlencoded" },
            "body" : JSON.stringify(SendDATA)
    };
  
    //var data = {message: "hello"};
    fetch(post_url,postparam)
    .then((res)=>{
      return( res.json() );
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  function get_pic() {
    const data = JSON.stringify({
      num: 10,
    });
    
    var url = "https://script.google.com/macros/s/AKfycby4GPwHUYn0kkUSAmph1V0mdyRDx30pcslMc1iv7AaQcDN8KQ4xtdwjFDSXgB3I2hVcSA/exec?num=10";
    //var data = {message: "hello"};
    fetch(url)
    .then((response) => response.json())
      .then((responseJson) => {
        setMessage(responseJson.data.message);
        setApi_status(true);
        console.log(responseJson.data.message)
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  function show_pic(a:any, b:any) {
    try {
      var return_pic:string = message[a][b];
    } catch(e) {
      var return_pic:string  = "https://rintaro-chujo.github.io/autoop_pages/mturk_0225/0.08_0.16_1.jpeg";
    }
    return return_pic
  }

  useEffect(() => {
    setForm_type(getParam('type'));
    get_pic()
  },[page_status]);
    
  return (
    <div className="App">
      <div
          //className={page_num === 1 ? "" : "hidden"}
          style={{ display: page_num === 1 ? "" :"none" }}
        >
      <h1>MTURK Forms</h1>
        <p>
        There are 10 questions in total.
        The results of the questionnaire may be used for research.
        </p>
        <p>
          If you have any questions, please contact us by Email.
          Rintaro Chujo
          the University of Tokyo
          rintaro-chujo [at] g.ecc.u-tokyo.ac.jp
        </p>
        <h2>Enter Your User ID</h2>
        <p>You need to enter it to get the reward.</p>
        <input type="text" id="user_id"></input>

        <div style={{
          display: api_status === true ? "" : "none",
          margin:20,
        }}>
          <Button
            variant="contained"
            color="primary"
            className=""
            onClick={push_next}>
              Next
          </Button>
        </div>
      </div>
      <div
          //className={page_num === 2 ? "" : "hidden"}
          style={{ display: page_num === 2 ? "" :"none" }}
      >
        <div style={{ display: form_type === 0 ? "" :"none" }}>
          <p>Which image looks more natural?</p>
        </div>
        <div style={{ display: form_type === 1 ? "" :"none" }}>
          <p>Which image looks more powerful?</p>
        </div>
        <div className="picboxContainer">
          <img src={show_pic(pic_num,0)} alt="" className="picbox" width="400px" onClick={() => next_pic(0)}/>
          <img src={show_pic(pic_num,1)} alt="" className="picbox" width="400px" onClick={() => next_pic(1)}/>
        </div>
      </div>
      <div
          //className={page_num === 2 ? "" : "hidden"}
          style={{ display: page_num === 3 ? "" :"none" }}
      >
        <p>Thank you for answering to all questions.</p>
        <p>Please enter the password below into mturk.</p>

        <p>AM5m1WejO9</p>
      </div>
    </div>
  );
}

export default App;
