const url = "https://fakestoreapi.com/products";

export const getProducts = async () => {

    const response = await fetch(url);
    const data = await response.json();
    return data;
};

export const getProduct = async (id) => {
try{
    const response = await fetch(url + "/" + id);
    const data = await response.json();
    return data;}
    catch (error){
        throw new Error ("Algo salio mal");
    }
};

