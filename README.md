**Event Data Aggregator**

This Node.js application fetches event data from a specified URL using Axios. It then processes the retrieved data and posts it to another endpoint. The main functionality includes:

- **Fetching Data**: Retrieves event data from a specified URL, utilizing Axios for making HTTP requests.
- **Processing Data**: Parses the fetched data, extracts relevant information, and structures it appropriately.
- **Posting Data**: Posts processed data to another endpoint, presumably for storage or further analysis.

### How to Use:

1. **Setup Environment Variables**:
   - Create a `.env` file and configure the following variables:
     - `MAIN_URL`: URL to fetch initial event data.
     - `SUB_URL_1` and `SUB_URL_2`: Parts of the URL to fetch additional data based on event IDs.
     - `BEARER_TOKEN`: Authorization token for accessing the main URL.
     - `SHEETS_API`: Endpoint for posting the processed data.

2. **Install Dependencies**:
   ```
   npm install axios dotenv
   ```

3. **Run the Application**:
   ```
   node index.js
   ```

### Additional Notes:

- Ensure proper error handling is implemented, especially for HTTP requests.
- You may customize the data processing logic to fit your specific use case.
- Consider scheduling the script to run at specific intervals using cron jobs or scheduling libraries like `node-cron`.
