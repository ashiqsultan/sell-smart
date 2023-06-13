const sdk = require('node-appwrite');

const badWords = ['alcohol', 'gun', 'drug', 'cigar'];

function cleanSentence(stringToClean) {
  const regexPattern = new RegExp(badWords.join('|'), 'gi');
  const cleanedSentence = stringToClean.replace(regexPattern, (match) =>
    '*'.repeat(match.length)
  );
  return cleanedSentence;
}

module.exports = async function (req, res) {
  try {
    const PROJECT_ID = req.variables['PROJECT_ID'];
    const API_KEY = req.variables['API_KEY'];
    const DATABASE_ID = req.variables['DATABASE_ID'];
    const POST_COLLECTION_ID = req.variables['POST_COLLECTION_ID'];

    const eventData = req.variables['APPWRITE_FUNCTION_EVENT_DATA'];

    const { $id, title, description } = JSON.parse(eventData);

    const client = new sdk.Client()
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject(PROJECT_ID)
      .setKey(API_KEY);
    const database = new sdk.Databases(client);

    const updatedTitle = cleanSentence(title);
    const updatedDescription = cleanSentence(description);

    // Check if there is an actual change
    if (title !== updatedTitle || description !== updatedDescription) {
      const updatedDoc = await database.updateDocument(
        DATABASE_ID,
        POST_COLLECTION_ID,
        $id,
        { title: updatedTitle, description: updatedDescription }
      );
      console.log('Document updated:', updatedDoc);
    } else {
      console.log('No changes detected. Skipping document update.');
    }
  } catch (error) {
    console.error('Error updating document:', error);
  }

  res.json({
    areDevelopersAwesome: true,
    updated: 'v2',
  });
};
