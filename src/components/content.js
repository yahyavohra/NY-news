import React, { useEffect, useState, Fragment } from "react";
import { Row, Col ,Button } from "reactstrap";
import { useAuth0 } from "../utils/auth0-spa";

import logo from "../assets/abc.svg";
import loading from "../assets/loading.svg";
function Content(props) {
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const [isLoading, SetIsloading] = useState(false);
    const [apiData, SetApiData] = useState([]);

    var myHeaders = new Headers();
    myHeaders.append("Cookie", "ccsid=773-9140725-5093823; locale=en");
    
    useEffect(() => {
       
            fetch("svc/topstories/v2/arts.json?api-key=kBm3QSp2gCi5yjR4FnVcAzqfivf056Tt")
            .then((response) => response.text())
            .then((result) => {
                SetApiData(JSON.parse(result).results);
                SetIsloading(false);
            })
            .catch((error) => console.log("error", error));
        
    }, [SetApiData]);

    const myproducts = apiData.map((item, index) => (
        <Col key={index} sm={6} xs={12} md={3} className="mb-4 ">
            <div className="card">
                <img alt={item.title} className="card-img-top" src={item.multimedia[3].url} style={{ width: "100%" }} />
                <div className="card-body">
                    <a className="card-link" target="blank" title={item.title} href={item.url}><h5 className="card-title">{item.title}</h5></a>
                    <p className="card-text truncate-overflow">{item.abstract}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <b className="text-capitalize">
                                {item.section} , {item.subsection}
                            </b>
                        </div>
                        <small className="text-muted">
                            {(function (props) {
                                var todayTime = new Date(props);
                                var month = todayTime.getMonth() + 1;
                                var day = todayTime.getDate();
                                var year = todayTime.getFullYear();
                                return month + "/" + day + "/" + year;
                            })(item.published_date)}
                        </small>
                    </div>
                </div>
            </div>
        </Col>
    ));
    return (
        <div className="album py-1 bg-light main-div">
            {isAuthenticated ? (
                <Fragment>
                    {isLoading && (
                        <div className="spinner">
                            <img src={loading} alt="Loading" />
                        </div>
                    )}
                    <h2 className="my-4">News</h2>
                    <Row>{myproducts}</Row>
                </Fragment>
            ) : (
                <div className="text-center my-5">
                    <img src={logo} alt="logo" style={{ maxWidth: "100px" }} />
                    <h4> Welcome to NYT NEWS</h4>
                    !Authentication Required Please 
                    <Button color="link" className="btn-margin view-btn" onClick={() => loginWithRedirect({})}>
                        Login
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Content;
