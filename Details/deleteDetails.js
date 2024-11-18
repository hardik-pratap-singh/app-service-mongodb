exports = async function MyCustomEndpoint({ query, headers, body }, response) {

    const collection = await context.services
        .get("mongodb-atlas")
        .db("college")
        .collection("students")

    let jsonStringQuery = JSON.stringify(query);
    let jsonQuery = JSON.parse(jsonStringQuery)
    console.log("id ", jsonQuery.id);
    let id = jsonQuery.id;


    try {
        let docs = await collection.findOneAndDelete({ "_id": BSON.ObjectId(id) })
        return {
            statusCode: 200,
            body: docs, // Ensure body is a JSON string
        };
    } catch (error) {
        response.setStatusCode(400);
        response.setBody(error.message);
    }
};
