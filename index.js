const axios = require("axios");
require("dotenv").config();

let dataToPost = [];

async function makeRequest() {
  const url = `${process.env.MAIN_URL}`;

  const method = "GET"; // or 'POST', 'PUT', 'DELETE', etc.
  const headers = {
    Authorization: `${process.env.BEARER_TOKEN}`,
    "Content-Type": "application/json", // adjust content type if necessary
  };

  try {
    const response = await axios({
      method,
      url,
      headers,
    });

    for (let i = 0; i < response.data["result"]["content"].length; i++) {
      let id = response.data["result"]["content"][i]["id"];
      let event = response.data["result"]["content"][i]["name"];

      let newUrl = `${process.env.SUB_URL_1}${id}${process.env.SUB_URL_2}`;

      let newResponse = await axios({
        method,
        url: newUrl,
        headers,
      });

      // console.log(newResponse.data["result"]);

      if (newResponse.data["result"].length !== 0) {
        dataToPost.push({
          event: event,
          completed: newResponse.data["result"]["COMPLETED"],
          total: newResponse.data["result"]["total"],
          accepted: newResponse.data["result"]["ACCEPTED"],
          submitted: newResponse.data["result"]["SUBMITTED"],
          verified: newResponse.data["result"]["VERIFIED"],
        });
      } else {
        dataToPost.push({
          event: event,
          completed: 0,
          total: 0,
          accepted: 0,
          submitted: 0,
          verified: 0,
        });
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }

  fetch(`${process.env.SHEETS_API}/all`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  fetch(`${process.env.SHEETS_API}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: dataToPost,
    }),
  });
}

makeRequest()


// function runIfBetween6And7() {
//     var currentTime = new Date();
//     var currentHour = currentTime.getHours() + 5.5;
    

//     // Check if the current hour is between 18:00 (6pm) and 19:00 (7pm)
//     if (currentHour >= 18 && currentHour < 19) {
        
//         makeRequest();
//     } else {
//         console.log("Current time is not between 6pm and 7pm.");
//     }
// }


// runIfBetween6And7();
