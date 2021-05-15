#!/bin/bash

PROJECT_ID="" # EDIT THIS
BROKER_USERNAME="triplecheck-broker-sa"
REGION="europe-north1"

gcloud beta run deploy triplecheck-broker \
  --source . \
  --platform managed \
  --region $REGION \
  --service-account $BROKER_USERNAME@$PROJECT_ID.iam.gserviceaccount.com