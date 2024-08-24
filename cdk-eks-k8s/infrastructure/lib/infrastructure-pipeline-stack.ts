import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as codepipeline from "aws-cdk-lib/aws-codepipeline";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as secrets from "aws-cdk-lib/aws-secretsmanager";
import * as actions from "aws-cdk-lib/aws-codepipeline-actions";
import {
  BuildSpec,
  LinuxBuildImage,
  PipelineProject,
} from "aws-cdk-lib/aws-codebuild";
import { Construct } from "constructs";

interface InfrastructurePipelineStackProps extends cdk.StackProps {
  githubPatSecret: secrets.Secret;
  eksVpc: ec2.Vpc;
}
export class InfrastructurePipelineStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    props: InfrastructurePipelineStackProps
  ) {
    super(scope, id, props);

    const pipeline = new codepipeline.Pipeline(this, "InfrastructurePipeline", {
      pipelineName: "InfrastructurePipeline",
      crossAccountKeys: true,
      restartExecutionOnUpdate: true,
    });

    props.githubPatSecret.grantRead(pipeline.role);

    const infrastructureSourceOutput = new codepipeline.Artifact(
      "InfrastructureSourceOutput"
    );
    const infrastructureBuildOutput = new codepipeline.Artifact(
      "InfrastructureBuildOutput"
    );

    const infrastructureBuildProject = new PipelineProject(
      this,
      "InfrastructureBuildProject",
      {
        vpc: props.eksVpc,
        environment: {
          privileged: true,
          buildImage: LinuxBuildImage.STANDARD_5_0,
        },
        buildSpec: BuildSpec.fromSourceFilename(
          "infrastructure/buildspecs/infrastructure-build-buildspec.yml"
        ),
      }
    );

    const infrastructureBuildProjectAdminPolicy = new iam.PolicyStatement({
      actions: ["*"],
      resources: ["*"],
    });

    infrastructureBuildProject.addToRolePolicy(
      infrastructureBuildProjectAdminPolicy
    );

    const infrastructureBuildAction = new actions.CodeBuildAction({
      actionName: "Infrastructure_Build",
      input: infrastructureSourceOutput,
      outputs: [infrastructureBuildOutput],
      project: infrastructureBuildProject,
    });

    pipeline.addStage({
      stageName: "Source",
      actions: [
        new actions.GitHubSourceAction({
          owner: "matt-k8s",
          repo: "cdk-eks",
          branch: "main",
          actionName: "Infrastructure_Source",
          oauthToken: cdk.SecretValue.secretsManager("github-token"),
          output: infrastructureSourceOutput,
        }),
      ],
    });

    pipeline.addStage({
      stageName: "Build",
      actions: [infrastructureBuildAction],
    });
  }
}
