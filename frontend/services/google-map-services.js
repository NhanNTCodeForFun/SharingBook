export const getDistanceBetween = async (origin, destination) => {
  // const API_KEY = 'AIzaSyB5GtsjuPhTbD2UXzYDR5GoQLL0K4VYXmI';
  // const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&departure_time=now&key=${API_KEY}`;
  const url = 'https://jsonplaceholder.typicode.com/todos';
  let result = '123 km';
  await fetch(url)
    .then(response => response.json())
    .then(data => {
      result = '123 km';
    })
    .catch(error => console.error(error));
  return result;
};
