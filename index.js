import { argv } from "process";

const fakestoreapiUrl = "https://fakestoreapi.com";

const GET = (resource, id = "") => {
    let url = `${fakestoreapiUrl}/${resource}/${id}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
};

const POST = (resource, title, price, category) => {
    const product = { title, price, category };
    fetch(`${fakestoreapiUrl}/${resource}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
};

const PUT = (resource, id, title, price, category) => {
    const product = { title, price, category };
    fetch(`${fakestoreapiUrl}/${resource}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
};

const DELETE = (resource, id) => {
    fetch(`${fakestoreapiUrl}/${resource}/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
};

const match = argv.find((arg) => /^products\/\d+$/.test(arg));
let id = match ? match.split("/")[1] : null;
id = parseInt(id);

let [, , command, resource] = argv;

command = command.toLowerCase();
if (id) {
    resource = resource.split("/")[0];
    console.log(command, resource, id);
}
resource = resource.toLowerCase();

switch(command) {
    case "get":
        id? GET(resource, id) : GET(resource)
        break;
    case "post":
        const [, , , , title, price, category] = argv;
        POST(resource, title, price, category);
        break;
    case "put":
        const [, , , , titlePut, pricePut, categoryPut] = argv;
        PUT(resource, id, titlePut, pricePut, categoryPut);
        break;
    case "delete":
        DELETE(resource, id);
        break;
    default:
        console.log("El comando no es válido");
        break;
}