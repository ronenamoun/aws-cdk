import { Stack, StackProps,aws_s3 } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class SampleCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const bucket = new aws_s3.Bucket(this, 'RonenFirstBucket',{
      bucketName:"ronenbucketname",
    });
  }
}
