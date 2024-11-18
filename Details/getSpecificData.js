exports = async function ({ query, headers, body }, response) {

    const collection = context.services
        .get("mongodb-atlas")
        .db("college")
        .collection("students");

    let docs = await collection.find().toArray();

    return docs;
};