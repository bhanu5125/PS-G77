import React from 'react'
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';

function Footer() {
  return (
    <div className='w-100 bg-primary position-absolute bottom' style={{background: 'linear-gradient(183deg, #67C3F3 -8.57%, #5A98F2 82.96%)', minHeight: '250px'}}>
        <div  className='d-flex flex-row justify-content-center ' style={{
            color: " #FFF",
            fontFamily: "Verela",
            fontSize: "28px",
            fontStyle: "normal",
            fontWeight: "300",
            lineHeight: "28px" /* 155.556% */,
          }}>
            <div className=" px-5 m-3 py-5  text-white col">
                <div className="m-2d-flex justify-content-evenly  row" >
                Name
                </div>
                <div className=" m-2 d-flex justify-content-evenly row">
                Column
                </div>
                <div className=" m-2 d-flex justify-content-evenly row">
                Column
                </div>
            </div>
        <div className=" px-5 m-3 py-5  text-white col">
            <div className="m-2d-flex justify-content-evenly  row">
            Name
            </div>
            <div className=" m-2 d-flex justify-content-evenly row">
            Column
            </div>
            <div className=" m-2 d-flex justify-content-evenly row">
            Column
            </div>
            
        </div>
        <div className=" px-5 m-3 py-5  text-white col">
            <div className="m-2d-flex justify-content-evenly  row">
            Name
            </div>
            <div className=" m-2 d-flex justify-content-evenly row">
            Column
            </div>
            <div className=" m-2 d-flex justify-content-evenly row">
            Column
            </div>
            
        </div>
        <div className=" px-5 m-3 py-5  text-white col">
            <div className="m-2d-flex justify-content-evenly  row">
            Name
            </div>
            <div className=" m-2 d-flex justify-content-evenly row">
            Column
            </div>
            <div className=" m-2 d-flex justify-content-evenly row">
            Column
            </div>
            
        </div>
    </div>
</div>

  )
}

export default Footer