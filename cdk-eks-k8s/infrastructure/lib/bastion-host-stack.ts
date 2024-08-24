import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import { read } from "fs";

interface BastionHostStackProps extends cdk.StackProps {
  eksVpc: ec2.Vpc;
  clusterArn: string;
  clusterAdminRoleArn: string;
}
export class BastionHostStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: BastionHostStackProps) {
    super(scope, id, props);

    const bastionHost = new ec2.BastionHostLinux(this, "BastionHost", {
      vpc: props.eksVpc,
    });

    bastionHost.role.attachInlinePolicy(
      new iam.Policy(this, "describe-cluster-policy", {
        statements: [
          new iam.PolicyStatement({
            actions: ["eks:DescribeCluster"],
            resources: [props.clusterArn],
          }),
          new iam.PolicyStatement({
            actions: ["sts:AssumeRole"],
            resources: [props.clusterAdminRoleArn],
          }),
        ],
      })
    );

    const readOnlyUser = new iam.User(this, "ReadOnlyUser", {
      userName: "readOnlyUser",
    });

    readOnlyUser.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("ReadOnlyAccess")
    );

    readOnlyUser.attachInlinePolicy(
      new iam.Policy(this, "access-cluster-policy", {
        statements: [
          new iam.PolicyStatement({
            actions: ["eks:DescribeCluster", "eks:AccessKubernetesApi"],
            resources: [props.clusterArn],
          }),
        ],
      })
    );
  }
}
