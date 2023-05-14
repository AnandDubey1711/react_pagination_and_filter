/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useMemo } from "react";
import CardDetails from "../Cards_Details/CardDetails";
// import Pagination from '@material-ui/lab/Pagination';

import { Employees } from "../Data";
import "./Card.css";



const Card = () => {

// Pagination
const [currentPage, setCurrentPage] = useState(1);
const recordsPerPage = 30;
const lastIndex = currentPage * recordsPerPage;
const firstIndex = lastIndex - recordsPerPage;
const records = Employees.slice(firstIndex, lastIndex);

const npage = Math.ceil(Employees.length/ recordsPerPage);
const numbers = [...Array(npage+1).keys()].slice(1);
console.log(Employees.length);

  let s = new Set();

  // eslint-disable-next-line array-callback-return
  let employee_details = Employees.filter((d) => {
    if (!s.has(d.gender)) {
      s.add(d.gender);
      return d;
    }
  });
  const [employeeList, setEmployeeList] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState();
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }
  useEffect(() => {
    setEmployeeList(records);
  },[records]);

  function getFilteredData() {
    if (!selectedCategory) {
      return employeeList;
    }
    return employeeList.filter(
      (filteredGender) => filteredGender.gender === selectedCategory
    );
  }

  function getFilteredDomain() {
    if (!selectedCategory) {
      return employeeList;
    }
    return employeeList.filter(
      (filteredDomain) => filteredDomain.domain === selectedCategory
    );
  }
  function getFilteredName() {
    if (!selectedCategory) {
      return employeeList;
    }
    return employeeList.filter(
      (filteredName) => filteredName.first_name === selectedCategory
    );
  }

  var filteredGender = useMemo(getFilteredData, [
    selectedCategory,
    employeeList,
  ]);
  var filteredDomain = useMemo(getFilteredDomain, [
    selectedCategory,
    employeeList,
  ]);
  var filteredName = useMemo(getFilteredName, [selectedCategory, employeeList]);

  
  return (
    <div className="employee_mapping">
      <div className="select_container">
        <select onChange={handleCategoryChange}>
          <option value="" selected disabled hidden>
            Choose Gender here
          </option>
          {employee_details.map((option) => (
            <option>{option.gender}</option>
          ))}
        </select>

        <select onChange={handleCategoryChange}>
          <option value="" selected disabled hidden>
            Choose Domain here
          </option>
          {employee_details.map((option) => (
            <option defaultValue="Select a domain">{option.domain}</option>
          ))}
        </select>

        <select onChange={handleCategoryChange}>
          <option value="" selected disabled hidden>
            Choose FirstName here
          </option>
          {employee_details.map((option) => (
            <option>{option.first_name}</option>
          ))}
        </select>
      </div>

      {filteredGender.map((element, index) => (
        <CardDetails {...element} id={index} />
      ))}

      {filteredDomain.map((element, index) => (
        <CardDetails {...element} id={index} />
      ))}

      {filteredName.map((element, index) => (
        <CardDetails {...element} id={index} />
      ))}
      <div>
        <nav>
          <ul  className="pagination">
            <li className="page-Item">
              <a href="#" className="page-link" onClick={prePage}>Prev</a>
            </li>
            {
              numbers.map((n,i)=>(
                <li className={`page-item1 ${currentPage === n? 'active' : ''}`} key={i}>
                  <a href="#" className="page-link" onClick={()=>ChangeCPage(n)} >{n}</a>

                </li>
              ))
            }
            <li className="page-item">
              <a href="#" className="page-link" onClick={nextPage}>
                Next
              </a>
            </li>
           
          </ul>
          
        </nav>
        <h3 className="page-number">Page Number: {currentPage}</h3>
      </div>
    </div>
  );

  function nextPage(){
    if(currentPage!== lastIndex){ 
      setCurrentPage(currentPage+1);
    }
  }

  function prePage(){
    if(currentPage!== firstIndex){
      setCurrentPage(currentPage-1);
    }
  }

  function ChangeCPage(id){
    setCurrentPage(id);
  }
};

export default Card;
