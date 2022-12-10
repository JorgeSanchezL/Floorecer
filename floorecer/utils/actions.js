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
      return body.Categories;

    } catch (err) {
      Alert.alert(err)
    }
  }

export const getAllBusinesses = async ( category) => {

  let type = 'getAllBusinesses'
  if(category != null && category.length > 0) type = `getAllBusinessesByCategory/${category}`
  
  try {
    
    const response = await fetch(`http://192.168.1.143:5000/business/${type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
     
    });
    const body = await response.json();
    //
    return body
  } catch (err) {
    Alert.alert(err)
  }


}