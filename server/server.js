const express  = require('express')
const app = express()

app.get("/api", (req, res) => {
    res.json({
        bakeries: [
            { id: 1, name: "Sweet Delights", description: "Best cupcakes in town!", reviews: ['Amazing!', 'So tasty!'] },
            { id: 2, name: "Baker's Paradise", description: "Fresh bread daily.", reviews: ['Lovely ambiance', 'Fantastic croissants'] },
            { id: 3, name: "Cookie Kingdom", description: "Delicious cookies for every occasion.", reviews: ['Perfect for parties!', 'Beautifully decorated'] }
        ]
    });
});


app.listen(5000, () => {console.log("Server started on port 5000")})