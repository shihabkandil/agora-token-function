import { onRequest } from "firebase-functions/v2/https";
import * as functions from 'firebase-functions';
import pkg from 'agora-token';

const { RtcTokenBuilder, RtmTokenBuilder, RtcRole } = pkg;

const TOKEN_EXPIRATION_IN_SECONDS = 3600;
const INVALID_URL_FORMAT_MESSAGE = 'Invalid URL format';
const INVALID_ENDPOINT_MESSAGE = 'Invalid endpoint';

const agoraTokenAccess = onRequest({ secrets: ["AGORA_APP_ID","AGORA_CERTIFICATE"] },async (request, response) => {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpirationInSecond = currentTimestamp + TOKEN_EXPIRATION_IN_SECONDS;
  const AGORA_APP_ID = process.env.AGORA_APP_ID;
  const AGORA_CERTIFICATE = process.env.AGORA_CERTIFICATE;

  if (request.url.includes("rtc")) {
    const urlParts = request.url.split('/');
    const channelNameIndex = urlParts.indexOf('rtc') + 1;
    const uidIndex = urlParts.indexOf('uid') + 1;

    if (channelNameIndex < urlParts.length && uidIndex < urlParts.length) {
      const channelName = urlParts[channelNameIndex];
      const uid = urlParts[uidIndex];
      const role = RtcRole.PUBLISHER;
      
      const token = RtcTokenBuilder.buildTokenWithUid(
        AGORA_APP_ID, AGORA_CERTIFICATE, channelName, uid, role, TOKEN_EXPIRATION_IN_SECONDS, privilegeExpirationInSecond
      );

      response.status(200).send({ "rtcToken": token });
    } else {
      response.status(400).send(INVALID_URL_FORMAT_MESSAGE);
    }
  } else if (request.url.includes("rtm")) {
    const urlParts = request.url.split('/');
    const rtmIdIndex = urlParts.indexOf('rtm') + 1;

    if (rtmIdIndex > 0 && rtmIdIndex < urlParts.length) {
      const userId = urlParts[rtmIdIndex];

      console.log(AGORA_APP_ID)
      console.log(AGORA_CERTIFICATE)

      const token = RtmTokenBuilder.buildToken(
        AGORA_APP_ID, AGORA_CERTIFICATE, userId, privilegeExpirationInSecond
      );

      response.status(200).send({ "rtmToken": token });
    } else {
      response.status(400).send(INVALID_URL_FORMAT_MESSAGE);
    }
  } else {
    response.status(400).send(INVALID_ENDPOINT_MESSAGE);
  }
});

export { agoraTokenAccess };
