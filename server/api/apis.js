const axios = require("axios").default;

//@GET cities lifestyle from teleport
const citiesApi = async (city) => {
    try {
      const res = await axios.get(
        `https://api.teleport.org/api/urban_areas/slug:${city.toLowerCase()}/scores/`
      );
      
      return res.data;
    } catch (err) {
      // return console.error(err);
      return
    }
  };
  
  //@GET users from github
  const usersApi = async (country, language) => {
    try {
      const res = await axios.get(
        `
    https://api.github.com/search/users?q=${encodeURIComponent(
      `location:${country} language:${language} repos:>1`
    )}&per_page=5`
      );
  
      return res.data.items;
    } catch (err) {
      return console.error(err);
    }
  };
  
  //@GET jobs from Adzuna
  const jobsApi = async (city, what) => {
    try {
      const res = await axios.get(
        `
        http://api.adzuna.com/v1/api/jobs/au/search/1?app_id=${adzuna.id}&app_key=${adzuna.key}&results_per_page=5&what=${what}&where=${city}}&content-type=application/json
        `
      );
  
      const modifiedData = res.data.results.map((job) => {
        return {
          ...job,
          category_tag: job.category.tag,
          category_label: job.category.label,
          company_name: job.company.display_name,
          job_location: job.location.display_name,
          created_formated: job.created.slice(0, 10),
        };
      });
  
      return modifiedData;
    } catch (err) {
      return console.error(err);
    }
  };
  
  module.exports = {
    citiesApi,
    jobsApi,
    usersApi,
  };