import axios from "axios";
import { env } from "process";

export function sendSlackNotification(initOfficialCode: string) {
  const slackWebhookUrl = env.SLACK_WEBHOOK_URL;

  axios
    .post(slackWebhookUrl, {
      text: `:alert: :toc: ${env.TOC_ENV}: (${initOfficialCode}) *A problem occurred while synchronizing with ToC.*`,
    })
    .then((response) => {
      console.log("Notification sent to Slack successfully");
    })
    .catch((error) => {
      console.error(
        "A error occurred while trying to sent notification to Slack",
        error
      );
    });
}
