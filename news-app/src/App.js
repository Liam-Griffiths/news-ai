import React,{useState} from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import { Button } from "react-bootstrap";

function App() {

    const [data,setData]=useState({
        news:{
            lead:{
                text:"...",
                link:"..."
            }
        },
    });

    fetch('https://w52orr4jkl.execute-api.eu-west-2.amazonaws.com/develop/headlines')
        .then(response => response.json())
        .then(data => {
            setData({ news: data })
        });

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
                        <a href={data.news.lead.link} target="_blank" rel="noreferrer">
                            {data.news.lead.text}
                        </a>
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default App;