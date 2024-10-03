const fs = require("fs")
// const http = require("http")
const express = require("express")

const app = express();

// middleware untuk membaca json dari reques body ke kita
app.use(express.json());

// default 
app.get("/", (req,res) => {
    res.status(200).json({
        "status" : "Success", 
        "message" : "application is running..."
    })
})

app.get("/hanif", (req, res) => {
    res.status(200).json({
        "message" : "Ping Successfully !!!"
    })
})

const cars = JSON.parse(fs.readFileSync(`${__dirname}/assets/data/cars.json`, "utf-8"));

// /api/v1/(collection) => collection harus jamak (+s)
app.get("/api/v1/cars", (req, res) => {

    res.status(200).json({
        status: "Succes",
        message : "Success get cars data",
        isSucces: true,
        totalData : cars.length,
        data : {cars}
    })
})

app.post("/api/v1/cars", (req, res) => {
    // insert into

    const newCar =  req.body;

    cars.push(newCar);

    fs.writeFileSync(`${__dirname}/assets/data/cars.json`, JSON.stringify(cars), (err) => {
        res.status(201).json({
            status: "Succes",
            message : "Success get cars data",
            isSucces: true,
            data : {
                cars : newCar,
            },
        });
    });

    res.status(200).json({
        status: "Succes",
        message : "Success get cars data",
        isSucces: true,
        data : cars
    })
})

app.get("/api/v1/cars/:id", (req, res) => {
    // select * from  fsw2 where id = "1" or name = "Hanif"
    const id = req.params.id * 1;
    console.log(id);

    const car = cars.find((i) => i.id === id);

    console.log(car);
    if (!car){
        return res.status(404).json({
            status: "Failed",
            message : `Failed get car data this: ${id}`,
            isSucces: false,
            data : null
        });
    }

    res.status(200).json({
        status: "Succes",
        message : "Success get car data",
        isSucces: true,
        data : {
            car,
        },
    });
})

// middleware / handler untuk url yang tidak dapat diakses karena memang tidak ada diaplikasi
// membuat middleware = our own middleware
app.use((req, res, next) => {
    res.status(404).json({
        "status" : "Failed",
        "message" : "API not exist !!!"
    })
})

app.listen("3000", () => {
    console.log("Start Aplication")
})
