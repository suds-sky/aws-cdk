import * as path from 'path';
import * as iam from '@aws-cdk/aws-iam';
import { DeprecatedSymbols } from '@aws-cdk/cdk-build-tools';
import * as cdk from '@aws-cdk/core';
import * as assets from '../lib';

class TestStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /// !show
    const asset = new assets.Asset(this, 'SampleAsset', {
      path: path.join(__dirname, 'sample-asset-directory'),
    });

    new cdk.CfnOutput(this, 'S3BucketName', { value: asset.s3BucketName });
    new cdk.CfnOutput(this, 'S3ObjectKey', { value: asset.s3ObjectKey });
    new cdk.CfnOutput(this, 'S3HttpURL', { value: asset.httpUrl });
    new cdk.CfnOutput(this, 'S3ObjectURL', { value: asset.s3ObjectUrl });
    /// !hide

    // we need at least one resource
    asset.grantRead(new iam.User(this, 'MyUser'));
  }
}

// Marking test as deprecated until https://github.com/aws/jsii/issues/3102 is fixed.
const deprecated = DeprecatedSymbols.quiet();

const app = new cdk.App();
new TestStack(app, 'aws-cdk-asset-refs');
app.synth();

DeprecatedSymbols.reset(deprecated);
