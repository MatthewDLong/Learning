# 01-iac.md

## Status

accepted

## Context

Choosing an (IaC) toolkit is an important choice.

Infrastructure as Code (IaC) is a software engineering approach that allows management and provisioning of infrastructure using code instead of manual processes. Here are some benefits of IaC:

Consistency: IaC helps ensure that your infrastructure is consistent across environments, which eliminates configuration drift and reduces the likelihood of errors caused by manual configurations.

Speed: IaC enables rapid deployment and updates of infrastructure, which helps increase the speed of software delivery and reduces time-to-market.

Scalability: IaC makes it easy to scale up or down your infrastructure to meet the changing demands of your applications and users. This allows you to optimize resource utilization and reduce costs.

Reliability: IaC helps improve the reliability of your infrastructure by reducing the potential for human error and providing a repeatable and automated process for provisioning and managing infrastructure.

Security: IaC makes it easier to implement security best practices, such as automatically applying security patches and auditing infrastructure configuration, which helps reduce the risk of security vulnerabilities.

Collaboration: IaC facilitates collaboration between developers, operations teams, and other stakeholders, as code can be version-controlled and reviewed just like application code. This helps improve communication and alignment across teams.

Agility: IaC provides agility and flexibility to infrastructure management, allowing teams to experiment and innovate with new infrastructure configurations or architectural designs without introducing operational risks.

Overall, IaC provides significant benefits for managing and provisioning infrastructure in a repeatable, scalable, and consistent manner. By automating the infrastructure provisioning process, IaC helps increase speed, reliability, security, and collaboration while reducing operational costs and risks.

## Options

A. [AWS CDK v2](https://docs.aws.amazon.com/cdk/api/v2/)

B. [Terraform](https://www.terraform.io/)

## Decision

A. [AWS CDK v2](https://docs.aws.amazon.com/cdk/api/v2/) TypeScript

## Implications

Benefits:

- CDK is an actively developed, well supported toolkit for AWS Constructs.
- Good support for k8s and AWS EKS

More details here: https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html

## Notes
