# 00-microservies-monorepo.md

## Status

accepted

## Context

The decision of where to store source code for infrastructure (IaC), application code and k8s manifest files has a significant impact on team workflow, scalability, financial cost, time cost and release velocity.

## Options

A. monorepo and single Continuous Deployment pipeline
  - Use a monorepo to store infrastructure (IaC), application code for microservices, and k8s manifest files.
  - Store all infrastructure (Iac) code in 'infrastructure' directory
  - Store all microservices application code in 'services' directory
  - Store cluster-wide k8s manifest files in 'infrastructure/manifests'
  - Store microservice specific k8s manifest files in the microservice directory e.g. 'services/hello/manifests'
  - Use a single Continuous Deployment pipeline to deploy infrastructure.
  - Use a single, dynamic Continuous Deployment Pipeline for all the microservices, building, testing and deploying only the microservice which has a change commited to it.

B. A source code repo for infrastructure (IaC) and a source code repo storing application code for each microservice.

## Decision

A.

- Use a monorepo to store infrastructure (IaC) and application code for microservices.
- Use a single Continuous Deployment pipeline to deploy infrastructure.
- Use a single, dynamic Continuous Deployment Pipeline for all the microservices, building, testing and deploying only the microservice which has a change commited to it.

## Implications

Benefits:

- Deployment of infrastructure is reliable, reproducible automated
- Making changes to the infrastructure is more visible/accessible to Product teams, as the IaC lives alongside the application code
- Scalability of microservices is enabled; does not require creating a new Continuous Deployment Pipeline for each microservice

## Notes

Currently there is only one microservice contained in the monorepo. When adding another, this means it would be possible to either:
- A). Deploy all microservies to production in the ServicesPipeline, every Pipeline execution
- B). Detech which microservices have changed, and only deploy those specific microservices in the ServicesPipeline

When scaling the codebase, it would make it more managable to use ArgoCD.
