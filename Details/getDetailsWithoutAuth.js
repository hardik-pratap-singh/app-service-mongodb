//This is helloWorld function where no authentication is provided 


exports = async function ({ query, headers, body }, response) {
    // Get MongoDB collection
    const collection = context.services
        .get("mongodb-atlas")
        .db("college")
        .collection("students");

    console.log("collection ", collection);

    // Variable to hold the result
    let docs;

    try {
        // Fetch all alerts
        docs = await collection.find({}).toArray();

        return {
            statusCode: 200,
            // body: JSON.stringify(docs), // Ensure body is a JSON string
            body: docs, // Ensure body is a JSON string
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Error fetching alerts",
                error: error.message,
            }),
        };
    }
};