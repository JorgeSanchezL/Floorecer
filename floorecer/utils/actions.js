import { BACKEND_URL } from '@env';


export const getCategories = async () => { 
    try {
      const response = await fetch(`${BACKEND_URL}/business/getCategories`, {
        method: 'GET',
          headers: {
          'Content-Type': 'application/json'
        },
      });
      const body = await response.json();
      //console.log(body.Categories);
      return body.Categories;

    } catch (err) {
      console.log(err)
    }
  }

export const getAllBusinesses = async ( category) => {

  let type = 'getAllBusinesses'
  if(category != null && category.length > 0) type = `getAllBusinessesByCategory/${category}`
  console.log(category)
  try {
    console.log(BACKEND_URL)
    const response = await fetch(`${BACKEND_URL}/business/${type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
     
    });
    const body = await response.json();
    //console.log(body);
    return body
  } catch (err) {
    console.log(err)
  }


}