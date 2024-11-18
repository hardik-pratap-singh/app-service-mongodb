exports = async function MyCustomEndpoint({ query, headers, body }, response) {
    const collection = await context.services
        .get("mongodb-atlas")
        .db("alerts_db")
        .collection("subscriptions");

    // Parse the query to get the id
    let jsonStringQuery = JSON.stringify(query);
    let jsonQuery = JSON.parse(jsonStringQuery);
    let id = jsonQuery.id;

    // Parse the request body
    const content = JSON.parse(body.text());

    // Extract insID and new status from the content
    const { insID } = content; // Assuming body contains insID and newStatus
    console.log(insID)

    // response.setBody(JSON.stringify({id , insID}))
    // return ; 
    try {
        // Update the status of the specific insID in the details array
        const updateResult = await collection.findOneAndUpdate(
            {
                _id: BSON.ObjectId(id),
                "details.insID": insID // Ensure the document has the correct insID
            },
            {
                $set: {
                    "details.$.status": "breached" // Update the status for the matched insID
                }
            },
            { returnNewDocument: true } // Return the updated document
        );
        // response.setBody(JSON.stringify({id , insID , updateResult}))
        // return ; 
        if (!updateResult) {
            // Handle case where no document was found
            response.setStatusCode(404);
            response.setBody(JSON.stringify({ error: "Document not found or no matching insID" }));
            return;
        }
        // console.log("updateResult " , updateResult) ; 
        response.setStatusCode(200);
        response.setBody(JSON.stringify({ updateResult }))  // Return the updated document as JSON
        return;
    } catch (error) {
        response.setStatusCode(400);
        response.setBody(JSON.stringify({ error: error.message })); // Ensure the error is also a JSON string
    }
};
