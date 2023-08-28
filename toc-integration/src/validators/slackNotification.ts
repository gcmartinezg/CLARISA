import axios from "axios";
import {env} from "process"

export function sendSlackNotification(initOfficialCode: string) {
  const slackWebhookUrl = "https://hooks.slack.com/services/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"; // Reemplaza con tu URL de Webhook de Slack

  axios
    .post(slackWebhookUrl, {
      text: `:alert: :toc: ${env.TOC_ENV}: (${initOfficialCode}) *A problem occurred while synchronizing with ToC.*`,
    })
    .then((response) => {
      console.log("Notification sent to Slack successfully");
    })
    .catch((error) => {
      console.error("A error occurred while trying to sent notification to Slack", error);
    });
}
