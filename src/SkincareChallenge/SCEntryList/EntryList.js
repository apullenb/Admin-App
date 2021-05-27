import React, {useState, useEffect} from 'react';
import "./EntryList.scss";
import PageWrapper from "../../GlobalComponents/PageWrapper";
import Entries from './Entries';
import config from "../../config/config";
import Pagination from "./Pagination";


const EntryList = (props) => {
    const [entries, setentries] = useState("");
    const [filter, setFilter] = useState("");

    const getEntries = async (perPage = 10, pageNo = 1) => {
        try{
            const requestOptions = {
                method:"GET",
            };
            const response = await fetch (
                `${config.CHALLANGE_API_URL}/api/challenge/all-entries?perPage=${perPage}&pageNo=${pageNo}&orderBy=entries.id`,
                requestOptions
            );
            const data = await response.json();
            setentries(data.data);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        getEntries();
    }, []);

    return (
        <div>
           <PageWrapper>
               <h1>Skincare Challenge Entries</h1>
               <section className="entry-table">
                   <table>
                       <tr> 
                           {/*
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
                                  Day 1 Photo
                                </option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                           </select>
                           </th>
                           <th id="filter">
                           <select id="filter">
                           <option
                               selected
                               value="Pictures"
                               onchange={(e) => handleChange(e, "pictures")} 
                               >
                                  Day 30 Photo
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
                           */}
                           <th id="filter">
                               <button className="add-entry-btn">New Entry</button>
                           </th>
                       </tr>
                       <tr>
                           <th className="head" >Entry ID</th>
                           <th className="head" >Entry Date</th>
                           <th className="head" >Ambassador ID</th>
                           <th className="head" >Name</th>
                           <th className="head" >Challenge</th>
                           <th className="head">Day 1 Photo</th>
                           <th className="head">Day 30 Photo</th>
                           <th className="head" >Featured</th>
                           <th className="head">Approved</th>
                           <th className="head">Actions</th>
                       </tr>
                        {entries &&
                        entries.length > 1 &&
                        entries.map((entry, i) => {
                            return <Entries key= {i} entries = {entry}/>;
                        })}
                   </table>
               </section>
               <Pagination getEntries={getEntries}/>
           </PageWrapper>
        </div>
    )
}

export default EntryList;
