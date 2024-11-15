const express = require('express');
const app = express();

const bakeries = [
  { id: 1, name: 'Sweet Delights', description: 'Best cupcakes in town!', reviews: ['Amazing!', 'So tasty!'] },
  { id: 2, name: 'Baker\'s Paradise', description: 'Fresh bread daily.', reviews: ['Lovely ambiance', 'Fantastic croissants'] },
  { id: 3, name: 'Cookie Kingdom', description: 'Delicious cookies for every occasion.', reviews: ['Perfect for parties!', 'Beautifully decorated'] }
];

app.get('/api', (req, res) => {
  const searchQuery = req.query.search || '';
  const filteredBakeries = bakeries.filter((bakery) =>
    bakery.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bakery.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  res.json({ bakeries: filteredBakeries });
});

app.listen(5000, () => { console.log("Server started on port 5000"); });
