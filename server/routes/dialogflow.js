const express = require("express");
const router = express.Router();
const dialogflow = require("dialogflow");

const config = require("../config/keys");

const projectId = config.googleProjectID;
const sessionId = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;

// 새로운 세션 만들기
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// 텍스트쿼리 루트와 이벤트쿼리 루트
router.post("/textQuery", async (req, res) => {
  //We need to send some information that comes from the client to Dialogflow API
  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: req.body.text,
        // The language used by the client (en-US)
        languageCode: languageCode,
      },
    },
  };

  // 요청보내기
  const responses = await sessionClient.detectIntent(request);
  console.log("Detected intent");

  // user가 입력한 결과 받기
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);

  res.send(result);
});

// 이벤트쿼리 루트
router.post("/eventQuery", async (req, res) => {
  // 사용자부터 dialogflow API까지 오는 정보 보내기
  // 텍스트쿼리 요청
  const request = {
    session: sessionPath,
    queryInput: {
      event: {
        // The query to send to the dialogflow agent
        name: req.body.event,
        languageCode: languageCode,
      },
    },
  };

  // 요청 보내기
  const responses = await sessionClient.detectIntent(request);
  console.log("Detected intent");

  // user가 입력한 데이터 받기
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);

  res.send(result);
});

module.exports = router;
