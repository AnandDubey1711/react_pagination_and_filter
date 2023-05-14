import React from "react";
import './CardDetails.css'
const CardDetails=({first_name,last_name,gender,email,domain, avatar,id})=>{
 
  return (
 
    <div className="employee_id" key={id}>
    <div className="details">
    <div className="employee_name">
            <p>{first_name} {last_name}</p>
        </div>
        <div className="employee_image">
            <img className="employee_img" src={avatar} alt={avatar} />
        </div>
        <div className="work_details">
            <span>{gender}</span>
            <h2>{domain}</h2>
            <h3>{email}</h3>
        </div>
    </div>   
    </div>
       
    
  )
}
export default CardDetails;