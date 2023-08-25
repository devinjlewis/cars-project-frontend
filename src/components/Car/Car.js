import React from "react";
import { useState, useEffect } from "react";
import { getCarById, getUrl, deleteCarById } from "../Api/Api";
import Loader from "../Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
function Car() {
    const { id } = useParams();
    const [carData, setCarData] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchCar() {
            try {
                let res = await getCarById(id);
                let data = res.data[0];
                data.image = `${getUrl()}/images/${data.image}`;
                setCarData(data);
            } catch (e) {
                console.log(e);
            }
        }

        fetchCar();
    }, [id]);
    const deleteCar = async () => {
        try {
            const confirmed = window.confirm(
                "Are you sure you want to delete this car?"
            );
            if (confirmed) {
                const response = await deleteCarById(id);
                let data = response.data;
                alert(
                    `The recipe named ${data.year} ${data.model} has been deleted`
                );
                navigate(`/cars/makes/${data.make}`);
            }
        } catch (error) {
            console.error("Error deleting recipe:", error);
        }
    };
    if (!carData) {
        return <Loader />;
    }
    return (
        carData && (
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <header className="text-center pb-5 pt-3">
                                <h1 className="h2 m-3">Car Details</h1>

                                <p>
                                    <img
                                        src={carData.image}
                                        alt={carData.make_name}
                                        width={200}
                                    />
                                </p>
                            </header>
                        </div>
                    </div>

                    <div className="row ">
                        <div className="col-lg-6 mx-auto ">
                            <blockquote className="shadow shadow-lg shadow-xl  blockquote blockquote-custom bg-white p-5 shadow rounded">
                                <div className="blockquote-custom-icon bg-info shadow-xl custom-shadow ">
                                    <i className="fa fa-quote-left text-white"></i>
                                </div>
                                {carData.is_favorite && (
                                    <p className="mb-0 mt-2 font-italic">
                                        <span className="fw-bold">⭐</span>
                                    </p>
                                )}
                                <p className="mb-0 mt-2 font-italic">
                                    <span className="fw-bold">Horsepower:</span>{" "}
                                    {carData.horsepower}
                                </p>
                                <p className="mb-0 mt-2 font-italic">
                                    <span className="fw-bold">Make:</span>{" "}
                                    {carData.make_name}
                                </p>
                                <p className="mb-0 mt-2 font-italic">
                                    <span className="fw-bold">Model:</span>{" "}
                                    {carData.model}
                                </p>
                                <p className="mb-0 mt-2 font-italic">
                                    <span className="fw-bold">Year:</span>{" "}
                                    {carData.year}
                                </p>
                                {carData.chassis && (
                                    <p className="mb-0 mt-2 font-italic">
                                        <span className="fw-bold">
                                            Chassis:
                                        </span>{" "}
                                        {carData.chassis}
                                    </p>
                                )}
                            </blockquote>
                        </div>
                    </div>
                    <div className="button-container d-flex justify-content-center">
                        <button
                            className="btn btn-primary m-3 mx-2"
                            onClick={() =>
                                navigate(`/cars/edit/${carData.id}/`)
                            }
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-danger m-3"
                            onClick={() => {
                                deleteCar();
                            }}
                        >
                            Delete
                        </button>
                        <button
                            className="btn btn-success m-3"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(-1);
                            }}
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </section>
        )
    );
}

export default Car;
