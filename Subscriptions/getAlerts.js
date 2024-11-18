exports = async function ({ query, headers, body }, response) {
    // Get MongoDB collection
    const collection = context.services
        .get("mongodb-atlas")
        .db("alerts_db")
        .collection("alerts");

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
