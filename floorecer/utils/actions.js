const MyIP = '192.168.1.40' //Change by your IP address

export const getCategories = async () => { 
    try {
      const response = await fetch(`http://${MyIP}:5000/business/getCategories`, {
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

export const getAllBusinesses = async (category) => {

  let type = 'getAllBusinesses'
  if(category != null) type = `getAllBusinessesByCategory/${category}`
  
  try {
    const response = await fetch(`http://${MyIP}:5000/business/${type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
     
    });
    const body = await response.json();
    console.log(body);
    return body
  } catch (err) {
    console.log(err)
  }


}