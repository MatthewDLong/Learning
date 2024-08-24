import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as eks from "aws-cdk-lib/aws-eks";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as iam from "aws-cdk-lib/aws-iam";
import * as kms from "aws-cdk-lib/aws-kms";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as route53 from "aws-cdk-lib/aws-route53";
import { KubectlV25Layer } from "@aws-cdk/lambda-layer-kubectl-v25";

export class EksStack extends cdk.Stack {
  public readonly eksVpc: ec2.Vpc;
  public readonly clusterArn: string;
  public readonly clusterAdminRoleArn: string;

  public readonly clusterName: string;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const mattk8sPublicHostedZone = new route53.HostedZone(this, "mattk8s", {
      zoneName: "matt-k8s.click",
    });

    // For more info on dualstack. see https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-elb-load-balancer.html
    new route53.CnameRecord(this, `CnameApiRecord`, {
      recordName: "api",
      zone: mattk8sPublicHostedZone,
      domainName:
        "dualstack.k8s-app-helloser-4b007707df-1596460726.eu-west-1.elb.amazonaws.com",
    });

    const cert = new acm.Certificate(this, "mattk8sCertificate", {
      domainName: "matt-k8s.click",
      subjectAlternativeNames: ["*.matt-k8s.click"],
      validation: acm.CertificateValidation.fromDnsMultiZone({
        "matt-k8s.click": mattk8sPublicHostedZone,
        "*.matt-k8s.click": mattk8sPublicHostedZone,
      }),
    });

    /*
    environment-agnostic stacks will be created with access to only 2 AZs
    This is an environment agnostic stack, and for production, is deployed into
    eu-west-1a and eu-west-1b
    The subnetConfiguration will apply to each of these two availability zones.
    There is a total of three public subnets and three private subnets in both availability zones.
    */
    const eksVpc = new ec2.Vpc(this, "eks-vpc", {
      maxAzs: 2,
      natGateways: 2,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: "public",
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: "private",
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        },
      ],
    });

    this.eksVpc = eksVpc;

    const clusterAdmin = new iam.Role(this, "ClusterAdminRole", {
      assumedBy: new iam.AccountRootPrincipal(),
      inlinePolicies: {
        "eks-console-access": new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              actions: [
                "eks:List*",
                "eks:Describe*",
                "eks:AccessKubernetesApi",
              ],
              resources: ["*"],
            }),
          ],
        }),
      },
    });

    this.clusterAdminRoleArn = clusterAdmin.roleArn;

    const cluster = new eks.FargateCluster(this, id, {
      version: eks.KubernetesVersion.V1_25,
      albController: {
        version: eks.AlbControllerVersion.V2_4_1,
      },
      kubectlLayer: new KubectlV25Layer(this, "kubectl"),
      mastersRole: clusterAdmin,
      outputClusterName: true,
      outputMastersRoleArn: true,
      outputConfigCommand: true,
      endpointAccess: eks.EndpointAccess.PRIVATE,
      secretsEncryptionKey: new kms.Key(this, "EKS_KMS_Key"),
      vpc: eksVpc,
    });

    this.clusterArn = cluster.clusterArn;

    this.clusterName = cluster.clusterName;

    const helloServiceRepo = new ecr.Repository(this, "hello-service-repo", {
      repositoryName: "hello-service-repo",
      imageScanOnPush: true,
      encryption: ecr.RepositoryEncryption.KMS,
    });

    const appProfile = cluster.addFargateProfile("app-profile", {
      selectors: [{ namespace: "app" }],
    });

    appProfile.podExecutionRole.attachInlinePolicy(
      new iam.Policy(this, "userpool-policy", {
        statements: [
          new iam.PolicyStatement({
            actions: [
              "ecr:BatchCheckLayerAvailability",
              "ecr:BatchGetImage",
              "ecr:GetDownloadUrlForLayer",
              "ecr:GetAuthorizationToken",
            ],
            resources: [helloServiceRepo.repositoryArn],
          }),
        ],
      })
    );
  }
}
