const Artist = require("../models/artist");

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
  const ageCriteria = criteria.age
    ? { age: { $gt: criteria.age.min, $lt: criteria.age.max } }
    : {};

  const yaCriteria = criteria.yearsActive
    ? {
        yearsActive: {
          $gt: criteria.yearsActive.min,
          $lt: criteria.yearsActive.max
        }
      }
    : {};
  const nameCriteria =
    criteria.name && criteria.name.length > 0
      ? { $text: { $search: criteria.name } }
      : {};

  const newCrits = {
    ...ageCriteria,
    ...yaCriteria,
    ...nameCriteria
  };
  console.log(newCrits);

  const query = Artist.find(newCrits)
    .sort({ [sortProperty]: 1 })
    .skip(offset)
    .limit(limit);

  return Promise.all([query, Artist.find(newCrits).count()]).then(results => {
    return { all: results[0], count: results[1], offset, limit };
  });
};
