import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as cloudfrontOrigins from "aws-cdk-lib/aws-cloudfront-origins";

export class MultiRegionWebpageStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const privateBucket = new s3.Bucket(
      this,
      "matts-multi-region-webpage-bucket",
      {
        bucketName: "matts-multi-region-webpage-bucket",
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      }
    );

    new s3deploy.BucketDeployment(
      this,
      "matts-multi-region-webpage-bucket-deployment",
      {
        destinationBucket: privateBucket,
        sources: [s3deploy.Source.asset("./web-content.zip")],
      }
    );

    const mattsMultiRegionWebpageCloudfrontOrigin =
      new cloudfrontOrigins.S3Origin(privateBucket);

    new cloudfront.Distribution(
      this,
      "matts-multi-region-webpage-cloudfront-distribution",
      {
        defaultBehavior: {
          origin: mattsMultiRegionWebpageCloudfrontOrigin,
        },
      }
    );
  }
}
