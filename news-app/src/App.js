import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import { Button } from "react-bootstrap";

function App() {

    fetch('https://api.github.com/users/hacktivist123/repos')
        .then(response => response.json())
        .then(data => {
            console.log(data)
        });

    const headline = "TEST HEADLINE";

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
                    <h1 class="display-4 title1">{headline}</h1>
                </div>
            </div>
        </div>
    );
}

export default App;