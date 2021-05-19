import React from 'react';
import "./EntryList.scss";
import PageWrapper from "../../GlobalComponents/PageWrapper";

const EntryList = () => {

    const handleChange= (e,cat) => {

    }
    return (
        <div>
           <PageWrapper>
               <h1>Skincare Challenge Entries</h1>
               <section className="entry-table">
                   <table>
                       <tr>
                           <th id="filter">
                               <input 
                               type="text"
                               defaultValue="Entry ID"
                               onchange={(e) => handleChange(e,"id")}
                               />
                           </th>
                           <th id="filter">
                           <input 
                               type="text"
                               defaultValue="Upload Date"
                               onchange={(e) => handleChange(e,"id")}
                               />
                           </th>
                           <th id="filter">
                           <input 
                               type="text"
                               defaultValue="Ambassador ID"
                               onchange={(e) => handleChange(e,"id")}
                               />
                           </th>
                           <th id="filter">
                           <input 
                               type="text"
                               defaultValue="Name"
                               onchange={(e) => handleChange(e,"id")}
                               />
                           </th>
                           <th id="filter">
                           <select id="filter">
                               <option
                               selected
                               value="Challenge"
                               onchange={(e) => handleChange(e, "lastChallenge")} 
                               >
                                   Challenge
                                </option>
                                <option value="2020 Q3">2020 Q3</option>
                                <option value="2020 Q4">2020 Q3</option>
                                <option value="2021 Q1">2021 Q1</option>
                                <option value="2021 Q2">2021 Q2</option>
                                <option value="2021 Q3">2021 Q3</option>
                           </select>
                           </th>
                           <th id="filter">
                           <select id="filter">
                           <option
                               selected
                               value="Pictures"
                               onchange={(e) => handleChange(e, "pictures")} 
                               >
                                  Pictures
                                </option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                           </select>
                           </th>
                           <th id="filter">
                           <select id="filter">
                           <option
                               selected
                               value="Featured"
                               onchange={(e) => handleChange(e, "featured")} 
                               >
                                   Featured
                                </option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                           </select>
                           </th>
                           <th id="filter">
                           <select id="filter">
                           <option
                               selected
                               value="Approved"
                               onchange={(e) => handleChange(e, "approved")} 
                               >
                                   Approved
                                </option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                           </select>
                           </th>
                           <th id="filter">
                               <button className="add-entry-btn">New Entry</button>
                           </th>
                       </tr>
                   </table>
               </section>
           </PageWrapper>
        </div>
    )
}

export default EntryList
