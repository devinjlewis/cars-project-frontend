import Axios from "./Axios";
function getUrl() {
    return process.env.NODE_ENV === "development"
        ? "http://localhost:3001"
        : "https://cars-backend-hu7s.onrender.com";
}
async function getAllCars() {
    try {
        let result = await Axios.get("/cars");
        return result;
    } catch (e) {
        alert(e.response.data.error);
        return;
    }
}
async function createCar(formInfo) {
    try {
        const formData = new FormData();
        const { make, model, year, chassis, horsepower, is_favorite, image } =
            formInfo;

        const updateFields = {
            make,
            model,
            year,
            chassis,
            horsepower,
            is_favorite,
            image,
        };
        for (const field in updateFields) {
            const value = updateFields[field];
            if (value !== null && value !== undefined) {
                console.log(value);
                formData.append(field, value);
            }
        }
        let result = await Axios.post("/cars", formData);
        console.log("Response: " + result.data);
        return result;
    } catch (e) {
        alert(e.response.data.error);
        return;
    }
}
async function getAllMakes() {
    try {
        let result = await Axios.get("/cars/makes");

        return result;
    } catch (e) {
        alert(e.response.data.error);
        return;
    }
}
async function getCarsByMake(id) {
    try {
        let result = await Axios.get(`/cars/makes/${id}`);
        return result;
    } catch (e) {
        alert(e.response.data.error);
        return;
    }
}
async function getCarById(id) {
    try {
        let result = await Axios.get(`/cars/${id}`);
        return result;
    } catch (e) {
        alert(e.response.data.error);
        return;
    }
}
async function updateCarById(id, formInfo) {
    try {
        const formData = new FormData();
        const { make, model, year, chassis, horsepower, is_favorite, image } =
            formInfo;
        const updateFields = {
            make,
            model,
            year,
            chassis,
            horsepower,
            is_favorite,
            image,
        };
        for (const field in updateFields) {
            const value = updateFields[field];
            if (value !== null && value !== undefined) {
                console.log(value);
                formData.append(field, value);
            }
        }
        let result = await Axios.put(`/cars/${id}`, formData);
        console.log("Response: " + result.data);
        return result;
    } catch (e) {
        alert(e.response.data.error);
        return;
    }
}
async function deleteCarById(id) {
    try {
        let result = await Axios.delete(`/cars/${id}`);

        return result;
    } catch (e) {
        alert(e.response.data.error);
        return;
    }
}
export {
    getAllCars,
    getCarById,
    getAllMakes,
    createCar,
    getUrl,
    getCarsByMake,
    deleteCarById,
    updateCarById,
};
