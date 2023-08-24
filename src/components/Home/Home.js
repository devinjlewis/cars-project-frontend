import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMakes, getUrl } from "../Api/Api";
import Loader from "../Loader/Loader";
function Home() {
    const [makes, setMakes] = useState([]);
    const url = getUrl();
    const fetchData = async () => {
        const make = await getAllMakes();
        setMakes(make.data);
    };
    useEffect(() => {
        fetchData();
    }, []);

    if (!makes.length) {
        <Loader />;
    }

    return (
        <>
            <div className="col-md">
                <div className="row justify-content-center">
                    {makes &&
                        makes.map((make) => (
                            <div className="col-md-3 m-3" key={make.id}>
                                <div
                                    className="card custom-card"
                                    style={{ width: "18rem" }}
                                >
                                    <div className="card-body">
                                        <blockquote className="blockquote blockquote-custom bg-white p-5 shadow rounded">
                                            <div className="blockquote-custom-icon bg-info shadow-sm"></div>

                                            <p className="mb-0 mt-2">
                                                <Link
                                                    to={`/cars/makes/${make.id}`}
                                                    className="btn d-flex justify-content-center"
                                                >
                                                    {" "}
                                                    <img
                                                        src={`${url}/images/${make.make_image}`}
                                                        width={200}
                                                        alt={make.make_name}
                                                    />
                                                </Link>
                                            </p>
                                        </blockquote>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}

export default Home;
