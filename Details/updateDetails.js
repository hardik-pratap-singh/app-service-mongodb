exports = async function MyCustomEndpoint({ query, headers, body }, response) {

    const collection = await context.services
        .get("mongodb-atlas")
        .db("college")
        .collection("students")

    let jsonStringQuery = JSON.stringify(query);
    let jsonQuery = JSON.parse(jsonStringQuery)
    console.log("id ", jsonQuery.id);
    let id = jsonQuery.id;

    const content = JSON.parse(body.text());

    try {
        let docs = await collection.findOneAndUpdate({ "_id": BSON.ObjectId(id) }, { $set: content }, { returnNewDocument: true })
        return {
            statusCode: 200,
            // body: JSON.stringify(docs), // Ensure body is a JSON string
            body: docs, // Ensure body is a JSON string
        };
    } catch (error) {
        response.setStatusCode(400);
        response.setBody(error.message);
    }
};