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
  console.log('getAllBusiness')
  let type = 'getAllBusinesses'
  if(category != null && category.length > 0) type = `getAllBusinessesByCategory/${category}`
  
  try {
    
    const response = await fetch(`${BACKEND_URL}/business/${type}`, {
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

export const updateBusiness = async (uid, body) => {
  console.log(uid)
  console.log(body)
  try {
    const api_call = await fetch(`${BACKEND_URL}/business/updateBusiness`, {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  uid: uid,
                  body: body
              })
          });
          const response = await api_call.json();

          if (response.saved) {
            return true;
          } else { 
            return false; 
          }
  } catch (error) {
    console.log(err)
  }
}