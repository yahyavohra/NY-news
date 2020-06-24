import React from "react";
import { Router } from "react-router-dom";
import { Container } from "reactstrap";
import { useAuth0 } from "../src/utils/auth0-spa";
import history from "./utils/history";

import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Content from "./components/content";

// styles
import "./App.css";

const App = () => {
    const { loading } = useAuth0();

    if (loading) {
        return <Loading />;
    }

    return (
        <Router history={history}>
            <div id="app" className="d-flex flex-column h-100 bg-light">
                <NavBar />
                <Container className="flex-grow-1  ">
                    <Content />
                </Container>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
