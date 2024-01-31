import React from "react";
import "../Css/Main.css";
import Slider from "./slider";
import Calendar from "../calender/calender";

import heightimg from './assests/height-bar.png'
import attention from"./assests/attention-icon.png"
import memory from "./assests/memory-icon 3.png";
import memfooter from "./assests/memory-down.png";
import reaction from "./assests/reaction-icon.png"
import reacfooter from "./assests/reaction-down.png"
import language from "./assests/language-icon.png"
import langfooter from "./assests/language-down.png"
import ps from"./assests/prob-solving-icon.png";
import psfooter from "./assests/ps-down.png"
import Sidebar from "./sidebar";

import reasoning from "./assests/reasoning-icon.png"
import resfooter from "./assests/reasoning-down.png"
import attenfooter from "./assests/attention-down.png"
function DashboardMain() {
  const d = new Date();
  let year = d.getFullYear();
  let date = d.getDate();
  let month = d.getMonth();
  const datename = new Date(year, month, date); // 2009-11-10
  const total =
    datename.toLocaleString("default", { month: "long" }) +
    String(" " + date + " ") +
    year;
  console.log(month);
  return (
    <div className="d-flex flex-row">
    <div className="back my-3 ms-3">
      <div className="d-flex flex-row m-0 gap-0">
      <Sidebar/>
    
      <div className="d-flex flex-col font1 mx-4   fw-bold">
        <div className="px-4 mt-4">Health Overview</div>
        <div className="px-4 font2 ">{total}</div>
    
      
      <div class="container  ">
        <div class="row row-cols-2 m-2 d-flex justify-content-center  align-items-center">
          <div class=" font3 box mt-5  mx-3">
            <div>
              <img className=" rounded-3 my-2  me-3" width="58px" src={memory}></img>
              Memory
            </div>
            
            <div className=" align-items-end ab">
              <img className=" footer " src={memfooter}></img>
            </div>
          </div>
          <div className=" box font3 mt-5 mx-3"> <div>
              <img className=" rounded-3 my-2  me-3" width="58px" src={reaction}></img>
              Reflex
            </div>
            
            <div className=" align-items-end">
              <img className=" footer " src={reacfooter}></img>
            </div></div>
            <div class=" font3 box mt-5  mx-3">
            <div>
              <img className=" rounded-3 my-2  me-3" width="58px" src={language}></img>
              Language
            </div>
            
            <div className=" align-items-end ab">
              <img className=" footer " src={langfooter}></img>
            </div>
          </div>
          <div className=" box font3 mt-5 mx-3"> <div>
              <img className=" rounded-3 my-2  me-3" width="58px" src={ps}></img>
              Problem-Solving
            </div>
            
            <div className=" align-items-end">
              <img className=" footer " src={psfooter}></img>
            </div></div>
            <div class=" font3 box mt-5 mx-3">
            <div>
              <img className=" rounded-3 my-2   me-3" width="58px" src={reasoning}></img>
              Reasoning
            </div>
            
            <div className=" align-items-end ab">
              <img className=" footer " src={resfooter}></img>
            </div>
          </div>
          <div className=" box font3 mt-5 mx-3 "> <div>
              <img className=" rounded-3 my-2  me-3" width="58px" src={attention}></img>
              Attention
            </div>
            
            <div className=" align-items-end">
              <img className=" footer " src={attenfooter}></img>
            </div></div>
        </div>

        </div>
        
      </div>

      </div>
    </div>
    <div className="back3 d-flex  flex-column ">
    <p className="bmitext d-flex align-items-center justify-content-center  px-5 mb-1 ">
  BMI calculator
</p>
      <div className="d-flex flex-row">

     

<div className="  ">
<div className="height d-flex m-3 align-content-center justify-content-center">
<h6 className="mt-5 ms-4">Height</h6>
<div className="d-flex flex-column align-items-center">
  <img src={heightimg} className="imgbar mt-3 mx-2 mb-2"></img>
  <h6 className="  me-3">
  170
</h6>
</div>
</div>
<div className="weight d-flex m-3 align-content-center justify-content-center">
<h6 className="mt-5 ms-4">Weight</h6>

<div className="d-flex flex-column align-items-center">
  <img src={heightimg} className="imgbar mt-3 mx-2 mb-2"></img>
  <h6 className="  me-3">
  72
</h6>
</div>

</div>
</div>
<div className="bmiback d-flex flex-column align-items-center  my-3 mx-0">
<h6 className="m-3 bmitext2">Body Mass Index (BMI)</h6>
<div>
  
</div>
<Slider value={26}/>

</div>

</div>
<div className="line mx-3">

</div>
<h1 className="   justify-content-center mt-3 d-flex">Calendar</h1>
<div className="d-flex justify-content-center ">


<Calendar/>
</div>
</div>

    </div>
  );
}

export default DashboardMain;
