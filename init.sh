#!/bin/bash

PROJECT_ID="" # EDIT THIS
BROKER_USERNAME="triplecheck-broker-sa"
BROKER_DISPLAYNAME="TripleCheck broker service account"

# Create TripleCheck broker user
gcloud iam service-accounts create $BROKER_USERNAME \
  --display-name $BROKER_DISPLAYNAME

# Add correct permissions
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member=serviceAccount:$BROKER_USERNAME@$PROJECT_ID.iam.gserviceaccount.com \
  --role=roles/datastore.user

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member=serviceAccount:$BROKER_USERNAME@$PROJECT_ID.iam.gserviceaccount.com \
  --role=roles/run.invoker