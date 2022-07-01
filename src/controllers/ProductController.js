const request = require('request');

const apiURL = process.env.MELI_API_URL

const getProductByText = (reqParam, response) => {
    const queryParam = reqParam.query.q
    request(`${apiURL}sites/MLB/search?q=${queryParam}&limit=2`, (errSearch, resSearch, bodySearch) => {
        const products = JSON.parse(resSearch.body).results;
        if (products.length == 0) {
            const returnedObject = {
                categories: [],
                items: [],
            };
            return response.status(200).send(returnedObject);
        }
        const categoriesObj = JSON.parse(resSearch.body).filters.find(
            (item) => item.id == "category"
        );
        const categories = categoriesObj.values[0].path_from_root;
        const categoryList = [].concat(categories).map(({ name }) => name);

        const items = [].concat(products).map((prod) => {
            const splitDecimalAmountPrice = prod.prices.prices[0].amount
                .toString()
                .split(".");
            return {
                id: prod.id,
                title: prod.title,
                picture: prod.thumbnail,
                condition: prod.condition,
                free_shipping: prod.shipping.free_shipping,
                price: {
                    currency: prod.prices.prices[0].currency_id,
                    amount: Number(splitDecimalAmountPrice[0]),
                    decimals: Number(splitDecimalAmountPrice[1]),
                },
            };
        });
        const returnedObject = {
            categories: categoryList,
            items: items,
        };

        return response.status(200).send(returnedObject);
    })
}

const getProductById = (reqParam, response) => {
    const { id } = reqParam.params;
    request(`${apiURL}items/${id}`, (errProduct, resProduct, bodyProduct) => {
        const item = JSON.parse(resProduct.body);
        if (item.status === 404) {
            return response.status(404).send({ error: item.message });
        }
        const splitDecimalAmountPrice = item.price.toString().split(".");
        request(`${apiURL}categories/${item.category_id}`, (errCategories, resCategories, bodyCategories) => {
            const categoriesResponse = JSON.parse(resCategories.body);
            const categoryList = [].concat(categoriesResponse.path_from_root).map(({ name }) => name);
            
            request(`${apiURL}items/${id}/description`, (errDescription, resDescription, bodyDescription) => {
                const description = JSON.parse(resDescription.body).plain_text || "";
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
                        picture: item.thumbnail,
                        condition: item.condition,
                        free_shipping: item.shipping.free_shipping,
                        sold_quantity: item.sold_quantity,
                        description: description,
                    },
                };
                return response.status(200).send(returnedObject);
            })
        })
    })
}


module.exports = {getProductByText,getProductById}