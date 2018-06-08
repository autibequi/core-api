#!/bin/bash

# SET THESES VARIABLES TO CORRECTLY DEPLOY
APP_NAME="???"
EB_DEPLOY_BUCKET="???"
ENV_ID="???"
# SET THESES VARIABLES TO CORRECTLY DEPLOY


echo "Cleaning Environment"
rm *.zip

echo "Staring Deployment"
PREFIX="EIPCORE_"
LABEL=$PREFIX$(date +%Y-%m-%d_%H-%M)
ZIP_FILENAME=$LABEL.zip
S3_KEY=$APP_NAME"/"$ZIP_FILENAME

echo "Creating deployment package"
zip -r $ZIP_FILENAME . -x *.git*

echo "Uploading package to S3"
aws s3 cp $ZIP_FILENAME s3://$EB_DEPLOY_BUCKET/$APP_NAME/

echo "Creating Application Version"
aws elasticbeanstalk create-application-version \
    --application-name $APP_NAME \
    --version-label $LABEL \
    --source-bundle '{"S3Bucket": "'$EB_DEPLOY_BUCKET'", "S3Key": "'$S3_KEY'"}'

echo "Updating Environment"
aws elasticbeanstalk update-environment \
    --application-name $APP_NAME \
    --environment-id $ENV_ID \
    --version-label $LABEL

echo "Cleaning Environment"
rm *.zip
