import Data from '../Model/authModel.js';

export const getData = async (req, res) => {
   try {
      const {
         end_year,
         topic,
         sector,
         region,
         pestle,
         source,
         country,
         city,
         intensity,
         likelihood,
         relevance,
         start_year,
         impact
      } = req.query;

      // Log the received query parameters
      console.log("Received Query Parameters:", req.query);

      // Construct the filters object dynamically based on provided query params
      const filters = {};

      if (end_year) filters.end_year = end_year;
      if (topic) filters.topic = topic;
      if (sector) filters.sector = sector;
      if (region) filters.region = region;
      if (pestle) filters.pestle = pestle;
      if (source) filters.source = source;
      if (country) filters.country = country;
      if (city) filters.city = city; // Only if city is defined in your schema
      if (intensity) filters.intensity = Number(intensity);
      if (likelihood) filters.likelihood = Number(likelihood);
      if (relevance) filters.relevance = Number(relevance);
      if (start_year) filters.start_year = start_year;
      if (impact) filters.impact = impact;

      console.log("Applied Filters:", filters); // Log filters to check what's being applied

      // Retrieve data based on applied filters
      const data = await Data.find(filters);
      console.log("Data Retrieved:", data); // Log the retrieved data

      res.json(data);
   } catch (error) {
      res.status(500).json({ message: 'Error fetching data', error });
   }
};
