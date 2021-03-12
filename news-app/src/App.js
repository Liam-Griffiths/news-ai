import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import { Button } from "react-bootstrap";
import Async from 'react-async';

const loadHeadlines = () =>
    fetch("https://w52orr4jkl.execute-api.eu-west-2.amazonaws.com/develop/headlines")
        .then(res => (res.ok ? res : Promise.reject(res)))
        .then(res => res.json())

function App() {

    return (
        <div className="App">
            <div class="container-fluid">
                <div class="row">
                    <div class="jumbotron jumbotron-fluid jumbotron1">
                        <div class="container-fluid text-center">
                            <strong>
                                <h1 class="display-6 sup">The Happening Post</h1>
                            </strong>
                        </div>
                    </div>
                </div>
                <div class="row row1">
                    <h1 class="display-4 title1">
                    <Async promiseFn={loadHeadlines}>
                    <Async.Loading>Loading...</Async.Loading>
                <Async.Fulfilled>
                {data => {

                    return (
                        <>
                        <a href={data.lead.link} target="_blank" rel="noreferrer">
                            {data.lead.text}
                        </a>
            <div class="row row2">
            <ul class="list-group list-group-flush text-center">
        {data.headlines.map(hl=> (
            <li class="list-group-item">                        <a href={hl.link} target="_blank" rel="noreferrer">
            {hl.text}
            </a></li>
        ))}
    </ul>
        </div>
</>

                    )

    }}
</Async.Fulfilled>
    <Async.Rejected>
    {error => `Something went wrong: ${error.message}`}
</Async.Rejected>
    </Async>
                    </h1>
                </div>
    <div class="row">
        <div class="text-center small-text">
        <p>AI Generated Headlines - Liam Griffiths</p>
        </div>
    </div>
            </div>
        </div>
    );
}

export default App;