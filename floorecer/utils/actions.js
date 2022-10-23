

export const getCategories = async () => { 
    try {
      const response = await fetch('http://192.168.1.39:5000/business/getCategories', {
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
