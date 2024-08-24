# CDK EKS

AWS CDK EKS Cluster (Fargate).

### 1. Overview of the infrastructure design

- AWS EKS managed service for the k8s Control Plane.
- Private k8s API server endpoint access.
- AWS CDK for IaC.
- AWS CodePipeline and AWS CodeBuild for Continous Deployment of infrastructure and microservices.
- All resources, including AWS CodeBuild contained inside custom VPC.
- AWS SecretsManager for storage and encryption of Secrets e.g. github-token for CD Pipelines access to private GitHub repository.
- Monorepo source code structure.
- GitOps for automated deployments for infrastructure and microservices.
- SSL (TLS) termination at the AWS ALB.

Decisions documented in more detail in the [architectural-decision-records (ADR)](./architectural-decision-records/) directory.
