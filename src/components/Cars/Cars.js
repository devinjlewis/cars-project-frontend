import React from "react";
import { useState, useEffect } from "react";
import { getCarsByMake, getUrl } from "../Api/Api";
import { useParams, Link } from "react-router-dom";
import Loader from "../Loader/Loader";
function Cars() {
    const { id } = useParams();
    const [carData, setCarData] = useState([]);

    const url = getUrl();
    useEffect(() => {
        async function fetchCar() {
            try {
                let res = await getCarsByMake(id);
                let data = res.data;
                setCarData(data);
            } catch (e) {
                console.log(e);
            }
        }

        fetchCar();
    }, [id]);
    if (!carData.length) {
        return <Loader />;
    }
    return (
        <>
            {" "}
            <div className="col-md">
                <div className="row justify-content-center">
                    {carData &&
                        carData.map((car) => (
                            <div className="col-md-3 m-3" key={car.id}>
                                <div
                                    className="card custom-card"
                                    style={{ width: "18rem" }}
                                >
                                    <div className="card-body">
                                        <blockquote className="blockquote blockquote-custom bg-white p-5 shadow rounded">
                                            <div className="blockquote-custom-icon bg-info shadow-sm"></div>
                                            <h4 className="card-title">
                                                {car.year} {car.make_name}{" "}
                                                {car.model}
                                            </h4>
                                            <p className="mb-0 mt-2">
                                                <Link
                                                    to={`/cars/${car.id}`}
                                                    className="btn d-flex justify-content-center"
                                                >
                                                    {" "}
                                                    <img
                                                        src={`${url}/images/${car.image}`}
                                                        width={200}
                                                        alt={car.name}
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

export default Cars;
