import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllMakes, createCar } from "../Api/Api";

function NewCar() {
    const initialFormData = {
        make: "",
        model: "",
        year: "",
        chassis: "",
        horsepower: "",
        is_favorite: false,
        image: "",
    };
    const [formData, setFormData] = useState(initialFormData);
    const [makes, setMakes] = useState([]);
    const navigate = useNavigate();

    async function fetchMakes() {
        try {
            let res = await getAllMakes();
            setMakes(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchMakes();
    }, []);

    if (!makes.length) {
        return (
            <div className="loader-container">
                <div className="d-flex justify-content-center m-5 loader ">
                    Loading...
                </div>
            </div>
        );
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formData.image) {
            try {
                await createCar(formData);
                setFormData(initialFormData);
                alert(`Car has been added`);
                navigate(`/cars/makes/${formData.make}`);
            } catch (error) {
                return alert(error.response.data.error);
            }
        }

        // try {
        //     let newCar = await createCar(formData);
        //     if (newCar) {
        //         console.log(formData);
        //         setFormData(initialFormData);
        //         alert(`Car has been added`);
        //         navigate(`/cars/makes/${formData.make}`);
        //     }
        // } catch (e) {
        //     return alert(e.response.data.error);
        // }
    };
    console.log(formData);
    return (
        <div>
            <div className="container card my-5 mx-auto w-75">
                <h1 className="m-5 d-flex justify-content-center">Add Car</h1>
                <form className="m-5" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <h4 className="form-h4">
                            <label htmlFor="make">Make:</label>
                        </h4>
                        <div className="mb-4">
                            <select
                                id="make"
                                name="make"
                                className="form-select form-control"
                                value={formData.make}
                                onChange={(e) =>
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        [e.target.name]: e.target.value,
                                    }))
                                }
                            >
                                <option value="0">Select the Make</option>
                                {makes.map((make) => {
                                    return (
                                        <option value={make.id} key={make.id}>
                                            {make.make_name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>{" "}
                    <div className="mb-4">
                        <h4 className="form-h4">
                            {" "}
                            <label htmlFor="model">Model: </label>
                        </h4>
                        <input
                            id="model"
                            type="text"
                            name="model"
                            className="form-control"
                            value={formData.model}
                            onChange={(e) =>
                                setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                        />
                    </div>{" "}
                    <div className="mb-4">
                        <h4 className="form-h4">
                            <label htmlFor="year">Year:</label>
                        </h4>
                        <input
                            id="year"
                            type="text"
                            name="year"
                            className="form-control"
                            value={formData.year}
                            onChange={(e) =>
                                setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                        />
                    </div>{" "}
                    <div className="mb-4">
                        <h4 className="form-h4">
                            <label htmlFor="chassis">Chassis:</label>
                        </h4>
                        <input
                            id="chassis"
                            type="text"
                            name="chassis"
                            className="form-control"
                            value={formData.chassis}
                            onChange={(e) =>
                                setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                        />
                    </div>{" "}
                    <div className="mb-4">
                        <h4 className="form-h4">
                            <label htmlFor="horsepower">Horsepower:</label>
                        </h4>
                        <input
                            id="horsepower"
                            type="text"
                            name="horsepower"
                            className="form-control"
                            value={formData.horsepower}
                            onChange={(e) =>
                                setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                        />
                    </div>{" "}
                    <div className="mb-4">
                        <h4 className="form-h4 mx-2">
                            <label htmlFor="is_favorite">Is Favorite:</label>
                        </h4>

                        <input
                            id="is_favorite"
                            type="checkbox"
                            name="is_favorite"
                            className="form-check-input"
                            checked={formData.is_favorite}
                            onChange={(e) =>
                                setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    [e.target.name]: e.target.checked,
                                }))
                            }
                        />
                    </div>
                    <div className="mb-4">
                        <h4 className="form-h4 mx-2">
                            <label htmlFor="image">Image:</label>
                        </h4>

                        <input
                            id="image"
                            type="file"
                            name="image"
                            required
                            onChange={(e) =>
                                setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    [e.target.name]: e.target.files[0],
                                }))
                            }
                        />
                    </div>
                    <div className="button-container d-flex justify-content-center m-3 mb-5">
                        <button type="submit" className="btn btn-primary mx-3">
                            Submit
                        </button>

                        <button
                            className="btn btn-success mx-3"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(-1);
                            }}
                        >
                            Go Back
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewCar;
