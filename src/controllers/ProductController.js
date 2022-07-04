const request = require('request');

const apiURL = process.env.MELI_API_URL

const getProductByText = (reqParam, response) => {

    const { q } = reqParam.query;
    const { offset } = reqParam.query;
    request.get(`${apiURL}sites/MLA/search?q=${q}&offset=${offset}&limit=4`, (errSearch, resSearch, bodySearch) => {
        if (resSearch.statusCode !== 200) {
            return response.status(resSearch.statusCode).send(JSON.parse(bodySearch));
        }
        const products = JSON.parse(resSearch.body).results;
        if (products.length == 0) {
            const returnedObject = {
                categories: [],
                items: [],
                pagination: [],
            };
            return response.status(404).send(returnedObject);
        }
        const paging = JSON.parse(resSearch.body).paging
        const categoriesObj = JSON.parse(resSearch.body)?.filters.find(
            (item) => item.id == "category"
        );
        const categories = categoriesObj?.values[0].path_from_root || [];
        const categoryList = [].concat(categories).map(({ name }) => name);

        const items = [].concat(products).map((prod) => {
            const splitDecimalAmountPrice = prod.prices.prices[0].amount
                .toString()
                .split(".");
            return {
                id: prod.id,
                title: prod.title,
                thumbnail: prod.thumbnail,
                condition: prod.condition,
                free_shipping: prod.shipping.free_shipping,
                city: prod.address.city_name,
                price: {
                    currency: prod.prices.prices[0].currency_id,
                    amount: Number(splitDecimalAmountPrice[0]),
                    decimals: Number(splitDecimalAmountPrice[1]),
                },
            };
        });
        const returnedObject = {
            pagination: paging,
            categories: categoryList,
            items: items,
        };

        return response.status(200).send(returnedObject);
    })
}

const getProductById = (reqParam, response) => {
    const { id } = reqParam.params;
    request.get(`${apiURL}items/${id}`, (errProduct, resProduct, bodyProduct) => {
        if (resProduct.statusCode !== 200) {
            return response.status(resProduct.statusCode).send(JSON.parse(bodyProduct));
        }
        const item = JSON.parse(resProduct.body);
        const splitDecimalAmountPrice = item.price.toString().split(".");
        request.get(`${apiURL}categories/${item.category_id}`, (errCategories, resCategories, bodyCategories) => {
            if (resCategories.statusCode !== 200) {
                return response.status(resCategories.statusCode).send(JSON.parse(bodyCategories));
            }
            const categoriesResponse = JSON.parse(resCategories.body);
            const categoryList = [].concat(categoriesResponse.path_from_root).map(({ name }) => name);
            
            request.get(`${apiURL}items/${id}/description`, (errDescription, resDescription, bodyDescription) => {
                if (resDescription.statusCode !== 200) {
                    return response.status(resDescription.statusCode).send(JSON.parse(bodyDescription));
                }
                const description = JSON.parse(resDescription.body).plain_text || "";
                const pictureList = item.pictures.slice(0,2).map(picture => picture.url)

                const returnedObject = {
                    item: {
                        id: item.id,
                        title: item.title,
                        categories: categoryList,
                        price: {
                            currency: item.currency_id,
                            amount: Number(splitDecimalAmountPrice[0]),
                            decimals: Number(splitDecimalAmountPrice[1]),
                        },
                        thumbnail: item.thumbnail,
                        pictures: pictureList,
                        condition: item.condition,
                        free_shipping: item.shipping.free_shipping,
                        sold_quantity: item.sold_quantity,
                        city: item.seller_address.city.name,
                        description: description,
                    },
                };
                return response.status(200).send(returnedObject);
            })
        })
    })
}


module.exports = {getProductByText,getProductById}