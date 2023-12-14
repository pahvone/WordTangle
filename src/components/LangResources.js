import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";

const LangResources = ({ _langPath }) => {
    const [langPath, setLangPath] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [resourceLinks, setResourceLinks] = useState(null);

    useEffect(() => {
        if (langPath === null) {
            setLangPath(_langPath);
        } else if (resourceLinks === null) {
            getResources();
            setLoaded(true);
        }
    }, [langPath, loaded, resourceLinks]);

    const getResources = () => {
        let data = "";
        let notFound = false;
        try {
            data = require("../vocab/" + langPath.lang + "_resources" + ".json");
        } catch (error) {
            if (error.code === "MODULE_NOT_FOUND") {
                console.error("Resource not found");
                notFound = true
            }
        }
        let links = [];

        if (notFound) {
            links.push(<div key="notfound">Unfortunately no resources have been added yet</div>)
        }
        else {
            for (var i = 0; i < data.resources.length; i++) {
                links.push(
                    <div key={i}>
                        <a href="/blank">{data.resources[i].name}</a>
                    </div>
                );
            }
        }

        setResourceLinks(links);
    };

    return (
        <div className="dashboardelements">
            <div className="greycontainer">
                {loaded ? (
                    <>
                        <div className="difficulty-title">Free {langPath.langDesc} resources</div>
                        <div className="dashline" />
                        <div>{resourceLinks}</div>
                    </>
                ) : (
                    <Spinner animation="border" role="status" />
                )}
            </div>
        </div>
    );
};

export default LangResources;
