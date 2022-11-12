import { database, storage } from '../../firebase.js';
import { doc, setDoc, collection, getDocs,
    getDoc, updateDoc, query, where } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import randomatic from 'randomatic';
import path from 'path';


export const newBusiness = async(req,res) => {
    const{
        owner,
        name,
        nif,
        address,
        location,
        openingHours,
        category
    } = req.body

    const file = req.file;

    const fileName = randomatic('Aa0', 32)
        + path.extname(file.originalname);

    const storageRef = ref(storage, fileName);

    uploadBytes(storageRef, file.buffer)
      .then(async (snapshot) => {
        await setDoc(doc(collection(database, "business")), {
            owner: owner,
            name: name,
            Address: address,
            NIF: nif,
            location: JSON.parse(location),
            openingHours: JSON.parse(openingHours),
            active: true,
            category: category,
            promoted: false,
            imageURL: snapshot.ref._location.path_
        });
    });
}

export const getAllBusinesses = async (req, res) => {
    const querySnapshot = await getDocs(collection(database, "business"));
    let body = []
    querySnapshot.forEach((doc) => {
      body.push(doc.data())
    });
    
    res.json(body)
}

export const getAllBusinessesByCategory = async (req, res) => {
    const {category} = req.params
    try {
        const b = collection(database, "business");
        let businesslist = [];
        //console.log(category.split(","))
        
        var promise = new Promise((resolve,reject)=>{
            category.split(',').forEach(async(cat, index, array) => {
                console.log(cat)
                const q = query(b, where("category", "==", cat));
                const businessquery = await getDocs(q);
            
                businessquery.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    businesslist.push(doc.data());
                });   

                if (index === array.length -1) resolve();

                
                
            });
        })
        /* category.split(',').forEach(async(cat) => {
            console.log(cat)
            const q = query(b, where("category", "==", cat));
            const businessquery = await getDocs(q);
        
            businessquery.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                businesslist.push(doc.data());
            });   
            console.log("hh " + businesslist)
        }); */
        
    
        promise.then(()=>{
            res.json( businesslist);
        })
        }
        catch (error) {
          console.log(error)
    
        }
}

export const getBusinesses = async(req,res) => {
    const owner = req.body.owner;
try {
    const b = collection(database, "business");

    const q = query(b, where("owner", "==", owner));
    const businessquery = await getDocs(q);
    console.log("holsa")


    let businesslist = [];
    businessquery.forEach((doc) => {
        let miarray = doc.data() ;
        miarray.uid = doc.id;

        businesslist.push(miarray );
      });   
      console.log("hh " + businesslist)

res.json(businesslist);
    }
    catch (error) {
      console.log(error)

    }
}

export const promoteBusiness = async (req,res) => {
    const uid=req.body.uid
    try {
        const docRef = doc(database, "business", uid);
      await updateDoc(docRef, { promoted: true});
    } catch(error) {
        console.log(error)
    }
    
}

export const getBusiness = async(req,res) => {
    console.log("get business")
    console.log(req.body)
    try {
        const docRef = doc(database, "business", "VWFVMwQ5Q2gxpRENlPbS");
        console.log(JSON.stringify(docRef))
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data());
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            res.json(docSnap.data())
        } else {
            console.log("No such document!");
            res.json(null)
        }
    } catch(error) {
        console.log(error)
    }
    
}

export const upgradePoints = async (req,res) => {
    const {uid , shopName,wonpoints }=req.body;
    
    try {
        console.log("hola")
        const docRef = doc(database, "users", uid);
        const user = await getDoc(docRef);
        const actualPoints = user.data().points;
        const Historico = user.data().Historico;
        let newUpdate = {
           shopName : shopName,
           points : wonpoints,

        }
         Historico.push (newUpdate);
        console.log(Historico)
      await updateDoc(docRef, { 
        points: actualPoints+wonpoints,
        Historico : Historico, 
    
    }
        
        );
        res.status (200);
        res.send();

    } catch(error) {
        console.log(error)
    }





}



export const updateBusiness = async (req, res) => {
    const { uid, body } = req.body;

    try {
        const docRef = doc(database, 'business', uid);
        await updateDoc(docRef, body);
        res.json({saved: true});
    } catch (e) { 
        res.status(500).json({saved: false});
    }
}
export const getCategories = async(req,res) => {
    const docSnap = await getDoc(doc(database, "Categories",'Categories'));
    res.json(docSnap.data())

}
