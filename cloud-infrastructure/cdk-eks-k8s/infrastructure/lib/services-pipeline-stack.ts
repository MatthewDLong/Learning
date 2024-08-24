import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as codepipeline from "aws-cdk-lib/aws-codepipeline";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import * as secrets from "aws-cdk-lib/aws-secretsmanager";
import * as actions from "aws-cdk-lib/aws-codepipeline-actions";
import {
  BuildSpec,
  LinuxBuildImage,
  PipelineProject,
} from "aws-cdk-lib/aws-codebuild";
import { Construct } from "constructs";

interface InfrastructurePipelineStackProps extends cdk.StackProps {
  eksVpc: ec2.Vpc;
  clusterArn: string;
  clusterAdminRoleArn: string;
  clusterName: string;
}
export class ServicesPipelineStack extends cdk.Stack {
  public readonly githubPatSecret: secrets.Secret;
  constructor(
    scope: Construct,
    id: string,
    props: InfrastructurePipelineStackProps
  ) {
    super(scope, id, props);

    const githubPatSecret = new secrets.Secret(this, "github-pat-secret", {
      secretName: "github-token",
    });

    const datadogApiKeySecret = new secrets.Secret(
      this,
      "datadog-api-key-secret",
      {
        secretName: "datadog-api-key",
      }
    );

    const datadogAuthToken = new secrets.Secret(
      this,
      "datadog-auth-token-secret",
      {
        secretName: "datadog-auth-token",
      }
    );

    this.githubPatSecret = githubPatSecret;

    const pipeline = new codepipeline.Pipeline(this, "ServicesPipeline", {
      pipelineName: "ServicesPipeline",
      crossAccountKeys: true,
      restartExecutionOnUpdate: true,
    });

    githubPatSecret.grantRead(pipeline.role);

    const servicesSourceOutput = new codepipeline.Artifact(
      "ServicesSourceOutput"
    );
    const servicesBuildOutput = new codepipeline.Artifact(
      "ServicesBuildOutput"
    );

    const servicesBuildProject = new PipelineProject(
      this,
      "ServicesBuildProject",
      {
        vpc: props.eksVpc,
        environment: {
          privileged: true,
          buildImage: LinuxBuildImage.STANDARD_5_0,
          environmentVariables: {
            AWS_DEFAULT_REGION: {
              value: "eu-west-1",
              type: codebuild.BuildEnvironmentVariableType.PLAINTEXT,
            },
            AWS_ACCOUNT_ID: {
              value: "552740142516",
              type: codebuild.BuildEnvironmentVariableType.PLAINTEXT,
            },
            IMAGE_TAG: {
              value: "latest",
              type: codebuild.BuildEnvironmentVariableType.PLAINTEXT,
            },
            IMAGE_REPO_NAME: {
              value: "hello-service-repo",
              type: codebuild.BuildEnvironmentVariableType.PLAINTEXT,
            },
            CLUSTER_ADMIN_ROLE_ARN: {
              value: props.clusterAdminRoleArn,
              type: codebuild.BuildEnvironmentVariableType.PLAINTEXT,
            },
            CLUSTER_NAME: {
              value: props.clusterName,
              type: codebuild.BuildEnvironmentVariableType.PLAINTEXT,
            },
          },
        },
        buildSpec: BuildSpec.fromSourceFilename(
          "infrastructure/buildspecs/services-build-buildspec.yml"
        ),
      }
    );

    servicesBuildProject.addToRolePolicy(
      new iam.PolicyStatement({
        actions: [
          "ecr:BatchCheckLayerAvailability",
          "ecr:CompleteLayerUpload",
          "ecr:GetAuthorizationToken",
          "ecr:InitiateLayerUpload",
          "ecr:PutImage",
          "ecr:UploadLayerPart",
        ],
        resources: ["*"],
      })
    );

    servicesBuildProject.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["eks:DescribeCluster"],
        resources: [props.clusterArn],
      })
    );

    servicesBuildProject.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["secretsmanager:ListSecrets"],
        resources: ["*"],
      })
    );

    servicesBuildProject.addToRolePolicy(
      new iam.PolicyStatement({
        actions: [
          "secretsmanager:GetResourcePolicy",
          "secretsmanager:GetSecretValue",
          "secretsmanager:DescribeSecret",
          "secretsmanager:ListSecretVersionIds",
        ],
        resources: [datadogApiKeySecret.secretArn, datadogAuthToken.secretArn],
      })
    );

    servicesBuildProject.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["sts:AssumeRole"],
        resources: [props.clusterAdminRoleArn],
      })
    );

    const servicesBuildAction = new actions.CodeBuildAction({
      actionName: "Services_Build",
      input: servicesSourceOutput,
      outputs: [servicesBuildOutput],
      project: servicesBuildProject,
    });

    pipeline.addStage({
      stageName: "Source",
      actions: [
        new actions.GitHubSourceAction({
          owner: "matt-k8s",
          repo: "cdk-eks",
          branch: "main",
          actionName: "Services_Source",
          oauthToken: cdk.SecretValue.secretsManager("github-token"),
          output: servicesSourceOutput,
        }),
      ],
    });

    pipeline.addStage({
      stageName: "Build",
      actions: [servicesBuildAction],
    });
  }
}
